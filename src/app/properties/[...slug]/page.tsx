import { Property } from './property';
import { contentfulClient } from '@/app/libs/contenful-client';
import { TypeProperty } from '@/app/generated-types';
import { Metadata } from 'next';
import { pound } from '@/app/utils';
import { TransactionType } from '@/app/types';
import { Asset, ChainModifiers } from 'contentful';

export type PropertyPageProps = {
  params: { slug: string[] };
};

// Enable ISR with webhook-based revalidation
// Fallback to 24 hours if webhook fails
export const revalidate = 86400;

// Generate static paths for all properties at build time
export async function generateStaticParams() {
  try {
    const properties = await contentfulClient.getEntries<TypeProperty>({
      content_type: 'property',
      select: ['sys.id'],
    });

    return properties.items.map((property) => ({
      slug: [property.sys.id],
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate dynamic metadata for each property page
export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  try {
    const property = await contentfulClient.getEntry<TypeProperty>(params.slug[0]);

    if (!property.fields) {
      throw new Error('Property fields not found');
    }

    const price = `${pound.format(property.fields.price as number)}${
      property.fields.transactionType === TransactionType.Lettings ? ' PCM' : ''
    }`;

    const description = `${property.fields.numberOfBedrooms} bedroom ${
      property.fields.propertyType
    } ${
      property.fields.transactionType === TransactionType.Sales ? 'for sale' : 'to let'
    } - ${price}. ${property.fields.name}`;

    // Get the first image from gallery for Open Graph
    const gallery = property.fields.gallery as Asset<ChainModifiers, string>[] | undefined;
    const firstImage = gallery?.[0];
    const ogImage = firstImage?.fields?.file?.url
      ? `https:${firstImage.fields.file.url}?w=1200&h=630&fit=fill&fm=jpg`
      : undefined;

    return {
      title: `${property.fields.name} - ${price} - Broadhill Estate`,
      description,
      openGraph: {
        title: `${property.fields.name} - ${price}`,
        description,
        images: ogImage ? [{ url: ogImage }] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Property - Broadhill Estate',
      description: 'View property details at Broadhill Estate',
    };
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  return <Property id={params.slug[0]} />;
}

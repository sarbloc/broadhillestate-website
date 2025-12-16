import { TypeProperty } from '@/app/generated-types';
import { contentfulClient } from '@/app/libs/contenful-client';
import { mapsClient } from '@/app/libs/google-maps-client';

// Cache API responses with webhook-based revalidation
// Fallback to 24 hours if webhook fails
export const revalidate = 86400;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const transactionType = searchParams.get('transactionType');
  const propertyType = searchParams.get('propertyType');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minBeds = searchParams.get('minBeds');
  const availability = searchParams.get('availabilityFilter');
  const sort = searchParams.get('sort');

  const query = {} as Record<string, any>;

  if (location) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

    if (!key) {
      throw new Error('Google Maps API key is not set');
    }

    try {
      const resp = await mapsClient.geocode({
        params: {
          key,
          components: {
            country: 'GB',
          },
          address: location,
        },
      });

      if (resp.status === 200) {
        const bounds = resp.data.results[0].geometry.bounds;

        if (bounds) {
          query[
            'fields.location[within]'
          ] = `${bounds.southwest.lat},${bounds.southwest.lng},${bounds.northeast.lat},${bounds.northeast.lng}`;
        }
      }
    } catch (err) {
      console.error('error', err);
    }
  }

  if (transactionType) {
    query['fields.transactionType'] = transactionType;
  }

  if (propertyType) {
    query['fields.propertyType'] = propertyType;
  }

  if (minPrice) {
    query['fields.price[gte]'] = minPrice;
  }

  if (maxPrice) {
    query['fields.price[lte]'] = maxPrice;
  }

  if (minBeds) {
    query['fields.numberOfBedrooms[gte]'] = minBeds;
  }

  if (availability) {
    query['fields.status'] = availability;
  }

  query['fields.isVisibleOnWebsite'] = true;

  const order = ['fields.featured', 'fields.order', '-sys.createdAt'] as any[];

  if (sort) {
    switch (sort) {
      case 'price-asc':
        order.unshift('fields.price');
        break;
      case 'price-desc':
        order.unshift('-fields.price');
        break;
      default:
        break;
    }
  }

  try {
    const properties = await contentfulClient.getEntries<TypeProperty>({
      content_type: 'property',
      order,
      select: [
        'sys.id',
        'sys.createdAt',
        'sys.updatedAt',
        'fields.name',
        'fields.description',
        'fields.numberOfBedrooms',
        'fields.numberOfBathrooms',
        'fields.numberOfReceptions',
        'fields.transactionType',
        'fields.propertyType',
        'fields.status',
        'fields.price',
        'fields.location',
        'fields.gallery',
        'fields.isVisibleOnWebsite',
        'fields.order',
        'fields.featured',
      ],
      ...query,
    });

    return Response.json(
      properties.items.map((item) => ({
        id: item.sys.id,
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
        ...item.fields,
      }))
    );
  } catch (err) {
    console.error('error', err);
    return Response.json({ error: err }, { status: 500 });
  }
}

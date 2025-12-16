import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  // Validate secret token
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token', revalidated: false }, { status: 401 });
  }

  try {
    const body = await request.json();

    const entryId = body.sys?.id;
    const entryType = body.sys?.type; // 'Entry' or 'Asset'
    const contentType = body.sys?.contentType?.sys?.id;

    console.log('Revalidation webhook received:', {
      entryId,
      entryType,
      contentType,
    });

    // Handle Property Entry updates
    if (entryType === 'Entry' && contentType === 'property' && entryId) {
      // Revalidate specific property page
      revalidatePath(`/properties/${entryId}`);
      console.log(`Revalidated property page: /properties/${entryId}`);

      // Revalidate properties listing page
      revalidatePath('/properties');
      console.log('Revalidated properties listing page');

      // Revalidate home page (if it shows properties)
      revalidatePath('/');
      console.log('Revalidated home page');

      return NextResponse.json({
        revalidated: true,
        type: 'property',
        now: Date.now(),
        paths: [`/properties/${entryId}`, '/properties', '/'],
      });
    }

    // Handle Asset updates (images, videos, documents)
    if (entryType === 'Asset' && entryId) {
      // When an asset (image) is updated, we don't know which properties use it
      // So revalidate all property-related pages to be safe
      revalidatePath('/properties', 'layout');
      console.log('Asset updated - revalidated all property pages');

      revalidatePath('/');
      console.log('Revalidated home page');

      return NextResponse.json({
        revalidated: true,
        type: 'asset',
        now: Date.now(),
        message: 'Asset updated - all property pages revalidated',
        paths: ['/properties (all)', '/'],
      });
    }

    // Fallback: revalidate properties listing for any property-related content
    if (contentType === 'property') {
      revalidatePath('/properties');
      console.log('Revalidated properties listing page');

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        paths: ['/properties'],
      });
    }

    return NextResponse.json({
      revalidated: false,
      message: `No action taken - entry type: ${entryType}, content type: ${contentType}`,
    });
  } catch (err) {
    console.error('Error processing revalidation webhook:', err);
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
        revalidated: false,
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint for testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is working',
    timestamp: Date.now(),
  });
}

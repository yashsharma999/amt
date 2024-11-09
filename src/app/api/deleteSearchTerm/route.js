import client from '@/lib/redis';

export async function DELETE(req) {
  try {
    const { searchTerm } = await req.json();

    const removedCount = await client.lrem(
      'globalSearchHistory',
      0,
      searchTerm
    );

    if (removedCount > 0) {
      return Response.json({ message: 'Search term deleted', removedCount });
    } else {
      return Response.json({ error: 'Search term not found' }, { status: 404 });
    }
  } catch (error) {
    Response.json({ error: 'some err occured' }, { status: 500 });
  }
}

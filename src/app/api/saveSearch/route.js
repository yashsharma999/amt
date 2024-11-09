import client from '@/lib/redis';

export async function POST(req, res) {
  const body = await req.json();

  const { text } = body;
  if (!text) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    // Add the search term to the global history and limit to 50 items
    await client.lpush('globalSearchHistory', text);
    await client.ltrim('globalSearchHistory', 0, 50);

    return Response.json({ message: 'Search saved' }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to save search term' },
      { status: 500 }
    );
  }
}

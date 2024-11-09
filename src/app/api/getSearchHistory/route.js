import client from '@/lib/redis';

export async function GET(req, res) {
  try {
    // Retrieve the list with the most recent items first
    const history = await client.lrange('globalSearchHistory', 0, 50);
    return Response.json({ history: [...new Set(history)] });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch search history' },
      { status: 500 }
    );
  }
}

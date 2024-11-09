import Redis from 'ioredis';

const client = new Redis(
  'rediss://default:AXLgAAIjcDE4ZTFiMDdhODNmOGU0MzhiYmE0OWUwN2E5MzE3ZjNlYnAxMA@diverse-kangaroo-29408.upstash.io:6379'
);

export default client;

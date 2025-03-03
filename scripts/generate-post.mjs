import { ConvexHttpClient } from 'convex/browser';

const client = new ConvexHttpClient('https://limitless-orca-514.convex.cloud');
client.mutation('posts:addNew', {});

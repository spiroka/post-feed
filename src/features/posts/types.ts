import { Doc } from '@/convex/_generated/dataModel';

export type Post = Doc<'posts'> & { highlight?: boolean };

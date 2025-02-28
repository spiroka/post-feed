import { paginationOptsValidator } from 'convex/server';
import { query } from './_generated/server'

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: (ctx, args) => {
    return ctx.db
      .query('posts')
      .order('desc')
      .paginate(args.paginationOpts);
  }
});

import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';

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

export const postsAfterDate = query({
  args: { date: v.optional(v.number()) },
  handler: (ctx, args) => {
    if (!args.date) {
      return [];
    }

    return ctx.db
      .query('posts')
      .filter((q) => q.gt(q.field('_creationTime'), args.date))
      .order('desc')
      .collect();
  }
});

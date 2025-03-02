import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import { faker } from '@faker-js/faker';

import { mutation, query } from './_generated/server'

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: (ctx, args) => {
    return ctx.db
      .query('posts')
      .order('desc')
      .paginate(args.paginationOpts);
  }
});

export const afterDate = query({
  args: { date: v.optional(v.number()) },
  handler: (ctx, args) => {
    if (!args.date) {
      return [];
    }

    return ctx.db
      .query('posts')
      .filter((q) => q.gt(q.field('_creationTime'), args.date!))
      .order('desc')
      .collect();
  }
});

export const byId = query({
  args: { id: v.string() },
  handler: (ctx, args) => {
    const normalizedId = ctx.db.normalizeId('posts', args.id);

    if (!normalizedId) {
      return null;
    }

    return ctx.db.get(normalizedId);
  }
});

export const addNew = mutation({
  handler: (ctx) => {
    return ctx.db.insert('posts', {
      title: faker.word.words(5),
      body: faker.lorem.paragraphs(3),
      author: {
        name: faker.person.fullName(),
        avatarUrl: 'https://placecats.com/100/100'
      }
    });
  }
});

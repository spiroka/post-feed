import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    author: v.object({
      name: v.string(),
      avatarUrl: v.string()
    })
  })
});

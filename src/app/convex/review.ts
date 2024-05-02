import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createReview = mutation({
  args: {
    review: v.string(),
    user_id: v.string(),
    user_name: v.string(),
    user_image: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("identity: ", identity);

    if (identity === null) {
      return;
    }
    await ctx.db.insert("reviews", {
      review: args.review,
      user_id: args.user_id,
      user_name: args.user_name,
      user_image: args.user_image,
    });
  },
});

export const getAllReviews = query({
  // args: {
  //   chatId: v.id("consultations"),
  // },
  handler: async (ctx) => {
    const entries = await ctx.db.query("reviews").collect();

    return entries;
  },
});

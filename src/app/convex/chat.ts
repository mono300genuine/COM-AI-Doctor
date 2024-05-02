import { v } from "convex/values";
import { action, internalQuery, mutation, query } from "./_generated/server";

import OpenAI from "openai";
import { api, internal } from "./_generated/api";

const openai = new OpenAI();

export const getEntriesForConsultation = internalQuery({
  args: {
    consultationId: v.id("consultations"),
  },
  handler(ctx, args) {
    return ctx.db
      .query("entries")
      .filter((q) => q.eq(q.field("consultationId"), args.consultationId))
      .collect();
  },
});

export const handlePlayerAction = action({
  args: {
    message: v.string(),
    consultationId: v.id("consultations"),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.runQuery(
      internal.chat.getEntriesForConsultation,
      {
        consultationId: args.consultationId,
      }
    );

    const prefix = entries
      .map((entry) => {
        return `${entry.input}\n\n${entry.response}`;
      })
      .join("\n\n");

    const userPrompt = args.message;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${prefix}${userPrompt} Use emojis in each response.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion);
    const response = completion.choices[0].message.content ?? "";
    const input = userPrompt;

    await ctx.runMutation(api.chat.insertEntry, {
      input,
      response,
      consultationId: args.consultationId,
    });
    // return completion;
  },
});

export const insertEntry = mutation({
  args: {
    input: v.string(),
    response: v.string(),
    consultationId: v.id("consultations"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("entries", {
      input: args.input,
      response: args.response,
      consultationId: args.consultationId,
    });
  },
});

export const getAllEntries = query({
  args: {
    chatId: v.id("consultations"),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("entries")
      .filter((q) => q.eq(q.field("consultationId"), args.chatId))
      .order("asc")
      .collect();

    return entries;
  },
});

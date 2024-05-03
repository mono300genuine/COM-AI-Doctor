import { v } from "convex/values";
import OpenAI from "openai";
import { api, internal } from "./_generated/api";
import {
  internalAction,
  mutation,
  query
} from "./_generated/server";

const openai = new OpenAI();

export const createConsultation = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("identity: ", identity);

    const id = await ctx.db.insert("consultations", {
      name: "Chat",
      user_id: identity?.subject ? identity?.subject : "",
    });

    await ctx.scheduler.runAfter(
      0,
      internal.startconsultation.setupConsultation,
      {
        consultationId: id,
      }
    );
    return id;
  },
});

export const getConsultation = query({
  args: {
    consultationId: v.id("consultations"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.consultationId);
  },
});

export const getUserHistory = query({
  // args: {
  //   chatId: v.id("consultations"),
  // },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("identity: ", identity);

    if (identity === null) {
      return;
    }
    const entries = await ctx.db
      .query("consultations")
      .filter((q) => q.eq(q.field("user_id"), identity.subject))
      .order("desc")
      .collect();

    return entries;
  },
});

export const editConsultationName = mutation({
  args: {
    name: v.string(),
    consultationId: v.id("consultations"),
  },
  handler: async (ctx, args) => {
    const { consultationId, name } = args;
    await ctx.db.patch(consultationId, { name: name });
  },
});

export const setupConsultation = internalAction({
  args: {
    consultationId: v.id("consultations"),
  },
  handler: async (ctx, args) => {
    const consultation = await ctx.runQuery(
      api.startconsultation.getConsultation,
      args
    );

    if (!consultation) {
      throw new Error("Consultation not found.");
    }

    const input = `introduce yourself as Com Doctor AI an ai doctor that will consult the user only for medical help, if the user says anything that is not medical tell them you only respond to medical questions. Mention that they should always seek advice from human doctor and not rely on your response. only and only respond to it if its a medical question. If the user asks anything that is not medical, apologize and remind them that you are an AI doctor. Provide 3 treatments for the user and give shorter responses. Use emojis in each response.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const response = completion.choices[0].message.content ?? "";

    await ctx.runMutation(api.chat.insertEntry, {
      input: "",
      response,
      consultationId: args.consultationId,
    });

    // return completion;
  },
});

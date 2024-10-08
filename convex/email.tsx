"use node";
import {ConvexError, v} from "convex/values";
import {action, query} from "./_generated/server";
import {api} from "./_generated/api";
import {Resend} from "resend";
import InviteEmail from "./InviteEmail";
import React from "react";

const resend = new Resend("re_6GijhJLf_NM5gSDvNnxgn2csRwKWqwtr1");

export const sendInvite = action({
  args: {planId: v.id("plan"), email: v.string()},
  async handler(ctx, args) {
    const result = await ctx.runQuery(api.plan.PlanAdmin, {
      planId: args.planId,
    });

    if (!result || !result.isPlanAdmin) {
      throw new ConvexError("You must be a plan admin to invite others");
    }

    const token = await ctx.runMutation(api.token.createToken, {
      planId: args.planId,
      email: args.email,
    });

    const BASE_URL = process.env.HOSTING_URL ?? "https://tripplanner-ai.vercel.app/";

    const {data, error} = await resend.emails.send({
      from: "Travel Planner AI <support@travelplanner-ai.vercel>",
      to: args.email,
      subject: `You've been invited to join a travel plan`,
      react: (
        <InviteEmail
          projectName={result.planName!}
          inviteLink={`${BASE_URL}/dashboard/join?token=${token}`}
        />
      ),
    });

    if (error) {
      console.log({error});
      throw new ConvexError({
        message: error.message,
      });
    }
  },
});

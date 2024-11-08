// generateEmptyPlanActions.ts
"use server";
import { formSchemaType } from "@/components/NewPlanForm";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/app/auth";
import { redirect } from "next/navigation";
import { differenceInDays } from "date-fns";
import {
  generatebatch1,
  generatebatch2,
  generatebatch3,
} from "../openai/index"; // Import the functions

export async function generateEmptyPlanAction(formData: formSchemaType) {
  const token = await getAuthToken();
  const { placeName, activityPreferences, datesOfTravel, companion } = formData;
  const planId = await fetchMutation(
    api.plan.createEmptyPlan,
    {
      placeName,
      noOfDays: differenceInDays(
        datesOfTravel.from,
        datesOfTravel.to
      ).toString(),
      activityPreferences,
      fromDate: datesOfTravel.from.getTime(),
      toDate: datesOfTravel.to.getTime(),
      companion,
      isGeneratedUsingAI: false,
    },
    { token }
  );

  if (planId === null) return null;

  // Use placeName to generate batches
  await generatebatch1(`hidden gems in ${placeName}`);
  await generatebatch2({
    userPrompt: `adventurous trip in ${placeName}`,
    activityPreferences,
    fromDate: datesOfTravel.from.getTime(),
    toDate: datesOfTravel.to.getTime(),
    companion,
  });
  await generatebatch3({
    userPrompt: `travel itinerary for hidden places in ${placeName}`,
    activityPreferences,
    fromDate: datesOfTravel.from.getTime(),
    toDate: datesOfTravel.to.getTime(),
    companion,
  });

  fetchMutation(
    api.retrier.runAction,
    {
      action: "images:generateAndStore",
      actionArgs: { prompt: placeName, planId: planId },
    },
    { token: token }
  );

  redirect(`/plans/${planId}/plan?isNewPlan=true`);
}

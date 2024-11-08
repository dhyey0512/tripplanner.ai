import {getAuthToken} from "@/app/auth";
import PlanCard from "@/components/dashboard/PlanCard";
import {api} from "@/convex/_generated/api";
import {fetchQuery} from "convex/nextjs";

import React from "react";

export default async function PublicPlans() {
  const token = await getAuthToken();

  const plans = await fetchQuery(api.plan.getPublicPlans, {}, {token});

  return 
}

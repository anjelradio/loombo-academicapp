import { subscriptionApi } from "../api/subscription-api";

export const subscriptionRepository = {
  getCurrentSubscription(schoolId: string) {
    return subscriptionApi.getCurrentSubscription(schoolId);
  },
};

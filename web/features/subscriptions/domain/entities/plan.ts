export type SubscriptionPlan = {
  code: "free" | "standard" | "premium";
  name: string;
  priceLabel: string;
  billingLabel: string;
  description: string;
  highlights: string[];
  limitations?: string[];
  featured?: boolean;
};

import { apiRequestJson } from "@/features/shared/infrastructure/api/api-client";
import { getToken } from "@/features/shared/infrastructure/auth/get-token";
import { env } from "@/features/shared/infrastructure/config/env";
import { errorResult } from "@/features/shared/infrastructure/errors/api-error-result";
import type { ApiResult } from "@/features/shared/infrastructure/types/api-resource";
import { toCurrentSubscriptionEntity } from "@/features/subscriptions/data/mappers/subscription.mapper";
import { CurrentSubscriptionResponseSchema } from "@/features/subscriptions/data/schemas/subscription-response.schema";
import type { CurrentSubscription } from "@/features/subscriptions/domain/entities/subscription";

const baseUrl = `${env.API_URL}/subscriptions`;

export const subscriptionApi = {
  async getCurrentSubscription(schoolId: string): Promise<ApiResult<CurrentSubscription>> {
    const token = await getToken();
    if (!token) return errorResult("No autorizado");

    return apiRequestJson({
      url: `${baseUrl}/schools/${schoolId}/current`,
      method: "GET",
      token,
      cache: "no-store",
      fallbackMessage: "No se pudo obtener el plan actual.",
      responseSchema: CurrentSubscriptionResponseSchema,
      mapData: toCurrentSubscriptionEntity,
    });
  },
};

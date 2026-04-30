import type { ZodType } from "zod";

import { zodValidationErrorResult } from "@/features/shared/infrastructure/errors/api-error-result";

type ParseOk<T> = {
  ok: true;
  data: T;
};

type ParseError = ReturnType<typeof zodValidationErrorResult>;

export function parseWithSchema<T>(
  schema: ZodType<T>,
  data: unknown,
): ParseOk<T> | ParseError {
  const result = schema.safeParse(data);
  if (!result.success) {
    return zodValidationErrorResult(result.error);
  }

  return {
    ok: true,
    data: result.data,
  };
}

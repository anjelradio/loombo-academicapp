import type { ZodIssue } from "zod";

import { showErrorList } from "@/features/shared/components/toast/toast";

type ValidationErrors = Record<string, string[] | undefined>;

type ApiErrorLike = {
  errors: string[];
  validationErrors?: ValidationErrors;
};

export function handleZodErrors(result: { success: boolean; error?: { issues: ZodIssue[] } }) {
  if (result.success) {
    return;
  }

  showErrorList((result.error?.issues ?? []).map((issue) => issue.message));
}

export function handleValidationErrors(validationErrors: ValidationErrors) {
  const messages = Object.values(validationErrors).flatMap((items) => items ?? []);
  showErrorList(messages);
}

export function handleApiResultError(result: ApiErrorLike) {
  if (result.validationErrors && Object.keys(result.validationErrors).length > 0) {
    handleValidationErrors(result.validationErrors);
    return;
  }

  showErrorList(result.errors);
}

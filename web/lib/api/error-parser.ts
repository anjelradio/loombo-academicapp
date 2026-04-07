export function parseError(error: any): string[] {
  if (!error) return ["Error desconocido"];

  // FastAPI string
  if (typeof error.detail === "string") {
    return [error.detail];
  }

  // FastAPI lista
  if (Array.isArray(error.detail)) {
    return error.detail.map((e: any) => e.msg);
  }

  return ["Error desconocido"];
}
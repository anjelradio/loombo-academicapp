const BOLIVIA_TIME_ZONE = "America/La_Paz";

function toDateWithUtcFallback(value: string) {
  const hasTimeZone = /([zZ]|[+\-]\d{2}:\d{2})$/.test(value);
  const normalizedValue = hasTimeZone ? value : `${value}Z`;
  return new Date(normalizedValue);
}

export function formatBoliviaDateTime(value: string) {
  const date = toDateWithUtcFallback(value);

  return new Intl.DateTimeFormat("es-BO", {
    timeZone: BOLIVIA_TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

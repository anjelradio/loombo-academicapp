"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      closeButton
      position="top-right"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "border shadow-sm",
          success:
            "!bg-emerald-50 !text-emerald-900 !border-emerald-200 dark:!bg-emerald-950 dark:!text-emerald-100 dark:!border-emerald-900",
          error:
            "!bg-rose-50 !text-rose-900 !border-rose-200 dark:!bg-rose-950 dark:!text-rose-100 dark:!border-rose-900",
          info: "!bg-sky-50 !text-sky-900 !border-sky-200 dark:!bg-sky-950 dark:!text-sky-100 dark:!border-sky-900",
          warning:
            "!bg-amber-50 !text-amber-900 !border-amber-200 dark:!bg-amber-950 dark:!text-amber-100 dark:!border-amber-900",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

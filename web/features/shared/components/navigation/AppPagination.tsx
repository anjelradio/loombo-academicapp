import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type AppPaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  pageParamName?: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  query?: Record<string, string | undefined>;
};

function getPageHref(
  basePath: string,
  page: number,
  pageParamName: string,
  query?: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();
  if (page > 1) {
    params.set(pageParamName, String(page));
  }
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value && value.trim()) {
        params.set(key, value.trim());
      }
    }
  }

  if (params.size === 0) return basePath;
  return `${basePath}?${params.toString()}`;
}

export default function AppPagination({
  page,
  totalPages,
  basePath,
  pageParamName = "page",
  hasPrev,
  hasNext,
  query,
}: AppPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-5 flex items-center justify-center gap-2" aria-label="Paginacion">
      {(hasPrev ?? page > 1) ? (
        <Link
          href={getPageHref(basePath, page - 1, pageParamName, query)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white text-[#345b86] transition-colors hover:bg-[#f3f8ff]"
          aria-label="Pagina anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : null}

      {pages.map((currentPage) => {
        const isActive = page === currentPage;

        return (
          <Link
            key={currentPage}
            href={getPageHref(basePath, currentPage, pageParamName, query)}
            className={
              isActive
                ? "inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#1E3A5F] px-3 text-sm font-semibold text-white"
                : "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white px-3 text-sm font-semibold text-[#345b86] transition-colors hover:bg-[#f3f8ff]"
            }
            aria-current={isActive ? "page" : undefined}
          >
            {currentPage}
          </Link>
        );
      })}

      {(hasNext ?? page < totalPages) ? (
        <Link
          href={getPageHref(basePath, page + 1, pageParamName, query)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white text-[#345b86] transition-colors hover:bg-[#f3f8ff]"
          aria-label="Pagina siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}

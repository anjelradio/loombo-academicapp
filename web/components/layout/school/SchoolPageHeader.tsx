import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type SchoolPageHeaderProps = {
  section?: string;
  page: string;
};

export default function SchoolPageHeader({ section, page }: SchoolPageHeaderProps) {
  return (
    <header className="relative flex h-14 shrink-0 items-center gap-2 border-b border-[#2b5177]/65 bg-[#15385b] px-4 md:px-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(170,203,241,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(170,203,241,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />

      <SidebarTrigger className="-ml-1 text-[#EAF2FF] hover:bg-white/10 hover:text-white" />
      <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
      <Breadcrumb>
        <BreadcrumbList>
          {section ? (
            <>
              <BreadcrumbItem className="hidden md:block">
                <span className="text-[#b8cbe2]">{section}</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-[#8ea8c7]" />
            </>
          ) : null}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#EAF2FF]">{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

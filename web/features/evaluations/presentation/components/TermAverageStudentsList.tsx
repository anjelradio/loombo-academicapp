import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { StudentTermAverageRow } from "@/features/evaluations/domain/entities/evaluation";

type TermAverageStudentsListProps = {
  rows: StudentTermAverageRow[];
};

export default function TermAverageStudentsList({ rows }: TermAverageStudentsListProps) {
  if (!rows.length) {
    return (
      <div className="flex h-[500px] items-center rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-4 text-sm text-[#52749a]">
        <p>No hay estudiantes vinculados a este curso.</p>
      </div>
    );
  }

  return (
    <div className="h-[500px] overflow-y-auto rounded-xl border border-[#d5e3f3] bg-[#f8fbff]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="sticky top-0 z-10 bg-[#f8fbff] text-xs uppercase tracking-[0.12em] text-[#5f82aa]">
              Apellido
            </TableHead>
            <TableHead className="sticky top-0 z-10 bg-[#f8fbff] text-xs uppercase tracking-[0.12em] text-[#5f82aa]">
              Nombre
            </TableHead>
            <TableHead className="sticky top-0 z-10 bg-[#f8fbff] text-xs uppercase tracking-[0.12em] text-[#5f82aa]">
              Promedio
            </TableHead>
            <TableHead className="sticky top-0 z-10 bg-[#f8fbff] text-xs uppercase tracking-[0.12em] text-[#5f82aa]">
              Detalle
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.studentId} className="border-[#dbe9f8] hover:bg-[#f1f7ff]">
              <TableCell className="font-medium text-[#234f7e]">{row.lastName}</TableCell>
              <TableCell className="text-[#315a85]">{row.firstName}</TableCell>
              <TableCell className="text-[#315a85]">
                {row.status === "calculado" && row.finalScore !== null
                  ? row.finalScore.toFixed(2)
                  : "Sin calcular"}
              </TableCell>
              <TableCell className="text-[#315a85]">
                <Popover>
                  <PopoverTrigger className="rounded-md border border-[#c7dbf1] bg-white px-2.5 py-1 text-xs font-semibold text-[#355f89] hover:bg-[#eef6ff]">
                    Ver detalle
                  </PopoverTrigger>

                  <PopoverContent
                    side="bottom"
                    align="start"
                    className="w-[320px] rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-3"
                  >
                    <PopoverHeader className="gap-0.5">
                      <PopoverTitle className="text-sm font-semibold text-[#1f4d7d]">
                        {row.firstName} {row.lastName}
                      </PopoverTitle>
                      <PopoverDescription className="text-xs text-[#5f82aa]">
                        Desglose de dimensiones del trimestre seleccionado.
                      </PopoverDescription>
                    </PopoverHeader>

                    <div className="space-y-2 rounded-lg border border-[#dbe9f8] bg-white p-2.5">
                      <div className="flex items-center justify-between text-xs text-[#315a85]">
                        <span className="font-medium">Saber</span>
                        <span>{row.saberScore !== null ? row.saberScore.toFixed(2) : "Sin calcular"}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#315a85]">
                        <span className="font-medium">Hacer</span>
                        <span>{row.hacerScore !== null ? row.hacerScore.toFixed(2) : "Sin calcular"}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#315a85]">
                        <span className="font-medium">Ser</span>
                        <span>{row.serScore !== null ? row.serScore.toFixed(2) : "Sin calcular"}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#315a85]">
                        <span className="font-medium">Autoevaluacion</span>
                        <span>
                          {row.autoevaluacionScore !== null
                            ? row.autoevaluacionScore.toFixed(2)
                            : "Sin calcular"}
                        </span>
                      </div>
                      <div className="mt-1 border-t border-[#e4eef9] pt-2">
                        <div className="flex items-center justify-between text-sm font-semibold text-[#1f4d7d]">
                          <span>Promedio final</span>
                          <span>{row.finalScore !== null ? row.finalScore.toFixed(2) : "Sin calcular"}</span>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

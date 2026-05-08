import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StudentGradebookRow } from "@/features/students/domain/entities/student-gradebook";

import UpsertGradeButton from "./UpsertGradeButton";

type EvaluationStudentsTableProps = {
  schoolId: string;
  evaluationId: string;
  rows: StudentGradebookRow[];
};

export default function EvaluationStudentsTable({
  schoolId,
  evaluationId,
  rows,
}: EvaluationStudentsTableProps) {
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
              Calificacion
            </TableHead>
            <TableHead className="sticky top-0 z-10 bg-[#f8fbff] text-xs uppercase tracking-[0.12em] text-[#5f82aa]">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.studentId} className="border-[#dbe9f8] hover:bg-[#f1f7ff]">
              <TableCell className="font-medium text-[#234f7e]">{row.lastName}</TableCell>
              <TableCell className="text-[#315a85]">{row.firstName}</TableCell>
              <TableCell className="text-[#315a85]">
                {row.status === "calificado" ? row.score : "Sin calificar"}
              </TableCell>
              <TableCell>
                <UpsertGradeButton
                  schoolId={schoolId}
                  evaluationId={evaluationId}
                  row={row}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

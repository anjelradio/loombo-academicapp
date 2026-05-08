"use client";

import { useMemo, useState, useTransition } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  AttendanceGradebookRow,
  AttendanceStatusOption,
} from "@/features/attendance/domain/entities/attendance-gradebook";
import { upsertAttendanceRecord } from "@/features/attendance/presentation/actions/upsert-attendance-record-action";
import { appToast } from "@/features/shared/components/toast/toast";

type AttendanceStudentsTableProps = {
  schoolId: string;
  sessionId: string;
  rows: AttendanceGradebookRow[];
  statusOptions: AttendanceStatusOption[];
  disabled?: boolean;
};

export default function AttendanceStudentsTable({
  schoolId,
  sessionId,
  rows,
  statusOptions,
  disabled = false,
}: AttendanceStudentsTableProps) {
  const [localRows, setLocalRows] = useState(rows);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sortedStatuses = useMemo(() => {
    const order = ["Presente", "Licencia", "Falta"];
    return [...statusOptions].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  }, [statusOptions]);

  const statusByTone = useMemo(() => {
    const findByName = (name: string) =>
      sortedStatuses.find((status) => status.name.toLowerCase() === name.toLowerCase()) ?? null;

    return {
      presente: findByName("Presente"),
      licencia: findByName("Licencia"),
      falta: findByName("Falta"),
    };
  }, [sortedStatuses]);

  const handleMark = (studentId: string, status: AttendanceStatusOption) => {
    if (disabled) return;

    const key = `${studentId}:${status.id}`;
    setPendingKey(key);
    startTransition(async () => {
      const result = await upsertAttendanceRecord(schoolId, sessionId, studentId, {
        statusId: status.id,
      });

      if (!result.ok) {
        appToast.error(result.errors[0] ?? "No se pudo registrar la asistencia");
        setPendingKey(null);
        return;
      }

      setLocalRows((current) =>
        current.map((row) => (row.studentId === studentId ? result.data : row)),
      );
      setPendingKey(null);
    });
  };

  if (!localRows.length) {
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
              Estado
            </TableHead>
            <TableHead className="sticky top-0 z-10 bg-[#e4f7ec] text-center text-xs uppercase tracking-[0.12em] text-[#2f7a4d]">
              Presente
            </TableHead>
            <TableHead className="sticky top-0 z-10 bg-[#fff5d8] text-center text-xs uppercase tracking-[0.12em] text-[#8f6a00]">
              Licencia
            </TableHead>
            <TableHead className="sticky top-0 z-10 bg-[#fde2e2] text-center text-xs uppercase tracking-[0.12em] text-[#9a3434]">
              Falta
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localRows.map((row) => (
            <TableRow key={row.studentId} className="h-14 border-[#dbe9f8] hover:bg-[#f1f7ff]">
              <TableCell className="font-medium text-[#234f7e]">{row.lastName}</TableCell>
              <TableCell className="text-[#315a85]">{row.firstName}</TableCell>
              <TableCell className="text-[#315a85]">{row.statusName ?? "Sin registrar"}</TableCell>
              {[
                { tone: "presente", bg: "bg-[#e4f7ec]", active: "bg-[#1f9d55]", status: statusByTone.presente },
                { tone: "licencia", bg: "bg-[#fff5d8]", active: "bg-[#e0a100]", status: statusByTone.licencia },
                { tone: "falta", bg: "bg-[#fde2e2]", active: "bg-[#d64545]", status: statusByTone.falta },
              ].map((item) => {
                if (!item.status) {
                  return <TableCell key={item.tone} className={`${item.bg} p-0`} />;
                }

                const status = item.status;

                const isSelected = row.statusId === status.id;
                const key = `${row.studentId}:${status.id}`;
                const isLoading = pendingKey === key && isPending;

                return (
                  <TableCell key={item.tone} className={`${item.bg} p-0`}>
                    <button
                      type="button"
                      disabled={disabled || isLoading}
                      onClick={() => handleMark(row.studentId, status)}
                      className="flex h-full min-h-[56px] w-full items-center justify-center"
                      aria-label={`Marcar ${status.name} para ${row.firstName} ${row.lastName}`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white/90 transition-transform ${
                          isSelected ? "scale-110" : "scale-100"
                        }`}
                      >
                        {isLoading ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F]" />
                        ) : isSelected ? (
                          <span className={`h-4 w-4 rounded-full ${item.active}`} />
                        ) : null}
                      </span>
                    </button>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

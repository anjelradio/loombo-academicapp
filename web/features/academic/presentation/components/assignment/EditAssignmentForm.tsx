"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AssignmentUpdateSchema } from "@/features/academic/data/schemas/assignments";
import type {
  AssignmentCourseGroup,
  AssignmentSubjectOption,
} from "@/features/academic/domain/entities/assignment";
import { updateTeacherAssignment } from "@/features/academic/presentation/actions/assignments/update-assignment-action";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import SelectableChips from "@/features/shared/components/ui/SelectableChips";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

type EditAssignmentFormProps = {
  schoolId: string;
  teacherId: string;
  assignment: AssignmentCourseGroup;
  subjectOptions: AssignmentSubjectOption[];
  onClose: () => void;
};

export default function EditAssignmentForm({
  schoolId,
  teacherId,
  assignment,
  subjectOptions,
  onClose,
}: EditAssignmentFormProps) {
  const router = useRouter();
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(
    assignment.subjects.map((subject) => subject.subjectId),
  );

  const handleSubmit = async () => {
    await submitWithSchema({
      schema: AssignmentUpdateSchema,
      payload: {
        subjectIds: selectedSubjectIds,
      },
      action: (data) => updateTeacherAssignment(schoolId, teacherId, assignment.courseId, data),
      onSuccess: () => {
        appToast.success("Asignacion actualizada correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#1E3A5F]">Curso seleccionado</p>
        <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] px-3 py-2 text-sm text-[#315a85]">
          {assignment.courseName}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#1E3A5F]">Materias asignadas</p>
        {subjectOptions.length ? (
          <SelectableChips
            options={subjectOptions.map((subject) => ({
              value: subject.subjectId,
              label: subject.subjectName,
            }))}
            selectedValues={selectedSubjectIds}
            onChange={setSelectedSubjectIds}
            multiple
          />
        ) : (
          <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-3 text-sm text-[#52749a]">
            No hay materias disponibles para este curso.
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>
        <SubmitButton
          pendingText="Guardando..."
          className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
        >
          Guardar cambios
        </SubmitButton>
      </div>
    </form>
  );
}

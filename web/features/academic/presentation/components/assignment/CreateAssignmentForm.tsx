"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AssignmentCreateSchema } from "@/features/academic/data/schemas/assignments";
import type {
  AssignmentCourseOption,
  AssignmentSubjectOption,
} from "@/features/academic/domain/entities/assignment";
import { createTeacherAssignment } from "@/features/academic/presentation/actions/assignments/create-assignment-action";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { ModalSecondaryButton } from "@/features/shared/components/modals/ModalSecondaryButton";
import { appToast } from "@/features/shared/components/toast/toast";
import SelectableChips from "@/features/shared/components/ui/SelectableChips";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";

type CreateAssignmentFormProps = {
  schoolId: string;
  teacherId: string;
  courseOptions: AssignmentCourseOption[];
  subjectOptionsByCourse: Record<string, AssignmentSubjectOption[]>;
  onClose: () => void;
};

export default function CreateAssignmentForm({
  schoolId,
  teacherId,
  courseOptions,
  subjectOptionsByCourse,
  onClose,
}: CreateAssignmentFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const subjectOptions = useMemo(
    () => (selectedCourseId ? (subjectOptionsByCourse[selectedCourseId] ?? []) : []),
    [selectedCourseId, subjectOptionsByCourse],
  );

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedSubjectIds([]);
  };

  const handleNext = () => {
    if (!selectedCourseId) {
      appToast.error("Debes seleccionar un curso");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    await submitWithSchema({
      schema: AssignmentCreateSchema,
      payload: {
        courseId: selectedCourseId,
        subjectIds: selectedSubjectIds,
      },
      action: (data) => createTeacherAssignment(schoolId, teacherId, data),
      onSuccess: () => {
        appToast.success("Asignacion registrada correctamente");
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {step === 1 ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#1E3A5F]">Paso 1: Selecciona un curso</p>
          {courseOptions.length ? (
            <SelectableChips
              options={courseOptions.map((course) => ({ value: course.courseId, label: course.courseName }))}
              selectedValues={selectedCourseId ? [selectedCourseId] : []}
              onChange={(values) => handleSelectCourse(values[0] ?? "")}
            />
          ) : (
            <div className="rounded-xl border border-[#d5e3f3] bg-[#f8fbff] p-3 text-sm text-[#52749a]">
              No hay cursos disponibles con materias vinculadas.
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#1E3A5F]">Paso 2: Selecciona las materias</p>
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
              Este curso no tiene materias disponibles para asignar.
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <ModalSecondaryButton onClick={onClose}>Cancelar</ModalSecondaryButton>

        {step === 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47] disabled:opacity-70"
            disabled={!courseOptions.length}
          >
            Siguiente
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#c7dbf1] bg-white px-5 font-semibold text-[#345b86] hover:bg-[#f3f8ff]"
            >
              Volver
            </button>
            <SubmitButton
              pendingText="Registrando..."
              className="h-12 bg-[#1E3A5F] px-5 font-semibold text-white hover:bg-[#152B47]"
            >
              Confirmar
            </SubmitButton>
          </>
        )}
      </div>
    </form>
  );
}

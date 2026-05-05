"use client";

import { useMemo, useState } from "react";

import type { Course, CourseFormOptions } from "@/features/academic/domain/entities/course";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";

import CourseLevelChipsSection from "./CourseLevelChipsSection";
import CourseSubjectsChipsSection from "./CourseSubjectsChipsSection";

type CourseFormProps = {
  formOptions: CourseFormOptions;
  course?: Course;
};

export default function CourseForm({ formOptions, course }: CourseFormProps) {
  const defaultLevelId = course?.schoolLevelId ?? "";
  const defaultSubjectIds = useMemo(() => course?.subjectIds ?? [], [course?.subjectIds]);

  const [selectedLevelId, setSelectedLevelId] = useState(defaultLevelId);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(defaultSubjectIds);

  return (
    <div className="space-y-5">
      <FormTextField
        id="name"
        name="name"
        label="Nombre del curso"
        labelClassName="text-base font-semibold text-gray-700"
        placeholder="Ej: Primero de Secundaria"
        defaultValue={course?.name}
        required
      />

      <CourseLevelChipsSection
        options={formOptions.schoolLevels}
        selectedLevelId={selectedLevelId}
        onChange={setSelectedLevelId}
      />

      <CourseSubjectsChipsSection
        options={formOptions.subjects}
        selectedSubjectIds={selectedSubjectIds}
        onChange={setSelectedSubjectIds}
      />

      <input type="hidden" name="schoolLevelId" value={selectedLevelId} />
      {selectedSubjectIds.map((subjectId) => (
        <input key={subjectId} type="hidden" name="subjectIds" value={subjectId} />
      ))}
    </div>
  );
}

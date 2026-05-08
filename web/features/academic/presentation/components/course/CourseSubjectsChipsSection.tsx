import { Label } from "@/components/ui/label";
import type { CourseFormOptions } from "@/features/academic/domain/entities/course";
import SelectableChips from "@/features/shared/components/ui/SelectableChips";

type CourseSubjectsChipsSectionProps = {
  options: CourseFormOptions["subjects"];
  selectedSubjectIds: string[];
  onChange: (subjectIds: string[]) => void;
};

export default function CourseSubjectsChipsSection({
  options,
  selectedSubjectIds,
  onChange,
}: CourseSubjectsChipsSectionProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold text-gray-700">Materias del curso</Label>
      <SelectableChips
        options={options.map((subject) => ({ value: subject.id, label: subject.name }))}
        selectedValues={selectedSubjectIds}
        onChange={onChange}
        multiple
      />
    </div>
  );
}

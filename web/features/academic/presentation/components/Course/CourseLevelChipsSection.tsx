import { Label } from "@/components/ui/label";
import type { CourseFormOptions } from "@/features/academic/domain/entities/course";
import SelectableChips from "@/features/shared/components/ui/SelectableChips";

type CourseLevelChipsSectionProps = {
  options: CourseFormOptions["schoolLevels"];
  selectedLevelId: string;
  onChange: (levelId: string) => void;
};

export default function CourseLevelChipsSection({
  options,
  selectedLevelId,
  onChange,
}: CourseLevelChipsSectionProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold text-gray-700">Nivel del curso</Label>
      <SelectableChips
        options={options.map((level) => ({ value: level.id, label: level.name }))}
        selectedValues={selectedLevelId ? [selectedLevelId] : []}
        onChange={(values) => onChange(values[0] ?? "")}
      />
    </div>
  );
}

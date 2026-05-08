import type { Term } from "@/features/academic/domain/entities/term";
import { FormDateField } from "@/features/shared/components/forms/FormDateField";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";

type TermFormProps = {
  term?: Term;
};

export default function TermForm({ term }: TermFormProps) {
  return (
    <div className="space-y-5">
      <FormTextField
        id="name"
        name="name"
        label="Nombre del trimestre"
        labelClassName="text-base font-semibold text-gray-700"
        placeholder="Ej: Primer trimestre"
        defaultValue={term?.name}
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormDateField
          id="startDate"
          name="startDate"
          label="Fecha de inicio"
          labelClassName="text-base font-semibold text-gray-700"
          defaultValue={term?.startDate?.slice(0, 10)}
          required
        />

        <FormDateField
          id="endDate"
          name="endDate"
          label="Fecha de fin"
          labelClassName="text-base font-semibold text-gray-700"
          defaultValue={term?.endDate?.slice(0, 10)}
          required
        />
      </div>
    </div>
  );
}

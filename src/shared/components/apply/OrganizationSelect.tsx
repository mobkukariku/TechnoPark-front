"use client";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useTranslations } from "next-intl";

interface OrganizationSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: string;
}

export const OrganizationSelect = <T extends FieldValues>({
  control,
  name,
  error,
}: OrganizationSelectProps<T>) => {
  const t = useTranslations("joinUs");

  const organizations = [
    { id: "Technopark", name: "Technopark" },
    { id: "Enactus", name: "Enactus" },
    { id: "HultPrize", name: "HultPrize" },
  ];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
            <SelectValue placeholder={t("selectOrganization")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("organizationInterest")}</SelectLabel>
              {organizations.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

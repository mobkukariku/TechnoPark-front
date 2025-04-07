"use client";
import { useEffect, useState } from "react";
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
import { getJobRoles } from "@/api/requestsApi";
import { useTranslations } from "next-intl";

interface JobRole {
  id: string;
  name: string;
}

interface JobRoleSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: string;
}

export const JobRoleSelect = <T extends FieldValues>({
  control,
  name,
  error,
}: JobRoleSelectProps<T>) => {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const t = useTranslations("joinUs");

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const data: JobRole[] = await getJobRoles();
        setJobRoles(data);
      } catch (err) {
        console.error("Error fetching job roles:", err);
        setJobRoles([]);
      }
    };
    fetchJobRoles();
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
            <SelectValue placeholder={t("selectJobRole")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("jobRole")}</SelectLabel>
              {jobRoles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

"use client";
import { FC, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
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

interface JobRoleSelectProps {
  control: Control<any>;
  name: string;
  error?: string;
}

export const JobRoleSelect: FC<JobRoleSelectProps> = ({
  control,
  name,
  error,
}) => {
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

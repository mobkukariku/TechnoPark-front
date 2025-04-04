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
import { getDirections } from "@/api/tagsApi";
import { useTranslations } from "next-intl";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  selectedCourse: string;
  coverLetter: string;
}

interface JoinUsSelectProps {
  control: Control<FormValues>;
  name: keyof FormValues;
  error?: string;
}

interface Directions {
  id: string;
  name: string;
}

export const JoinUsSelect: FC<JoinUsSelectProps> = ({
  control,
  name,
  error,
}) => {
  const [directions, setDirections] = useState<Directions[]>([]);

  const t = useTranslations("joinUs");

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const data: Directions[] = (await getDirections()) as Directions[];
        setDirections(data);
      } catch (error) {
        console.error("Error fetching directions:", error);
        setDirections([]);
      }
    };
    fetchDirections();
  }, []);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              className={`w-[340px] border-[#437DFF] ${
                error ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder={t("selectDirection")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("direction")}</SelectLabel>
                {directions.map((item: Directions) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

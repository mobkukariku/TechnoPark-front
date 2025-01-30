import { FC } from "react";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui";

interface JoinUsSelectProps {
    control: any;
    name: string;
    error?: string;
}

export const JoinUsSelect: FC<JoinUsSelectProps> = ({ control, name, error }) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className={`w-[340px] ${error ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Выберите направление" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Направление</SelectLabel>
                                <SelectItem value="software">Software</SelectItem>
                                <SelectItem value="hardware">Hardware</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
};

"use client"
import {FC, useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui";
import {getDirections} from "@/api/api";

interface JoinUsSelectProps {
    control: any;
    name: string;
    error?: string;
}

interface Directions {
    id: string;
    name: string;
}

export const JoinUsSelect: FC<JoinUsSelectProps> = ({ control, name, error }) => {
    const [directions, setDirections] = useState<Directions[]>([])

    useEffect(() => {
        const fetchDirections = async () => {
            try {
                const data = await getDirections();
                setDirections(data);
            } catch (error) {
                console.error("Error fetching directions:", error);
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
                        <SelectTrigger className={`w-[340px] border-[#437DFF] ${error ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Выберите направление" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Направление</SelectLabel>
                                {directions.map((item:Directions) => (
                                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
};

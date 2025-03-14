"use client";

import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Button, Checkbox, InputWithLabel, TextareaWithLabel} from "@/shared/ui";
import { Label } from "@/shared/ui/label";
import { Toaster, toast } from "react-hot-toast";
import useProfileStore from "@/store/useProfileStore";
import useWorkExperienceStore, { WorkExperience } from "@/store/useWorkExperienceStore";

const schema = yup.object({
    id: yup.string().optional(),
    company: yup.string().required("Название компании обязательно"),
    position: yup.string().required("Позиция обязательна"),
    startDate: yup.date().typeError("Некорректная дата").required("Дата начала обязательна"),
    endDate: yup.date().nullable().typeError("Некорректная дата").when("isStillWork", {
        is: true,
        then: (schema) => schema.notRequired().nullable(),
        otherwise: (schema) => schema.min(yup.ref("startDate"), "Дата окончания не может быть раньше даты начала"),
    }),
    description: yup.string().nullable(),
});

interface WorkExpFormProps {
    workExperience?: WorkExperience;
}

export const WorkExpForm: FC<WorkExpFormProps> = ({ workExperience }) => {
    const {  addWorkExperience, updateWorkExperience, deleteWorkExperience } = useWorkExperienceStore();
    const { profile } = useProfileStore();
    const [isStillWork, setIsStillWork] = useState(!!workExperience?.endDate === null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<yup.InferType<typeof schema>>({
        resolver: yupResolver(schema),
        defaultValues: workExperience || {
            company: "",
            position: "",
            startDate: new Date(),
            endDate: null,
            description: "",
        },
    });

    useEffect(() => {
        if (workExperience) {
            reset(workExperience);
            setIsStillWork(workExperience.endDate === null);
        }
    }, [workExperience, reset]);

    const onSubmit = async (data: yup.InferType<typeof schema>) => {
        try {
            if (data.id) {
                updateWorkExperience(data.id, { ...data, endDate: isStillWork ? null : data.endDate });
                toast.success("Опыт работы успешно обновлён!");
            } else {
                await addWorkExperience({ ...data, userId: profile?.id || "", endDate: isStillWork ? null : data.endDate });
                toast.success("Опыт работы успешно добавлен!");
            }
            reset();
        } catch (error) {
            toast.error("Ошибка при сохранении опыта работы!");
            console.error("Error:", error);
        }
    };

    const onDelete = async () => {
        if (!workExperience?.id) return;
        try {
            await deleteWorkExperience(workExperience.id);
            toast.success("Опыт работы успешно удалён!");
            reset();  // Очистка формы
        } catch (error) {
            toast.error("Ошибка при удалении опыта работы!");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <InputWithLabel label="Название компании" placeholder="Название" {...register("company")} error={errors.company?.message} />
                <InputWithLabel label="Позиция" placeholder="Позиция" {...register("position")} error={errors.position?.message} />
                <InputWithLabel label="Дата начала работы" type="date" {...register("startDate")} error={errors.startDate?.message} />

                <div className="flex items-center gap-2">
                    <Checkbox id="hasEndDate" checked={isStillWork} onCheckedChange={() => setIsStillWork((prev) => !prev)} />
                    <Label htmlFor="hasEndDate">Еще работает в данной компании</Label>
                </div>

                <InputWithLabel
                    label="Дата окончания работы"
                    type="date"
                    {...register("endDate")}
                    disabled={isStillWork}
                    error={errors.endDate?.message}
                />

                <TextareaWithLabel label="Описание работы" placeholder="Опишите свой опыт работы" {...register("description")} error={errors.description?.message} />

                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Сохранение..." : workExperience ? "Обновить" : "Сохранить"}</Button>
                {workExperience && <Button variant="secondary" onClick={onDelete}>Удалить</Button>}
            </form>
            <Toaster />
        </div>
    );
};
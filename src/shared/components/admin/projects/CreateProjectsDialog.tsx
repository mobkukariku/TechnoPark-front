"use client";

import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Button, Textarea } from "@/shared/ui";
import { CirclePlus } from "lucide-react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import useProjectsStore from "@/store/useProjectsStore"; // Подключаем Zustand store

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

interface FormData {
    title: string;
    description: string;
    departmentId: string;
    images: File[];
}

const validationSchema = Yup.object({
    title: Yup.string().required("Название обязательно"),
    description: Yup.string().required("Описание обязательно"),
    images: Yup.array().min(1, "Минимум одно изображение").required("Изображение обязательно"),
    departmentId: Yup.string().required("Направление тоже важно"),
});

export const CreateProjectsDialog: FC = () => {
    const { createProject } = useProjectsStore();
    const { handleSubmit, control, setValue, reset } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: { title: "", description: "", departmentId: "", images: [] },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createProject(data);
            reset(); // Очищаем форму после успешной отправки
        } catch (error) {
            console.error("Ошибка создания проекта:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><CirclePlus /> Добавить</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] min-h-[700px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[32px] text-center">Добавить проект</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mt-[10px] gap-[23px]">
                        <Controller
                            name="images"
                            control={control}
                            render={({ field }) => (
                                <FilePond
                                    files={field.value}
                                    onupdatefiles={(fileItems) => setValue("images", fileItems.map(f => f.file as File))}
                                    allowMultiple={true}
                                    maxFiles={5}
                                    maxFileSize="5MB"
                                    acceptedFileTypes={["image/*"]}
                                    labelIdle='Перетащите файлы или <span class="filepond--label-action">выберите</span>'
                                    className="h-[250px]" // Увеличиваем высоту
                                />
                            )}
                        />

                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <Input {...field} type="text" placeholder="Название" />}
                        />
                        <Controller
                            name="departmentId"
                            control={control}
                            render={({ field }) => <Input {...field} type="text" placeholder="Департамент ID" />}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea {...field} placeholder="Описание" className="h-[150px]" />
                            )}
                        />
                        <Button type="submit">Отправить</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

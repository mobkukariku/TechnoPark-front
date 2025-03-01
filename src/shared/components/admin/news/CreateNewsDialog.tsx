"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input"
import { FC } from "react";
import { Button, Textarea } from "@/shared/ui";
import { CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { TagCheckboxes } from "@/shared/components";
import  toast, {Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import useNewsStore from "@/store/useNewsStore";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface FormData {
    title: string;
    content: string;
    tags: string;
    image: File | null;
}

const validationSchema = Yup.object({
    title: Yup.string().required("Название обязательно"),
    content: Yup.string().required("Содержание обязательно"),
    image: Yup.mixed().nullable().required("Изображение обязательно")
});

export const CreateNewsDialog: FC = () => {
    const { handleSubmit, control } = useForm<FormData>({
        //@ts-expect-error: Type mismatch due to resolver type
        resolver: yupResolver(validationSchema),
        defaultValues: { title: "", content: "", image: null }
    });
    const { submitNews, tags } = useNewsStore();

    const onSubmit = async (data: FormData) => {
        try {
            await submitNews(data.title, data.content, data.image, tags);
            toast.success("Новость была создана!");
            console.log(tags);
        } catch {
            toast.error("Ошибка при отправке");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><CirclePlus />Добавить</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[32px] text-center">Создать новость</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="flex flex-col mt-[10px] gap-[23px]">
                        <Controller
                            name="image"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <Input
                                    type="file"
                                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                                />
                            )}
                        />
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="text" placeholder="Название" />
                            )}
                        />
                        <TagCheckboxes className={"flex flex-wrap gap-[10px]"} />
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <Textarea {...field} placeholder="Содержание" className="h-[400px]" />
                            )}
                        />
                        <Button type="submit">Отправить</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

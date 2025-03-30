"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { FC, useEffect } from "react";
import { Button } from "@/shared/ui";
import { Pencil } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { TagCheckboxes } from "@/shared/components";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import useNewsStore from "@/store/useNewsStore";
import * as Yup from "yup";
import NewsContentEditor from "@/shared/components/admin/news/NewsContentEditor";

interface FormData {
    title: string;
    content: string;
    image?: File | null | undefined;
}

const validationSchema = Yup.object({
    title: Yup.string().required("Название обязательно"),
    content: Yup.string().required("Содержание обязательно"),
    image: Yup.mixed<File>().nullable(),
});

interface EditNewsDialogProps {
    id: string;
}

export const EditNewsDialog: FC<EditNewsDialogProps> = ({ id }) => {
    const { updateNews, setCurrentNews, currentNews } = useNewsStore();
    const { handleSubmit, control, reset, watch, getValues } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: { title: "", content: "", image: null },
    });

    const handleOpen = (isOpen: boolean) => {
        if (isOpen) {
            setCurrentNews(id);
        }
    };

    useEffect(() => {
        if (currentNews && currentNews.title) {
            const prevNews = JSON.stringify(getValues());

            if (prevNews !== JSON.stringify({ title: currentNews.title, content: currentNews.content, image: null })) {
                reset({
                    title: currentNews.title || "",
                    content: currentNews.content || "",
                    image: null,
                });
            }
        }
    }, [currentNews, reset, getValues]);


    const onSubmit = async (data: FormData) => {
        if (!data.title || !data.content) {
            toast.error("Заполните все поля!");
            return;
        }

        try {
            console.log("Submitting data:", data);
            await updateNews(id, data);
            toast.success("Новость обновлена!");
        } catch {
            toast.error("Ошибка при обновлении");
        }
    };

    return (
        <Dialog onOpenChange={handleOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Pencil /> Редактировать
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-[32px] text-center">
                        Редактировать новость
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mt-[10px] gap-[23px]">
                        {currentNews?.imageURL && (
                            <img
                                src={currentNews.imageURL}
                                alt="Текущее изображение"
                                className="max-w-full max-h-[300px] object-cover rounded-[5px]"
                            />
                        )}
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
                            render={({ field }) => <Input {...field} type="text" placeholder="Название" />}
                        />
                        <TagCheckboxes className="flex flex-wrap gap-[10px]" isFilter={true} />
                        <Controller
                            name="content"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <NewsContentEditor onChange={onChange} content={value} />
                            )}
                        />
                        <Button type="submit" disabled={!watch("title") || !watch("content")}>
                            Сохранить
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

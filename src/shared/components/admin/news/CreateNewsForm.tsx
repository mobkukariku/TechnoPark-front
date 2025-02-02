"use client"
import { FC } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea } from "@/shared/ui";
import { toast, Toaster } from "react-hot-toast";
import useNewsStore from "@/store/useNewsStore";

const validationSchema = Yup.object({
    title: Yup.string().required("Название обязательно"),
    content: Yup.string().required("Содержание обязательно"),
    tags: Yup.string().required(),
    image: Yup.mixed().nullable().required("Изображение обязательно")
});

interface FormData {
    title: string;
    content: string;
    tags: string;
    image: File | null;
}

export const CreateNewsForm: FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<FormData>({
        //@ts-ignore
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: '',
            image: null,
        }
    });

    const { submitNews } = useNewsStore();
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            await submitNews(data.title, data.content, data.image, data.tags); // Преобразуем строку в массив
            toast.success("Заявка отправлена!");
            router.push("/admin");
        } catch (error) {
            toast.error("Ошибка при отправке");
        }
    };


    const showErrors = () => {
        Object.values(errors).forEach(error => {
            if (error?.message) {
                toast.error(error.message);
            }
        });
    };

    return (
        <div className="max-w-[500px] z-20 relative mx-auto">
            <form
                className="bg-[#D8E7FF] rounded-[14px] pt-[38px] pb-[58px] flex flex-col justify-center items-center"
                onSubmit={handleSubmit(onSubmit, showErrors)}
            >
                <p className="font-bold text-[32px] text-center">Создать новость</p>
                <div className="flex flex-col w-fit mt-[50px] gap-[23px]">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Название"
                                className={`w-[340px] transition-colors ${errors.title ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                placeholder="Содержание"
                                className={`w-[340px] transition-colors ${errors.content ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Теги (через запятую)"
                                className={`w-[340px] transition-colors ${errors.tags ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Controller
                        name="image"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    onChange(file); // Обновляем поле с файлом
                                }}
                                className={`w-[340px] transition-colors ${errors.image ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Button type="submit">Отправить</Button>
                </div>
            </form>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { Button, InputWithLabel } from "@/shared/ui";
import useProfileStore from "@/store/useProfileStore";
import {axiosInstance} from "@/api/axiosInstance";

const schema = yup.object({
    phoneNumber: yup.string().optional(),
    telegram: yup.string().optional(),
    github: yup.string().optional(),
    linkedin: yup.string().optional(),
});

export const ContactsEditForm: FC = () => {

    const { profile } = useProfileStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<yup.InferType<typeof schema>>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: yup.InferType<typeof schema>) => {
        try {
            if (!profile?.id) {
                toast.error("Ошибка: пользователь не найден!");
                return;
            }

            const contacts = [
                data.phoneNumber && { userId: profile.id, type: "phone", value: data.phoneNumber },
                data.telegram && { userId: profile.id, type: "telegram", value: data.telegram },
                data.github && { userId: profile.id, type: "github", value: data.github },
                data.linkedin && { userId: profile.id, type: "linkedin", value: data.linkedin },
            ].filter(Boolean); // Убираем `undefined`

            if (contacts.length === 0) {
                toast.error("Добавьте хотя бы один контакт!");
                return;
            }

            await axiosInstance.post("/contacts", { contacts }); // Отправка на бэкенд

            toast.success("Контакты успешно сохранены!");
            reset();
        } catch (error) {
            toast.error("Ошибка при сохранении контактов!");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <InputWithLabel label="Телеграм" placeholder="@abcd" {...register("telegram")} error={errors.telegram?.message} />
                <InputWithLabel label="Номер Телефона" placeholder="877777777" {...register("phoneNumber")} error={errors.phoneNumber?.message} />
                <InputWithLabel label="Гитхаб" placeholder="exampleNick" {...register("github")} error={errors.github?.message} />
                <InputWithLabel label="Линкедин" placeholder="линк закинь прост" {...register("linkedin")} error={errors.linkedin?.message} />
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Сохранение..." : "Сохранить"}</Button>
            </form>
        </div>
    );
};

"use client";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button, Input } from "@/shared/ui";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useContactsStore from "@/store/useContactsStore";
import { ContactSelect } from "@/shared/components/profile/contacts/ContactSelect";
import useProfileStore from "@/store/useProfileStore";

interface ContactFormData {
    type: string;
    value: string;
}

const validationSchema = Yup.object({
    type: Yup.string().required("Выберите тип контакта"),
    value: Yup.string().required("Введите значение контакта"),
});

export const ContactsAddDialog: FC = () => {
    const { addContact } = useContactsStore();
    const { profile } = useProfileStore();

    const { handleSubmit, control, reset } = useForm<ContactFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: { type: "", value: "" },
    });

    const onSubmit = (data: ContactFormData) => {
        addContact({
            userId: profile?.id as string,
            type: data.type,
            value: data.value
        });
        reset(); // Очищаем форму после добавления
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-[150px]">+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавить контакт</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Контролируемый селект */}
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <ContactSelect value={field.value} onChange={field.onChange} />
                        )}
                    />
                    {/* Поле ввода */}
                    <Controller
                        name="value"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} type="text" placeholder="Введите контакт" />
                        )}
                    />
                    <Button type="submit" className="w-full">Сохранить</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

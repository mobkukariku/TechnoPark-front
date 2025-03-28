"use client";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Button, Input, Label, Textarea} from "@/shared/ui";
import Image from "next/image";
import useProfileStore from "@/store/useProfileStore";

interface ProfileFormData {
    name: string;
    image?: File | null;
    position: string;
    description: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Введите имя"),
    image: Yup.mixed<File>().nullable(),
    position: Yup.string().required("Введите должность"),
    description: Yup.string().required("Введите описание"),
});

interface ProfileFormProps {
    onSuccess: () => void;
}

export const ProfileForm: FC<ProfileFormProps> = ({ onSuccess }) => {
    const { profile, updateProfile } = useProfileStore();
    const [preview, setPreview] = useState<string | null>(profile?.memberProfile?.imageURL || null);

    const { handleSubmit, control, reset, setValue } = useForm<ProfileFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: profile?.name || "",
            image: null,
            position: profile?.memberProfile?.position || "",
            description: profile?.memberProfile?.description || "",
        },
    });

    const onSubmit = (data: ProfileFormData) => {
        if (!profile) return;

        const formData = new FormData();
        if (data.image) formData.append("image", data.image);

        formData.append("name", data.name);
        formData.append("position", data.position);
        formData.append("description", data.description);

        updateProfile(profile.id, formData);
        reset();
        onSuccess();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setValue("image", file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Фото профиля */}
            <div className="flex flex-col items-center">
                <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="w-[250px] h-[250px] rounded-full overflow-hidden flex items-center justify-center bg-gray-300 mt-2">
                        {preview ? (
                            <Image src={preview} alt="Profile photo" width={250} height={250} className="object-cover w-full h-full aspect-square" />
                        ) : (
                            "📷"
                        )}
                    </div>
                </label>
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            {/* Имя */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Имя</Label>
                <Controller name="name" control={control} render={({ field }) => <Input {...field} id="name" type="text" placeholder="Введите имя" />} />
            </div>

            {/* Должность */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="position">Должность</Label>
                <Controller name="position" control={control} render={({ field }) => <Input {...field} id="position" type="text" placeholder="Введите свою должность" />} />
            </div>

            {/* Описание */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Описание</Label>
                <Controller name="description" control={control} render={({ field }) => <Textarea {...field} id="description" placeholder="Введите описание" />} />
            </div>

            <Button type="submit" className="w-full">Сохранить</Button>
        </form>
    );
};

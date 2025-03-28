"use client";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Pencil } from "lucide-react";
import { ProfileForm } from "./ProfileForm";

export const ProfileChangeMainDialog: FC<{ className: string }> = ({ className }) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Pencil className={`absolute top-[30px] right-0 cursor-pointer hover:text-[#2D7DFF] transition-colors ${className}`} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] p-6 bg-white shadow-lg rounded-lg">
                <DialogHeader>
                    <DialogTitle>Редактировать профиль</DialogTitle>
                </DialogHeader>
                <ProfileForm onSuccess={() => console.log("Profile updated!")} />
            </DialogContent>
        </Dialog>
    );
};

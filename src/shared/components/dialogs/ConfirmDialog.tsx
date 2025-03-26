import { FC, useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/ui/alert-dialog";

interface IDialogProps {
    text: string;
    onConfirm: () => void;
    isOpen: boolean;  // Добавляем параметр для контроля открытия
    onClose: () => void; // Функция для закрытия диалога
}

export const ConfirmDialog: FC<IDialogProps> = ({ text, onConfirm, isOpen, onClose }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
                    <AlertDialogDescription>{text}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

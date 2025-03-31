import { FC } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

interface ContactSelectProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string
}

export const ContactSelect: FC<ContactSelectProps> = ({ value, onChange, className }) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={`${className}`}>
                <SelectValue placeholder="Выберите тип контакта" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Контакты</SelectLabel>
                    <SelectItem value="PHONE">Номер Телефона</SelectItem>
                    <SelectItem value="TELEGRAM">Телеграм</SelectItem>
                    <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                    <SelectItem value="GITHUB">GitHub</SelectItem>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="OTHER">Другое</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { InputHTMLAttributes } from "react";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, error, ...props }) => (
    <div>
        <Label>{label}</Label>
        <Input {...props} />
        {error && <p className="text-red-500">{error}</p>}
    </div>
);

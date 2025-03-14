import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { TextareaHTMLAttributes } from "react";

interface TextareaWithLabelProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({ label, error, ...props }) => (
    <div>
        <Label>{label}</Label>
        <Textarea {...props} />
        {error && <p className="text-red-500">{error}</p>}
    </div>
);

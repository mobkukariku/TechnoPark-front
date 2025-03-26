import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

interface Option {
    id: string;
    name: string;
}

export const DepartmentSelect = ({
                                     value,
                                     options,
                                     onChange,
                                     isEditing,
                                     placeholder,
                                 }: {
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    isEditing: boolean;
    placeholder: string;
}) => {
    const selectedOption = options.find((opt) => opt.id === value);


    return isEditing ? (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue>{selectedOption ? selectedOption.name : placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                        {opt.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ) : (
        selectedOption?.name || "—"
    );
};

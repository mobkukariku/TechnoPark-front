import { useState, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandItem } from "@/shared/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { Check, ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface ComboboxProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isEditing?: boolean;
}

export function Combobox({ options, value, onChange, placeholder = "Выберите...", isEditing = false }: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    // Если value изменилось извне, синхронизируем его с tempValue
    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const selectedOption = options.find(option => option.value === value);

    if (!isEditing) {
        return <span>{selectedOption ? selectedOption.label : placeholder}</span>;
    }

    return (
        <Popover
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) setTempValue(value); // Если закрыли без выбора, сбрасываем tempValue
                setOpen(isOpen);
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full flex justify-between">
                    {options.find(option => option.value === tempValue)?.label || placeholder}
                    <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full rounded-[8px] p-2">
                <Command>
                    <CommandInput placeholder="Поиск..." />
                    <CommandList>
                        {options.map(option => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    setTempValue(option.value);
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className="flex items-center justify-between"
                            >
                                {option.label}
                                {tempValue === option.value && <Check className="h-4 w-4 text-primary" />}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

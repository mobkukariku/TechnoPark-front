import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";
import useSkillsStore from "@/store/useSkillsStore";

interface SkillsForm {
    skills: string[];
}

export const DialogChangeDialog: FC = () => {
    const { handleSubmit, setValue, watch } = useForm<SkillsForm>({ defaultValues: { skills: [] } });
    const { skills, fetchAllSkills, AllSkills } = useSkillsStore();

    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const selectedSkills = watch("skills", []);

    useEffect(() => {
        if (open) {
            setValue("skills", skills.map(s => s.name));
            fetchAllSkills();
        }
    }, [open, skills, setValue, fetchAllSkills]);

    useEffect(() => {
        if (inputValue && AllSkills.length > 0) {
            const filtered = AllSkills
                .map(skill => skill.name)
                .filter(name => name.toLowerCase().includes(inputValue.toLowerCase()) && !selectedSkills.includes(name));
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [inputValue, AllSkills, selectedSkills]);

    const addSkill = (skill: string) => {
        if (skill.trim() && !selectedSkills.includes(skill)) {
            setValue("skills", [...selectedSkills, skill.trim()]);
        }
        setInputValue("");
        setSuggestions([]);
    };

    const removeSkill = (skill: string) => {
        setValue("skills", selectedSkills.filter(s => s !== skill));
    };

    const onSubmit = async (data: SkillsForm) => {
        // await updateUserSkills(data.skills);
        console.log(data);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Pencil className="absolute top-[30px] right-0 cursor-pointer hover:text-[#2D7DFF] transition-colors" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать навыки</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
                    <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2">
                        {selectedSkills.map(skill => (
                            <span
                                key={skill}
                                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                                <X className="w-4 h-4 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                            </span>
                        ))}
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === ",") {
                                    e.preventDefault();
                                    addSkill(inputValue);
                                }
                            }}
                            className="flex-1 border-none outline-none text-sm"
                            placeholder="Введите навык..."
                        />
                    </div>

                    {suggestions.length > 0 && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                            {suggestions.map((s) => (
                                <div
                                    key={s}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => addSkill(s)}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    )}

                    <Button type="submit" className="w-full">Сохранить</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

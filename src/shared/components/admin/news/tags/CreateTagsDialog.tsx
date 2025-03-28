"use client"
import { Button } from "@/shared/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { FC, useEffect, useState } from "react";
import useTagsStore from "@/store/useTagsStore";

export const CreateTagsDialog: FC = () => {
    const { fetchTags, allTags, addTag } = useTagsStore();
    const [tag, setTag] = useState<string>("");

    useEffect(() => {
        if (allTags.length === 0) {
            fetchTags();
        }
    }, [fetchTags]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Чтобы форма не перезагружала страницу

        if (!tag.trim()) return; // Проверяем, что не пустой ввод

        addTag({name: tag});
        setTag(""); // Очищаем поле после отправки
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-all rounded-md">
                    + Добавить тег
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] p-6 bg-white shadow-lg rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Создание Тегов
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700">
                            Название тега
                        </Label>
                        <Input
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="Например: Workshops"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700">Доступные теги:</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {Array.isArray(allTags) && allTags.length > 0 ? (
                                allTags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full"
                                    >
                                        {tag.name}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">Нет доступных тегов</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end">
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white transition-all rounded-md"
                        >
                            Сохранить
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

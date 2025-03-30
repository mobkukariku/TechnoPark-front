"use client";

import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useEffect, useRef } from "react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/shared/ui/context-menu";
import type { Editor as EditorType } from "@toast-ui/react-editor";


// Динамический импорт без SSR + заглушка на время загрузки
const Editor = dynamic(() => import("@toast-ui/react-editor").then((mod) => mod.Editor), {
    ssr: false,
    loading: () => <div>Загрузка редактора...</div>,
});

interface NewsContentEditorProps {
    onChange: (content: string) => void;
    content?: string;
}

export default function NewsContentEditor({ onChange, content }: NewsContentEditorProps) {
    const editorRef = useRef<EditorType | null>(null);


    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().setHTML(content || "");
        }
    }, [content]);

    const handleChange = () => {
        if (editorRef.current) {
            const html = editorRef.current.getInstance().getHTML();
            onChange(html);
        }
    };

    // Функция загрузки изображения
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            if (editorRef.current) {
                editorRef.current.getInstance().insertText(`![image](${base64})`);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="border p-2 rounded min-h-[200px] h-[500px]">
                    <Editor
                        ref={editorRef}
                        initialValue="Напиши что-то..."
                        previewStyle="vertical"
                        height="100%"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        onChange={handleChange}
                    />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem onClick={() => editorRef.current?.getInstance().exec("bold")}>
                    Bold (Жирный)
                </ContextMenuItem>
                <ContextMenuItem onClick={() => editorRef.current?.getInstance().exec("italic")}>
                    Italic (Курсив)
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => editorRef.current?.getInstance().exec("heading", { level: 1 })}>
                    Заголовок H1
                </ContextMenuItem>
                <ContextMenuItem onClick={() => editorRef.current?.getInstance().exec("heading", { level: 2 })}>
                    Заголовок H2
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => editorRef.current?.getInstance().exec("ul")}>
                    • Список
                </ContextMenuItem>
                <ContextMenuItem onClick={() => editorRef.current?.getInstance().exec("ol")}>
                    1. Нумерованный список
                </ContextMenuItem>
                <ContextMenuSeparator />
                {/* Поле для загрузки файла */}
                <label className="cursor-pointer block px-2 py-1 text-sm hover:bg-gray-100">
                    🖼 Добавить изображение
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
            </ContextMenuContent>
        </ContextMenu>
    );
}

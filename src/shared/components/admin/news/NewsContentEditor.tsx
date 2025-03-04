"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Dropcursor from "@tiptap/extension-dropcursor";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/shared/ui/context-menu";

interface NewsContentEditorProps {
    onChange: (content: string) => void;
    content?: string;
}

export default function NewsContentEditor({ onChange, content }: NewsContentEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({ allowBase64: true }), // Разрешаем base64
            Blockquote,
            Heading.configure({ levels: [1, 2, 3] }),
            BulletList,
            OrderedList,
            ListItem,
            Dropcursor,
        ],
        content: content || "<p>Напиши что-то...</p>",
        onUpdate: ({ editor }) => {
            let html = editor.getHTML();
            html = html.replace(/<p><\/p>/g, "<p>&nbsp;</p>"); // Заменяет пустые <p>
            onChange(html);
        },
    });

    if (!editor) return null;

    // Функция загрузки изображения
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            editor.chain().focus().setImage({ src: base64 }).run();
        };
        reader.readAsDataURL(file);
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="border p-2 rounded min-h-[200px] h-[500px]">
                    {/* Поле редактирования */}
                    <EditorContent editor={editor} className="min-h-[200px] space-y-4" />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem onClick={() => editor.chain().focus().toggleBold().run()}>Bold (Жирный)</ContextMenuItem>
                <ContextMenuItem onClick={() => editor.chain().focus().toggleItalic().run()}>Italic (Курсив)</ContextMenuItem>
                <ContextMenuItem onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    Underline (Подчёркнутый)
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                    Заголовок H1
                </ContextMenuItem>
                <ContextMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    Заголовок H2
                </ContextMenuItem>
                <ContextMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    Заголовок H3
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    • Список
                </ContextMenuItem>
                <ContextMenuItem onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    1. Нумерованный список
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    ✨ Добавить цитату
                </ContextMenuItem>
                <ContextMenuSeparator />
                {/* Поле для загрузки файла */}
                <label className="cursor-pointer block px-2 py-1 text-sm hover:bg-gray-100">
                    🖼 Добавить изображение
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>
            </ContextMenuContent>
        </ContextMenu>
    );
}

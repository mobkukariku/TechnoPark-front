"use client";

import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useEffect, useRef } from "react";

import type { Editor as EditorType } from "@toast-ui/react-editor";

// Динамический импорт без SSR + заглушка на время загрузки
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <div>Загрузка редактора...</div>,
  }
);

interface NewsContentEditorProps {
  onChange: (content: string) => void;
  content?: string;
}

export default function NewsContentEditor({
  onChange,
  content,
}: NewsContentEditorProps) {
  const editorRef = useRef<EditorType | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      if (instance.getHTML() !== content) {
        instance.setHTML(content || "");
      }
    }
  }, [content]);

  const handleBlur = () => {
    if (editorRef.current) {
      const html = editorRef.current.getInstance().getHTML();
      onChange(html);
    }
  };

  return (
    <div className="border p-2 rounded min-h-[200px] h-[240px]">
      <Editor
        ref={editorRef}
        initialValue="Напиши что-то..."
        previewStyle="vertical"
        height="100%"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onBlur={handleBlur} // Используем onBlur вместо onChange
      />
    </div>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { FC } from "react";
import { Button } from "@/shared/ui";
import { CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { TagCheckboxes } from "@/shared/components";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import useNewsStore from "@/store/useNewsStore";
import { useTagHandler } from "@/hooks/useTagHandler"; // ✅ Добавил хук
import * as Yup from "yup";
import NewsContentEditor from "@/shared/components/admin/news/NewsContentEditor";

interface FormData {
  title: string;
  content: string;
  image: File | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Название обязательно"),
  content: Yup.string().required("Содержание обязательно"),
  image: Yup.mixed().nullable().required("Изображение обязательно"),
});

export const CreateNewsDialog: FC = () => {
  const { handleSubmit, control } = useForm<FormData>({
    //@ts-expect-error: Type mismatch due to resolver type
    resolver: yupResolver(validationSchema),
    defaultValues: { title: "", content: "", image: null },
  });

  const { submitNews } = useNewsStore();
  const { selectedTags } = useTagHandler(true); // ✅ Получаем выбранные теги

  // Updated onSubmit function for CreateNewsDialog
  const onSubmit = async (data: FormData) => {
    try {
      // Add validation for tags
      if (
        !selectedTags ||
        (typeof selectedTags === "string" && !selectedTags.trim())
      ) {
        toast.error("Пожалуйста, выберите хотя бы один тег");
        return;
      }

      // Log what we're submitting
      console.log("Submitting news:", {
        title: data.title,
        contentLength: data.content.length,
        image: data.image?.name || "No image",
        selectedTags,
      });

      // Submit the news
      await submitNews(data.title, data.content, data.image, selectedTags);

      toast.success("Новость была создана!");

      // You might want to reset the form and close the dialog here
      // resetForm();
      // closeDialog();
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      toast.error("Ошибка при отправке");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-[32px] text-center">
            Создать новость
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col mt-[10px] gap-[23px]">
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files?.[0] || null)}
                />
              )}
            />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Название" />
              )}
            />
            <TagCheckboxes
              className={"flex flex-wrap gap-[10px]"}
              isFilter={true}
            />{" "}
            {/* ✅ Теперь выбирает теги */}
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, value } }) => (
                <NewsContentEditor onChange={onChange} content={value} />
              )}
            />
            <Button type="submit">Отправить</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

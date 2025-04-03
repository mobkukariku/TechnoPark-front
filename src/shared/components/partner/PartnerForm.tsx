"use client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/shared/ui";
import { Toaster, toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postPartnershipRequest } from "@/api/requestsApi";

interface FormValues {
  title: string;
  description: string;
  senderName: string;
  email: string;
  attachments: FileList | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  senderName: Yup.string().required("Sender name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  attachments: Yup.mixed().notRequired(),
});

export const PartnerForm: FC = () => {
  const t = useTranslations("partnerForm");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      senderName: "",
      email: "",
      attachments: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("senderName", data.senderName);
      formData.append("email", data.email);

      if (data.attachments && data.attachments.length > 0) {
        Array.from(data.attachments).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      await postPartnershipRequest(formData);
      toast.success(t("success"));
    } catch (error) {
      toast.error(t("error"));
    }
  };

  return (
    <div className="max-w-[450px] z-20 relative mx-auto">
      <form
        className="bg-[#D8E7FF] relative z-50 rounded-[6px] pt-[38px] pb-[58px] flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-bold text-[32px] text-center">{t("title")}</p>
        <div className="flex flex-col w-fit mt-[30px] gap-[16px]">
          <Input
            {...register("title")}
            type="text"
            placeholder={t("placeholderTitle")}
            className={`w-[340px] transition-colors ${
              errors.title ? "border-red-500" : ""
            }`}
          />

          <textarea
            {...register("description")}
            placeholder={t("placeholderDescription")}
            className={`w-[340px] h-[100px] p-2 rounded-md border border-gray-300 transition-colors ${
              errors.description ? "border-red-500" : ""
            }`}
          />

          <Input
            {...register("senderName")}
            type="text"
            placeholder={t("placeholderSenderName")}
            className={`w-[340px] transition-colors ${
              errors.senderName ? "border-red-500" : ""
            }`}
          />

          <Input
            {...register("email")}
            type="email"
            placeholder={t("placeholderEmail")}
            className={`w-[340px] transition-colors ${
              errors.email ? "border-red-500" : ""
            }`}
          />

          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            {...register("attachments")}
            className={`w-[340px] file:mr-2 file:py-2 file:px-4 file:border-0 file:bg-[#437DFF] file:text-white ${
              errors.attachments ? "border border-red-500" : ""
            }`}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5" />
            ) : (
              t("submit")
            )}
          </Button>
        </div>
      </form>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

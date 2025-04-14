"use client";
import { FC } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Button, Input } from "@/shared/ui";
import { Toaster, toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postPartnershipRequest } from "@/api/requestsApi";
import { X } from "lucide-react";

interface FormValues {
  title: string;
  description: string;
  senderName: string;
  email: string;
  attachments: FileList | null;
}

// Define allowed file types matching backend restrictions
const allowedDocumentTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const allowedFileTypes = [...allowedDocumentTypes, ...allowedImageTypes];

const MAX_FILES = 5;

export const PartnerForm: FC = () => {
  // Get translations
  const t = useTranslations("partnerForm");
  const d = useTranslations("joinUs");
  const v = useTranslations("validation"); // Assuming we'll have a validation section later

  // Create validation schema with translations
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(v("titleRequired"))
      .min(2, v("titleMinLength"))
      .max(100, v("titleMaxLength"))
      .matches(/^\S.*\S$/, v("noWhitespace")),

    description: Yup.string()
      .min(10, d("descriptionWarning"))
      .max(500, v("descriptionMaxLength"))
      .required(v("descriptionRequired")),

    senderName: Yup.string()
      .required(v("nameRequired"))
      .min(2, v("nameMinLength"))
      .max(100, v("nameMaxLength"))
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, v("nameFormat")),

    email: Yup.string()
      .email(v("invalidEmail"))
      .required(v("emailRequired"))
      .max(255, v("emailMaxLength")),

    attachments: Yup.mixed()
      .nullable()
      .test("fileType", v("fileTypesInvalid"), (value) => {
        if (value && value instanceof FileList && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (!allowedFileTypes.includes(value[i].type)) {
              return false;
            }
          }
        }
        return true;
      })
      .test("fileSize", v("fileSizeLimit"), (value) => {
        if (value && value instanceof FileList && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 5 * 1024 * 1024) {
              // 5MB in bytes
              return false;
            }
          }
        }
        return true;
      })
      .test("fileCount", v("fileCountLimit"), (value) => {
        return !(
          value &&
          value instanceof FileList &&
          value.length > MAX_FILES
        );
      }),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      title: "",
      description: "",
      senderName: "",
      email: "",
      attachments: null,
    },
    // Removed mode: "onChange" to match ApplyForm behavior
  });

  const attachments = watch("attachments");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    const currentFiles = attachments ? Array.from(attachments) : [];

    if (newFiles) {
      const newFilesArray = Array.from(newFiles);

      // Check file types before adding
      const invalidFiles = newFilesArray.filter(
        (file) => !allowedFileTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        setError("attachments", {
          type: "manual",
          message: v("fileTypesInvalid"),
        });
        return;
      }

      const combined = [...currentFiles, ...newFilesArray].slice(0, MAX_FILES);
      const dt = new DataTransfer();
      combined.forEach((file) => dt.items.add(file));
      setValue("attachments", dt.files);
    }
  };

  const removeFile = (index: number) => {
    const currentFiles = attachments ? Array.from(attachments) : [];
    currentFiles.splice(index, 1);
    const dt = new DataTransfer();
    currentFiles.forEach((file) => dt.items.add(file));
    setValue("attachments", dt.files);
  };

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
    } catch {
      toast.error(t("error"));
    }
  };

  return (
    <div className="max-w-md mx-auto relative z-20 p-4">
      <form
        className="bg-[#D8E7FF] rounded-[9px] shadow-md p-8 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold text-center">{t("title")}</h1>
        <div className="flex flex-col gap-4">
          <Input
            {...register("title")}
            type="text"
            placeholder={t("placeholderTitle")}
            className={`w-full transition-colors ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}

          <textarea
            {...register("description")}
            placeholder={t("placeholderDescription")}
            className={`w-full h-24 p-2 rounded-[4px] border border-gray-300 transition-colors ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}

          <Input
            {...register("senderName")}
            type="text"
            placeholder={t("placeholderSenderName")}
            className={`w-full transition-colors ${
              errors.senderName ? "border-red-500" : ""
            }`}
          />
          {errors.senderName && (
            <p className="text-red-500 text-xs">{errors.senderName.message}</p>
          )}

          <Input
            {...register("email")}
            type="email"
            placeholder={t("placeholderEmail")}
            className={`w-full transition-colors ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {d("uploadAttachments")}
            </label>
            <div className="flex flex-col gap-2 border rounded-[8px] px-4 py-2">
              {attachments && attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Array.from(attachments).map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 text-sm"
                    >
                      <span className="truncate max-w-[150px] py-0.5">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {(!attachments || attachments.length < MAX_FILES) && (
                <label
                  className={`block cursor-pointer text-center rounded py-1 transition-colors ${
                    errors.attachments
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {d("chooseFiles")}
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-xs text-gray-500">
                {v("allowedFormats")} (Max: {MAX_FILES} files)
              </p>
            </div>
            {errors.attachments && (
              <p className="text-red-500 text-xs">
                {errors.attachments.message}
              </p>
            )}
          </div>

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

"use client";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@/shared/ui";
import { JobRoleSelect } from "./JobRoleSelect";
import { Toaster, toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postJobApplication } from "@/api/requestsApi";

interface FormValues {
  fullName: string;
  email: string;
  telegramUsername: string;
  jobRoleId: string;
  cvFile: FileList | null;
  coverLetterFile?: FileList | null;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  telegramUsername: Yup.string()
    .matches(/^@/, "Telegram username must start with '@'")
    .required("Telegram username is required"),
  jobRoleId: Yup.string().required("Job role is required"),
  cvFile: Yup.mixed()
    .test("fileRequired", "CV is required", (value: any) => {
      return value && value.length > 0;
    })
    .required("CV is required"),
  coverLetterFile: Yup.mixed().notRequired(),
});

export const ApplyForm: FC = () => {
  const t = useTranslations("joinUs");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      telegramUsername: "",
      jobRoleId: "",
      cvFile: null,
      coverLetterFile: null,
    },
  });

  // Watch file inputs to display the chosen file names.
  const cvFile = watch("cvFile");
  const coverLetterFile = watch("coverLetterFile");

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("telegramUsername", data.telegramUsername);
      formData.append("jobRoleId", data.jobRoleId);
      if (data.cvFile && data.cvFile.length > 0) {
        formData.append("cv", data.cvFile[0]);
      }
      if (data.coverLetterFile && data.coverLetterFile.length > 0) {
        formData.append("coverLetter", data.coverLetterFile[0]);
      }
      await postJobApplication(formData);
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
            {...register("fullName")}
            type="text"
            placeholder={t("fullName")}
            className={`w-full transition-colors ${
              errors.fullName ? "border-red-500" : ""
            }`}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder={t("email")}
            className={`w-full transition-colors ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          <Input
            {...register("telegramUsername")}
            type="text"
            placeholder={t("telegramUsername")}
            className={`w-full transition-colors ${
              errors.telegramUsername ? "border-red-500" : ""
            }`}
          />
          <JobRoleSelect
            control={control}
            name="jobRoleId"
            error={errors.jobRoleId?.message}
          />
          {/* File Input for CV */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{t("uploadCV")}</label>
            <label
              className={`block w-full cursor-pointer rounded-[8px] border px-4 py-2 text-center text-sm font-medium transition-colors ${
                errors.cvFile
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              {cvFile && cvFile.length > 0 ? cvFile[0].name : t("chooseFile")}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register("cvFile", { required: "CV is required" })}
                className="hidden"
              />
            </label>
            {errors.cvFile && (
              <p className="text-red-500 text-xs">{errors.cvFile.message}</p>
            )}
          </div>
          {/* File Input for Cover Letter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {t("uploadCoverLetter")}
            </label>
            <label className="block w-full cursor-pointer rounded-[8px] border px-4 py-2 text-center text-sm font-medium transition-colors border-gray-300 bg-white hover:bg-gray-50">
              {coverLetterFile && coverLetterFile.length > 0
                ? coverLetterFile[0].name
                : t("chooseFile")}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register("coverLetterFile")}
                className="hidden"
              />
            </label>
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

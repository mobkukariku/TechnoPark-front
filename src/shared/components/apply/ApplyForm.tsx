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
      console.log(formData);
      await postJobApplication(formData);
      toast.success(t("success"));
    } catch {
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
            {...register("fullName")}
            type="text"
            placeholder={t("fullName")}
            className={`w-[340px] transition-colors ${
              errors.fullName ? "border-red-500" : ""
            }`}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder={t("email")}
            className={`w-[340px] transition-colors ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          <Input
            {...register("telegramUsername")}
            type="text"
            placeholder={t("telegramUsername")}
            className={`w-[340px] transition-colors ${
              errors.telegramUsername ? "border-red-500" : ""
            }`}
          />
          <JobRoleSelect
            control={control}
            name="jobRoleId"
            error={errors.jobRoleId?.message}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("cvFile", { required: "CV is required" })}
            className={`w-[340px] file:mr-2 file:py-2 file:px-4 file:border-0 file:bg-[#437DFF] file:text-white ${
              errors.cvFile ? "border border-red-500" : ""
            }`}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("coverLetterFile")}
            className={`w-[340px] file:mr-2 file:py-2 file:px-4 file:border-0 file:bg-[#437DFF] file:text-white`}
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

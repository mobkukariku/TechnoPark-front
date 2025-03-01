"use client"
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Textarea } from "@/shared/ui";
import { JoinUsSelect } from "@/shared/components";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "react-hot-toast";
import {postRequest} from "@/api/api";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Имя обязательно"),
    lastName: Yup.string().required("Фамилия обязательна"),
    email: Yup.string().email("Неверный формат почты").required("Почта обязательна"),
    coverLetter: Yup.string().required("Сопроводительное письмо обязательно"),
    selectedCourse: Yup.string().required("Выберите курс"),
});

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    coverLetter: string;
    selectedCourse: string;
}

export const JoinUsForm: FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            coverLetter: "",
            selectedCourse: ""
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            await postRequest(data.firstName, data.lastName, data.email, data.selectedCourse, data.coverLetter);
            toast.success("Заявка отправлена!");
        } catch (error) {
            toast.error("Ошибка при отправке заявки.");
        }
    };

    const showErrors = () => {
        Object.values(errors).forEach(error => {
            if (error?.message) {
                toast.error(error.message);
            }
        });
    };

    return (
        <div className="max-w-[450px] z-20 relative mx-auto">
            <form
                className="bg-[#D8E7FF] relative z-50  rounded-[6px] pt-[38px] pb-[58px] flex flex-col justify-center items-center"
                onSubmit={handleSubmit(onSubmit, showErrors)}
            >
                <p className="font-bold text-[32px] text-center">Оставьте заявку!</p>
                <div className="flex flex-col w-fit mt-[50px] gap-[16px]">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({field}) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Имя"
                                className={`w-[340px] transition-colors ${errors.firstName ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({field}) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Фамилия"
                                className={`w-[340px] transition-colors ${errors.lastName ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => (
                            <Input
                                {...field}
                                type="email"
                                placeholder="Почта"
                                className={`w-[340px] transition-colors ${errors.email ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <JoinUsSelect
                        control={control}
                        name="selectedCourse"
                        error={errors.selectedCourse?.message}
                    />
                    <Controller
                        name="coverLetter"
                        control={control}
                        render={({field}) => (
                            <Textarea
                                {...field}
                                placeholder="Сопроводительное письмо"
                                className={`w-[340px] transition-colors ${errors.coverLetter ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isSubmitting ? (
                            <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></div>
                        ) : (
                            "Отправить"
                        )}
                    </Button>
                </div>
            </form>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

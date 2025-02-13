"use client"
import {FC} from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, Input,} from "@/shared/ui";
import {toast, Toaster} from "react-hot-toast";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {login} from "@/api/api";


const validationSchema = Yup.object({
    email: Yup.string().email("Неверный формат почты").required("Почта обязательна"),
    password: Yup.string().min(8, "Минимум 8 символов").required("Пароль обязателен"),

});

interface FormData {
    email: string;
    password: string;
}

export const RegisterForm: FC = () => {

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            await login(data.email, data.password);
            toast.success("Заявка отправлена!");
        } catch (error) {
            toast.error("Ошибка при отправке");
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
        <div className="max-w-[500px] z-20 relative mx-auto">
            <form
                className="bg-[#D8E7FF] rounded-[14px] pt-[38px] pb-[58px] flex flex-col justify-center items-center"
                onSubmit={handleSubmit(onSubmit, showErrors)}
            >
                <p className="font-bold text-[32px] text-center">Войти в систему</p>
                <div className="flex flex-col w-fit mt-[50px] gap-[23px]">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="email"
                                placeholder="Почта"
                                className={`w-[340px] transition-colors ${errors.email ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="password"
                                placeholder="Пароль"
                                className={`w-[340px] transition-colors ${errors.password ? "border-red-500" : ""}`}
                            />
                        )}
                    />
                    <Button type="submit">Отправить</Button>
                </div>
            </form>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

        </div>
    )
}
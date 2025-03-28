"use client";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { login } from "@/api/authApi";

const validationSchema = Yup.object({
    email: Yup.string().email("Неверный формат почты").required("Почта обязательна"),
    password: Yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
});

interface FormData {
    email: string;
    password: string;
}

export const LoginForm: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    const router = useRouter();

    // Проверяем, есть ли авторизация в localStorage при загрузке
    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(authStatus === "true");
    }, []);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password);
            toast.success("Успешный вход!");
            localStorage.setItem("isAuthenticated", "true"); // Сохраняем статус
            setIsAuthenticated(true);
            router.push("/admin");
        } catch {
            toast.error("Ошибка при входе");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        toast.success("Вы вышли из системы");
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
            {!isAuthenticated ? (
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
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Загрузка..." : "Отправить"}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="text-center">
                    <p className="font-bold text-[32px]">Вы уже вошли</p>
                    <Button onClick={logout} className="mt-4">
                        Выйти
                    </Button>
                </div>
            )}
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

import { FC } from "react";
import { Container, ContactsDetails } from "@/shared/components";
import { useTranslations } from "next-intl";

export const ContactsMainInfo: FC = () => {
    const t = useTranslations("contacts");

    return (
        <Container className="relative">
            <div className="text-center relative z-20 mt-[20px]">
                <p className="text-[32px] font-bold py-[20px] max-[500px]:text-[24px]">
                    {t("title")}
                </p>
                <span className="text-[20px] font-medium mb-[30px] max-[500px]:text-[16px]">
                    {t("description")}
                </span>
            </div>
            <ContactsDetails />
            <div className="absolute z-0 rounded-full left-[120px] blur-[100px] top-[10px] w-[208px] h-[208px] bg-[#89B6FF5C]" />
            <div className="absolute z-0 rounded-full right-[100px] blur-[100px] top-[300px] w-[428px] h-[428px] bg-[#4E48FE5C]" />
        </Container>
    );
};

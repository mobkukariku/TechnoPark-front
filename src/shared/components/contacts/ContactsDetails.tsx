import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const ContactsDetails: FC = () => {
    const t = useTranslations("contacts");

    return (
        <div className="max-w-[1000px] max-[500px]:flex-wrap-reverse max-[500px]:mb-[100px] max-[500px]:gap-[0px] relative z-20 flex flex-row m-auto mt-[50px] gap-16">
            <div className="mt-[40px]">
                <ul className="space-y-2 font-medium">
                    <li>{t("address")}: Проспект Абылай хана 1/1, Каскелен</li>
                    <li>
                        {t("phone")}: <a href="tel:+77777777777">+7 777 777 77 77</a>
                    </li>
                    <li>
                        Email: <a href="mailto:sduitpark@gmail.com">sduitpark@gmail.com</a>
                    </li>
                </ul>
                <div className="flex gap-[17px] mt-[30px]">
                    <Image src="/contacts/telegram.svg" width={37} height={37} alt="Telegram" />
                    <Image src="/contacts/linkedin.svg" width={37} height={37} alt="LinkedIn" />
                    <Image src="/contacts/insta.svg" width={37} height={37} alt="Instagram" />
                </div>
            </div>
            <iframe
                className="rounded-[8px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1028.1612157443462!2d76.66855774702692!3d43.20783083677779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x388345a37dd907a1%3A0x7324145b7cf78cb7!2sFaculty%20of%20Engineering%20%26%20Natural%20Sciences%20%7C%20SDU!5e0!3m2!1sru!2skz!4v1738512952308!5m2!1sru!2skz"
                width="600"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

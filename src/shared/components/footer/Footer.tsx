import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/shared/components";

export const Footer: FC = () => {
    return (
        <footer className="w-full  py-[50px] bg-black text-white p-4">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-[40px] md:gap-0">
                    <div className="flex flex-col items-center md:items-start gap-[10px]">
                        <Image src="/logo-outline.svg" alt="logo" width={90} height={90} className="rounded-2xl" />
                        <p className="text-[14px] text-center md:text-left">Copyright © 2025 IT Park All rights reserved</p>
                        <div className="flex mt-[10px] gap-[20px]">
                            <a href="https://www.instagram.com/technopark_sdu/" target="_blank">
                                <Image src="/contacts/insta-outline.svg" alt="insta" width={24} height={24} />
                            </a>
                            <a href="https://www.linkedin.com/company/sdutechno/" target="_blank">
                                <Image src="/contacts/linkedin-outline.svg" alt="linkedin" width={24} height={24} />
                            </a>
                            <a href="https://t.me/sdu_technopark" target="_blank">
                                <Image src="/contacts/telegram-outline.svg" alt="telegram" width={24} height={24} />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-[10px]">
                        <h3 className="font-medium">Навигация</h3>
                        <ul className="space-y-2 text-[14px] font-light">
                            <li>
                                <Link href="/aboutUs" className="hover:underline">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/hardware" className="hover:underline">
                                    Hardware
                                </Link>
                            </li>
                            <li>
                                <Link href="/software" className="hover:underline">
                                    Software
                                </Link>
                            </li>
                            <li>
                                <Link href="/members" className="hover:underline">
                                    Участники
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-[10px]">
                        <h3 className="font-medium">Контакты</h3>
                        <ul className="space-y-2 text-[14px] font-light">
                            <li>
                                <a href="tel:+77777777777" className="hover:underline">
                                    Номер: +7 777 777 7777
                                </a>
                            </li>
                            <li>
                                <a href="mailto:example@gmail.com" className="hover:underline">
                                    Почта: example@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

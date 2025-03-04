"use client";
import {FC,  useEffect, useState} from "react";
import Image from "next/image";
import { BurgerMenu, Container } from "@/shared/components";
import { Button } from "@/shared/ui";
import { HeaderMenu } from "@/shared/components/header/HeaderMenu";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {AlignJustify, X} from "lucide-react";
import {useTranslations} from "use-intl";
import {LangSelect} from "@/shared/components/header/LangSelect";

export const Header: FC = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations('Header');



    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1000);
            if (window.innerWidth > 1000) setIsMenuOpen(false);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
            <Container className="mb-[67px] relative z-40 p-0">
                <header className="mt-[20px] w-full relative z-50 flex justify-between items-center">
                    {isDesktop ? (
                        <div className="flex items-start w-full justify-between gap-[39px] relative z-20">
                            <div className="flex gap-[20px] items-center">
                                <Link href="/"  prefetch={true}>
                                    <Image width={61} height={61} src="/logo.svg" alt="Логотип" />
                                </Link>
                                <div className={"mt-[20px]"}>
                                    <HeaderMenu />
                                </div>
                            </div>
                           <div className={"flex mt-[20px] gap-2"}>
                               <LangSelect/>
                               <Link href="/joinus" className="relative z-50" prefetch={true}>
                                   <Button size="default" variant="default" className="text-[18px]">
                                       {t('enter')}
                                   </Button>
                               </Link>
                           </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex w-full items-center justify-between">
                                <Link href="/" prefetch={true}>
                                    <Image width={70} height={29} src="/logo.svg" alt="Логотип" />
                                </Link>
                                <div className={"flex gap-[10px]"}>
                                    <LangSelect/>
                                    <Button
                                        variant="link"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    >
                                        {isMenuOpen ? <X  /> : <AlignJustify />}
                                    </Button>
                                </div>
                            </div>
                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="absolute top-full left-0 w-full bg-white shadow-lg z-50"
                                    >
                                        <BurgerMenu />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </header>
            </Container>
    );
};


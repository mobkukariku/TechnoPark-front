"use client";
import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BurgerMenu, Container } from "@/shared/components";
import { Button, DropdownNav } from "@/shared/ui";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlignJustify, UserRound, X } from "lucide-react";
import { useTranslations } from "use-intl";
import { LangSelect } from "@/shared/components/header/LangSelect";
import { menuData } from "@/shared/components/header/HeaderMenuInfo";

export const Header: FC = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const isFirstRender = useRef(true);

    const t = useTranslations("Header");

    useEffect(() => {
        const handleResize = () => {
            const isWide = window.innerWidth > 1000;
            setIsDesktop(isWide);
            if (isWide) setIsMenuOpen(false);
        };

        const checkAuth = () => {
            const authStatus = localStorage.getItem("isAuthenticated");
            setIsAuthenticated(authStatus === "true");
        };

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setIsScrolled(currentScrollPos > 50);
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        handleResize();
        checkAuth();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("storage", checkAuth);
        };
    }, [prevScrollPos]);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    return (
        <motion.div
            initial={isFirstRender.current ? { opacity: 0, y: -100 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className={`fixed top-0 w-full h-[90px] z-[60] transition-all duration-300 ${
                isScrolled ? "bg-white shadow py-2" : "bg-transparent py-4"
            } ${visible ? "translate-y-0" : "-translate-y-full"}`}
        >
            <Container className="relative z-40 p-0">
                <header className="w-full flex justify-between items-center">
                    {isDesktop ? (
                        <div className="flex items-start w-full justify-between gap-[39px] relative z-20">
                            <div className="flex gap-[20px] items-center">
                                <Link href="/" prefetch={true}>
                                    <Image width={61} height={61} src="/logo.svg" alt="Логотип" />
                                </Link>
                                <div className="mt-[20px]">
                                    <DropdownNav items={menuData} />
                                </div>
                            </div>
                            <div className="flex mt-[20px] items-center gap-3">
                                {isAuthenticated ? (
                                    <Link href="/profile">
                                        <UserRound className="hover:text-[#2D7DFF] transition-colors active:text-[#0B439F]" />
                                    </Link>
                                ) : (
                                    <Link href="/joinus" className="relative z-50" prefetch={true}>
                                        <Button size="default" variant="default" className="text-[18px]">
                                            {t("enter")}
                                        </Button>
                                    </Link>
                                )}
                                <LangSelect />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex w-full items-center justify-between">
                                <Link href="/" prefetch={true}>
                                    <Image width={70} height={29} src="/logo.svg" alt="Логотип" />
                                </Link>
                                <div className="flex gap-[10px]">
                                    <LangSelect />
                                    <Button
                                        variant="link"
                                        onClick={() => setIsMenuOpen(prev => !prev)}
                                        aria-label="Toggle menu"
                                    >
                                        {isMenuOpen ? <X /> : <AlignJustify />}
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
        </motion.div>
    );
};

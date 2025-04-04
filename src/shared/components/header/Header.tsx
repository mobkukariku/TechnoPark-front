"use client";
import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BurgerMenu, Container } from "@/shared/components";
import { Button, DropdownNav, JoinUsModal } from "@/shared/ui";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlignJustify, UserRound, X } from "lucide-react";
import { useTranslations } from "use-intl";
import { LangSelect } from "@/shared/components/header/LangSelect";
import useMenuData from "@/hooks/useMenuData";
import { useRouter } from "next/navigation";

export const Header: FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const menuData = useMenuData();

  const t = useTranslations("Header");

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1000);

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1000);
    };

    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 50);
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkAuth);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const handleCandidateClick = () => {
    router.push("/joinus/apply");
    setIsModalOpen(false);
  };

  const handlePartnerClick = () => {
    router.push("/joinus/partner");
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <motion.div
      initial={isFirstRender.current ? { opacity: 0, y: -100 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className={`fixed top-0 w-full h-[90px] z-[60] transition-all duration-300 ${
        isScrolled ? "bg-white shadow py-2" : "bg-transparent py-4"
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <JoinUsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCandidateClick={handleCandidateClick}
        onPartnerClick={handlePartnerClick}
      />
      <Container className="relative z-40 p-0 ">
        <header className="flex justify-between items-center">
          {isDesktop ? (
            <div className="flex items-start w-full justify-between gap-[39px] relative z-20">
              <div className="flex gap-[20px] items-center">
                <Link href="/" prefetch={true}>
                  <Image width={61} height={61} src="/logo.svg" alt="Логотип" />
                </Link>
                <div className="mt-[20px]  z-[90]">
                  <DropdownNav items={menuData} />
                </div>
              </div>
              <div className="flex mt-[20px] items-center gap-3">
                {isAuthenticated ? (
                  <Link href="/profile">
                    <UserRound className="hover:text-[#2D7DFF] transition-colors active:text-[#0B439F]" />
                  </Link>
                ) : (
                  <Button
                    size="default"
                    variant="default"
                    className="text-[18px]"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {t("enter")}
                  </Button>
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
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <X /> : <AlignJustify />}
                  </Button>
                </div>
              </div>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-[14px] left-[20px] w-full z-[100]"
                  >
                    <BurgerMenu onOpenModal={handleOpenModal} />
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

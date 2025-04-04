"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/shared/components";
import { useTranslations } from "next-intl";

export const Footer: FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="w-full py-[50px] bg-black text-white p-4">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-[40px] md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-[10px]">
            <Image
              src="/logo-outline.svg"
              alt="logo"
              width={90}
              height={90}
              className="rounded-2xl"
            />
            <p className="text-[14px] text-center md:text-left">
              {t("copyright")}
            </p>
            <div className="flex mt-[10px] gap-[20px]">
              <a
                href="https://www.instagram.com/technopark_sdu/"
                target="_blank"
              >
                <Image
                  src="/contacts/insta-outline.svg"
                  alt="insta"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/sdutechno/"
                target="_blank"
              >
                <Image
                  src="/contacts/linkedin-outline.svg"
                  alt="linkedin"
                  width={24}
                  height={24}
                />
              </a>
              <a href="https://t.me/sdu_technopark" target="_blank">
                <Image
                  src="/contacts/telegram-outline.svg"
                  alt="telegram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-[10px]">
            <h3 className="font-medium">{t("navigation")}</h3>
            <ul className="space-y-2 text-[14px] font-light">
              <li>
                <Link href="/aboutUs" className="hover:underline">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/hardware" className="hover:underline">
                  {t("hardware")}
                </Link>
              </li>
              <li>
                <Link href="/software" className="hover:underline">
                  {t("software")}
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:underline">
                  {t("members")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start gap-[10px]">
            <h3 className="font-medium">{t("contacts")}</h3>
            <ul className="space-y-2 text-[14px] font-light">
              <li>
                <a href="tel:+77024084809" className="hover:underline">
                  {t("phone")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:technopark@sdu.edu.kz"
                  className="hover:underline"
                >
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

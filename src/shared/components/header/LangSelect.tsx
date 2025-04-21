"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export const LangSelect: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLocale = (locale: string) => {
    if (locale === currentLocale) return;

    // Разбиваем URL и заменяем первую часть пути (локаль)
    const segments = pathname.split("/");
    segments[1] = locale; // Меняем локаль в пути
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <Select onValueChange={changeLocale} defaultValue={currentLocale}>
      <SelectTrigger className="">
        <SelectValue
          placeholder={currentLocale.toUpperCase()}
          className="border-none"
        />
      </SelectTrigger>
      <SelectContent className={"z-[80]"}>
        <SelectItem value="en">🇬🇧 EN</SelectItem>
        <SelectItem value="ru">🇷🇺 RU</SelectItem>
        <SelectItem value="kz">🇰🇿 KZ</SelectItem>
      </SelectContent>
    </Select>
  );
};

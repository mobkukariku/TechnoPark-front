"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu";
import { useTranslations } from "use-intl";

export const HeaderMenu: React.FC = () => {
  const t = useTranslations("HeaderMenu");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/">{t("home")}</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink asChild>
              <ul className=" flex flex-col gap-[10px] w-[200px] p-2">
                <Link
                  href="/aboutUs"
                  className={
                    "hover:bg-gray-200 py-1 px-2 rounded-[10px] transition-colors duration-200"
                  }
                >
                  {t("aboutus")}
                </Link>
                <Link
                  href="/members"
                  className={
                    "hover:bg-gray-200 py-1 px-2 rounded-[10px] transition-colors duration-200"
                  }
                >
                  {t("members")}
                </Link>
              </ul>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className={""}>
          <NavigationMenuTrigger>{t("direction")}</NavigationMenuTrigger>
          <div className="">
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <ul className="flex flex-row justify-between w-[400px] p-2">
                  <Link
                    href="/hardware"
                    className={
                      "hover:bg-gray-200 w-full p-1 text-center rounded-[10px] transition-colors duration-200"
                    }
                  >
                    Hardware
                  </Link>
                  <Link
                    href="/software"
                    className={
                      "hover:bg-gray-200 p-1 w-full text-center rounded-[10px] transition-colors duration-200"
                    }
                  >
                    Software
                  </Link>
                </ul>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/news" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("news")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contacts" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("contacts")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

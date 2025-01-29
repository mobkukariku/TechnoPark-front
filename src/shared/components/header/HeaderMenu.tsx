"use client"

import * as React from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu"

export const HeaderMenu: React.FC = () =>  {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href="/">
                            Главная
                        </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent >
                        <NavigationMenuLink asChild >
                        <ul className=" flex flex-col w-[200px] p-2">
                            <Link href="/aboutUs" className={"hover:bg-gray-200 p-1 rounded-[10px] transition-colors duration-200"}>
                                О нас
                            </Link>
                            <Link href="/ourTeam" className={"hover:bg-gray-200 p-1 rounded-[10px] transition-colors duration-200"}>
                                Наша команда
                            </Link>
                        </ul>

                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className={""}>
                    <NavigationMenuTrigger>Направление</NavigationMenuTrigger>
                    <div className="">
                        <NavigationMenuContent>
                            <NavigationMenuLink asChild>
                                <ul className="flex flex-row justify-between w-[400px] p-2">
                                        <Link href="/hardware" className={"hover:bg-gray-200 w-full p-1 text-center rounded-[10px] transition-colors duration-200"}>
                                            Hardware
                                        </Link>
                                        <Link href="/software" className={"hover:bg-gray-200 p-1 w-full text-center rounded-[10px] transition-colors duration-200"}>
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
                            Новости
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/contacts" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Контакты
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

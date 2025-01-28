"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
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
                    <NavigationMenuTrigger>Главная</NavigationMenuTrigger>
                    <NavigationMenuContent >
                        <NavigationMenuLink asChild >
                        <ul className=" flex flex-col w-[200px] p-2">
                            <p className={"hover:bg-gray-200 p-1 rounded-[10px] transition-colors duration-200"}>
                                О нас
                            </p>
                            <p className={"hover:bg-gray-200 p-1 rounded-[10px] transition-colors duration-200"}>
                                О нас
                            </p>
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
                                    <p className={"hover:bg-gray-200 w-full p-1 text-center rounded-[10px] transition-colors duration-200"}>
                                        О нас
                                    </p>
                                    <p className={"hover:bg-gray-200 p-1 w-full text-center rounded-[10px] transition-colors duration-200"}>
                                        О нас
                                    </p>
                                </ul>

                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Новости
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Контакты
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

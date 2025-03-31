"use client"
import { Button } from "@/shared/ui";
import { FC } from "react";
import {ChevronRightIcon,} from "lucide-react";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/shared/ui/collapsible"
import Link from "next/link";
import {useTranslations} from "use-intl";

export const BurgerMenu: FC = () => {
    const t = useTranslations("HeaderMenu")
    const d = useTranslations("Header")
    return (
        <div>
            <div>
                <div className="absolute top-[90px] left-0 w-[90%] z-[110] bg-gray-100 p-4 rounded-[10px] border border-[#2D7DFF] dark:bg-gray-800">
                    <div className="grid gap-4 pt-4">
                        <Collapsible className="grid gap-4">
                            <CollapsibleTrigger
                                className="flex w-full items-center my-[10px] text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                <Link href="/">{t("home")}</Link>
                                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className=" grid gap-6 bg-gray-100 px-6 py-2 dark:bg-gray-800">
                                    <Link href="/aboutUs" className="group grid h-auto w-full justify-start gap-1"
                                          prefetch={true}>
                                        <div
                                            className="text-sm font-medium leading-none group-hover:underline">{t("aboutus")}
                                        </div>
                                    </Link>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible className="grid gap-4">
                            <CollapsibleTrigger
                                className="flex w-full items-center my-[10px] text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                {t("direction")}
                                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className=" grid gap-6 bg-gray-100 px-6 py-2 dark:bg-gray-800">
                                    <Link href="/hardware" className="group grid h-auto w-full justify-start gap-1"
                                          prefetch={true}>
                                        <div
                                            className="text-sm font-medium leading-none group-hover:underline">Hardware
                                        </div>
                                    </Link>
                                    <Link href="/software" className="group grid h-auto w-full justify-start gap-1"
                                          prefetch={true}>
                                        <div
                                            className="text-sm font-medium leading-none group-hover:underline">Software
                                        </div>
                                    </Link>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Link href="/news" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={true}>
                            {t("news")}
                        </Link>
                        <Link href="/news" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={true}>
                            {t("members")}
                        </Link>
                        <Link href="/joinus" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={true}>
                           <Button className={"w-full"}>{d("enter")}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}



import { Button } from "@/shared/ui";
import {FC, JSX, SVGProps} from "react";
import {ChevronRightIcon,} from "lucide-react";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/shared/ui/collapsible"
import Link from "next/link";

export const BurgerMenu: FC = () => {
    return (
        <div>
            <div>

            </div>
            <div>
                <div className="flex flex-col w-[100%] bg-gray-100 p-4 rounded-[10px] border border-[#2D7DFF] dark:bg-gray-800">
                    <div className="grid gap-4 py-4">
                        <Collapsible className="grid gap-4">
                            <CollapsibleTrigger
                                className="flex w-full items-center my-[10px] text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                <Link href="/">Главная</Link>
                                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className=" grid gap-6 bg-gray-100 px-6 py-2 dark:bg-gray-800">
                                    <Link href="/aboutUs" className="group grid h-auto w-full justify-start gap-1"
                                          prefetch={false}>
                                        <div
                                            className="text-sm font-medium leading-none group-hover:underline">О нас
                                        </div>
                                    </Link>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible className="grid gap-4">
                            <CollapsibleTrigger
                                className="flex w-full items-center my-[10px] text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                Направление
                                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className=" grid gap-6 bg-gray-100 px-6 py-2 dark:bg-gray-800">
                                    <Link href="/hardware" className="group grid h-auto w-full justify-start gap-1"
                                          prefetch={false}>
                                        <div
                                            className="text-sm font-medium leading-none group-hover:underline">Hardware
                                        </div>
                                    </Link>
                                    <Link href="/software" className="group grid h-auto w-full justify-start gap-1"
                                          prefetch={false}>
                                        <div
                                            className="text-sm font-medium leading-none group-hover:underline">Software
                                        </div>
                                    </Link>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Link href="/news" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Новости
                        </Link>
                        <Link href="/contacts" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Контакты
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
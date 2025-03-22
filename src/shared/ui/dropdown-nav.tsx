"use client"
import { FC, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export type DropdownNavItemProps = {
    name: string;
    link?: string;
    childItems?: DropdownNavItemProps[];
};

export type DropDownProps = {
    items: DropdownNavItemProps[];
};

export const DropdownNav: FC<DropDownProps> = ({ items }) => {
    return (
        <div className="flex gap-[40px]">
            {items.map((menu, index) => (
                <NavItem key={index} item={menu} />
            ))}
        </div>
    );
};

const NavItem: FC<{ item: DropdownNavItemProps }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            {item.link ? (
                <Link href={item.link} className="text-black font-medium">
                    {item.name}
                </Link>
            ) : (
                <span className="text-black font-medium cursor-pointer">{item.name}</span>
            )}
            {item.childItems && isOpen && (
                <motion.div
                    className="absolute border-2 p-2 rounded-[8px] shadow-lg w-[250px] bg-white"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <ul className="space-y-2">
                        {item.childItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="relative group">
                                {subItem.link ? (
                                    <Link href={subItem.link} className="block p-2 hover:bg-[#D9D9D9] rounded-[6px] transition-colors cursor-pointer active:bg-[#B6B6B6]">
                                        {subItem.name}
                                    </Link>
                                ) : (
                                    <span className="block p-2 cursor-pointer">{subItem.name}</span>
                                )}
                                {subItem.childItems && (
                                    <motion.div
                                        className="absolute left-full top-0 ml-2 border-2 p-2 rounded-[8px] shadow-lg w-[200px] bg-white hidden group-hover:block"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <ul className="space-y-2">
                                            {subItem.childItems.map((nestedItem, nestedIndex) => (
                                                <li key={nestedIndex}>
                                                    {nestedItem.link ? (
                                                        <Link href={nestedItem.link} className="block p-2 hover:bg-[#D9D9D9] rounded-[6px] transition-colors cursor-pointer active:bg-[#B6B6B6]">
                                                            {nestedItem.name}
                                                        </Link>
                                                    ) : (
                                                        <span className="block p-2 cursor-pointer">{nestedItem.name}</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

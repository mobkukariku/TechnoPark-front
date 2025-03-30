"use client";
import { FC, useEffect } from "react";
import { ProfileFullInfo } from "@/store/useProfileStore";
import useMembersStore from "@/store/useMembersStore";
import { Container } from "@/shared/components";
import useContactsStore from "@/store/useContactsStore";
import { motion } from "framer-motion";
import { useContactLink } from "@/hooks/useContactLink";

const contactLabels: Record<string, string> = {
    PHONE: "Телефон",
    TELEGRAM: "Telegram",
    LINKEDIN: "LinkedIn",
    GITHUB: "GitHub",
    EMAIL: "Email",
    OTHER: "Другое"
};

export const MemberContacts: FC<{ profile?: ProfileFullInfo }> = ({ profile }) => {
    const { currentMember } = useMembersStore();
    const { contacts, fetchContacts } = useContactsStore();
    const getContactLink = useContactLink();

    const memberId = profile?.id ?? currentMember?.id;

    useEffect(() => {
        if (memberId) {
            fetchContacts(memberId);
        }
    }, [memberId, fetchContacts]);

    const mem = profile ?? currentMember;

    return (
        <Container className="p-5 max-[500px]:p-0 mt-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-3"
            >
                {mem?.email && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-between max-[500px]:text-[14px] max-[500px]:w-[94%] w-full border-b border-gray-200 pb-2"
                    >
                        <p className="font-medium">{contactLabels.EMAIL}</p>
                        <a href={getContactLink("EMAIL", mem.email)}
                           className="text-blue-500 hover:underline">
                            {mem.email}
                        </a>
                    </motion.div>
                )}

                {contacts.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                        }}
                        className="flex flex-col gap-3"
                    >
                        {contacts.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.98, y: 5 },
                                    visible: { opacity: 1, scale: 1, y: 0 }
                                }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="flex justify-between text-[14px] w-full border-b border-gray-200 pb-2"
                            >
                                <p className="font-medium">{contactLabels[item.type] || item.type}</p>
                                {["PHONE", "TELEGRAM", "LINKEDIN", "GITHUB", "EMAIL"].includes(item.type) ? (
                                    <a href={getContactLink(item.type, item.value)}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-blue-500 hover:underline">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p>{item.value}</p>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                ) : (
                    <p className="text-gray-500">Контакты не найдены</p>
                )}
            </motion.div>
        </Container>
    );
};

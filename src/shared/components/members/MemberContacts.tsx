import { FC } from "react";
import Image from "next/image";
import { SelectedMember } from "@/store/useMembersStore";

const contactLabels: Record<string, string> = {
    PHONE: "Телефон",
    TELEGRAM: "Telegram",
    LINKEDIN: "LinkedIn",
    GITHUB: "GitHub",
    EMAIL: "Email",
    OTHER: "Другое"
};

const getContactLink = (type: string, value: string) => {
    switch (type) {
        case "PHONE":
            return `tel:${value}`;
        case "TELEGRAM":
            return `https://t.me/${value.replace("@", "")}`;
        case "LINKEDIN":
            return `https://www.linkedin.com/in/${value}`;
        case "GITHUB":
            return `https://github.com/${value}`;
        case "EMAIL":
            return `mailto:${value}`;
        default:
            return value; // Просто текст без ссылки
    }
};

export const MemberContacts: FC<{ member: SelectedMember }> = ({ member }) => {
    return (
        <div className="flex gap-[36px]">
            <div className="relative w-[202px] h-[202px] overflow-hidden">
                <Image
                    src={member?.memberProfile?.imageURL || "/test.jpeg"}
                    alt="title"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
            </div>
            <div className="w-[78%]">
                <div className="mt-[20px] w-full flex flex-col gap-[15px]">
                    <p className="text-[24px] font-semibold">{member?.name}</p>
                    <span>{member?.memberProfile?.position}</span>
                    <div className="flex flex-col gap-3 mt-[10px]">
                        {member.email && (
                            <div className="flex justify-between w-full border-b border-gray-200 pb-2">
                                <p className="font-medium">{contactLabels.EMAIL}</p>
                                <a href={getContactLink("EMAIL", member.email)}
                                   className="text-blue-500 hover:underline">
                                    {member.email}
                                </a>
                            </div>
                        )}
                        {member.contacts?.map((item, index) => (
                            <div key={index} className="flex justify-between w-full border-b border-gray-200 pb-2">
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
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

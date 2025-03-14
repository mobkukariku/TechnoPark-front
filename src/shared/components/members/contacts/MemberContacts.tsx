import {FC} from "react";
import  {ProfileFullInfo} from "@/store/useProfileStore";
import useMembersStore from "@/store/useMembersStore";
import {Container} from "@/shared/components";

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

export const MemberContacts:FC<{profile?: ProfileFullInfo}> = ({profile}) => {
    const { currentMember } = useMembersStore();

    const mem = profile ?? currentMember

    return (
        <Container className={"p-[20px] mt-[40px]"}>
            <div className="flex flex-col gap-3 mt-[10px]">
                {mem?.email && (
                    <div className="flex justify-between w-full border-b border-gray-200 pb-2">
                        <p className="font-medium">{contactLabels.EMAIL}</p>
                        <a href={getContactLink("EMAIL", mem.email)}
                           className="text-blue-500 hover:underline">
                            {mem.email}
                        </a>
                    </div>
                )}
                {mem?.contacts?.map((item, index) => (
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
        </Container>
    )
}
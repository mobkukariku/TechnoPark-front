import { FC } from "react";
import Image from "next/image";
import { SelectedMember } from "@/store/useMembersStore";



export const MemberInfo: FC<{ member: SelectedMember }> = ({ member }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative w-[202px] h-[202px] max-[500px]:w-[137px] max-[500px]:h-[137px]  overflow-hidden">
                <Image
                    src={member?.memberProfile?.imageURL || "/test.jpeg"}
                    alt="title"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
            </div>
            <div className="text-center">
                <div className="mt-[20px] w-full flex flex-col gap-[2px]">
                    <p className="text-[24px] max-[500px]:text-[20px] font-semibold">{member?.name}</p>
                    <span className={"max-[500px]:text-[14px]"}>{member?.memberProfile?.position}</span>
                </div>
            </div>
        </div>
    );
};

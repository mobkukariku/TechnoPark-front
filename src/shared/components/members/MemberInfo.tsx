import { FC } from "react";
import Image from "next/image";
import { SelectedMember } from "@/store/useMembersStore";
import { motion } from "framer-motion";

export const MemberInfo: FC<{ member: SelectedMember }> = ({ member }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col justify-center items-center"
            >
                <div className="relative w-[202px] h-[202px] max-[500px]:w-[137px] max-[500px]:h-[137px] overflow-hidden rounded-full">
                    <Image
                        src={member?.memberProfile?.imageURL || "/test.jpeg"}
                        alt="title"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div>
                <div className="text-center mt-[20px] w-full flex flex-col gap-[2px]">
                    <p className="text-[24px] max-[500px]:text-[20px] font-semibold">{member?.name}</p>
                    <span className="max-[500px]:text-[14px]">{member?.memberProfile?.position}</span>
                </div>
            </motion.div>
        </div>
    );
};

"use client";
import { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, WorkExpItem } from "@/shared/components";
import useWorkExperienceStore from "@/store/useWorkExperienceStore";

export const WorkExperience: FC<{ id: string | Array<string> | undefined }> = ({ id }) => {
    const { WorkExperience, fetchWorkExperience } = useWorkExperienceStore();

    useEffect(() => {
        if (id) fetchWorkExperience(id as string);
    }, [fetchWorkExperience, id]);

    return (
        <Container className="mt-[80px] max-[500px]:p-0 p-[20px] ">
            <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-[20px] font-semibold"
            >
                Опыт работы
            </motion.p>

            {WorkExperience.length > 0 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="w-full mt-[20px] flex  flex-col gap-[18px]"
                >
                    {WorkExperience.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <WorkExpItem item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </Container>
    );
};

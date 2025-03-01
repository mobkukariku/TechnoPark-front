"use client";
import { FC, useEffect, useState } from "react";
import { Container } from "@/shared/components";
import useProjectsStore from "@/store/useProjectsStore";
import { ProjectImageCarousel } from "@/shared/components/projects/ProjectsImageCarousel";
import { useTranslations } from "next-intl";

export const ProjectsList: FC = () => {
    const { projects, fetchProjectsData, setLimit, isLoading, limit } = useProjectsStore();
    const [isPressed, setIsPressed] = useState(false);
    const t = useTranslations("projects");

    useEffect(() => {
        if (!isLoading) {
            fetchProjectsData();
        }
    }, [fetchProjectsData, limit]);

    const handleMoreButton = () => {
        setLimit(20);
        setIsPressed(true);
    };

    const handleLessButton = () => {
        setLimit(3);
        setIsPressed(false);
    };

    return (
        <Container className="mt-[100px]">
            <h1 className="text-center text-[32px] mb-[30px] font-bold max-[500px]:text-[24px]">
                {t("title")}
            </h1>
            <div className="flex flex-wrap justify-between max-[790px]:justify-center">
                {projects.map((project) => (
                    <div key={project.id} className="w-[374px] max-[500px]:w-[300px]">
                        <ProjectImageCarousel images={project.images} />
                        <p className="text-[24px] max-[500px]:text-[20px] font-bold">
                            {project.title}
                        </p>
                        <hr className="border-[#7E7E7E]" />
                        <span className="text-[#4A4A4A] max-[500px]:text-[14px]">
                            {project.description}
                        </span>
                    </div>
                ))}
            </div>
            {!isPressed ? (
                <p
                    className="text-center mt-[30px] font-medium text-[20px] underline underline-offset-[4px] text-[#2D7DFF] max-[500px]:text-[16px] cursor-pointer mb-[20px] hover:text-[#195BC6] transition-colors active:text-[#204580]"
                    onClick={handleMoreButton}
                >
                    {t("show_more")}
                </p>
            ) : (
                <p
                    className="text-center mt-[30px] font-medium text-[20px] underline underline-offset-[4px] text-[#2D7DFF] max-[500px]:text-[16px] cursor-pointer mb-[20px] hover:text-[#195BC6] transition-colors active:text-[#204580]"
                    onClick={handleLessButton}
                >
                    {t("hide")}
                </p>
            )}
        </Container>
    );
};

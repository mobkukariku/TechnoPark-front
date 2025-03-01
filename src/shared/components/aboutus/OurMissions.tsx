import { FC } from "react";
import { useTranslations } from "next-intl";

export const OurMissions: FC = () => {
    const t = useTranslations("ourMissions");

    const missions = [
        { title: t("mission1.title"), description: t("mission1.description") },
        { title: t("mission2.title"), description: t("mission2.description") },
        { title: t("mission3.title"), description: t("mission3.description") },
        { title: t("mission4.title"), description: t("mission4.description") }
    ];

    return (
        <div className="bg-[#D8E7FF] mt-[30px] relative rounded-[8px] border-2 border-[#2D7DFF] py-[16px] px-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px]">
                {missions.map((mission, index) => (
                    <div key={index} className={`flex gap-[16px] ${index % 2 !== 3 ? 'md:ml-[-13px] max-[500px]:ml-[-10px]' : ''} ${index >= 2 ? 'mt-[12px]' : ''}`}>
                        <div className="bg-[#2D7DFF] w-fit px-[15px] h-fit rounded-r-[8px]">
                            <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div className="text-[20px] font-semibold">
                            <p>{mission.title}</p>
                            <p className="text-[12px] font-[400] mt-[10px] leading-[20px]">
                                {mission.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2D7DFF] transform -translate-y-1/2 hidden md:block"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#2D7DFF] transform -translate-x-1/2 hidden md:block"></div>
        </div>
    );
};

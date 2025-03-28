import {FC} from "react";
import {WorkExperience} from "@/store/useWorkExperienceStore";

export const WorkExpItem:FC<{item:WorkExperience}> = ({item}) =>{

    const formatDate = (date: Date | null | undefined) =>
        date
            ? new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(new Date(date))
            : "настоящее время";


    return (
        <div
            key={item.id}
            className="border w-full  max-[500px]:w-[94%] rounded-[8px] max-[500px]:py-2 max-[500px]:px-2 py-[15px] flex justify-between px-[30px] border-[#639EFF]"
        >
            <div>
                <h2 className="text-[18px] max-[500px]:text-[16px] font-bold">{item.company}</h2>
                <p className="text-[14px] max-[500px]:text-[12px]">{item.position}</p>
                <p className="w-[520px] max-[500px]:w-fit max-[500px]:text-[12px] ml-[18px] mt-[15px] text-[14px]">{item.description}</p>
            </div>
            <p className={"max-[500px]:text-[14px] max-[500px]:w-[120px]"}>{formatDate(item.startDate)} - {formatDate(item.endDate)}</p>
        </div>
    )
}
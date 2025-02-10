import { FC } from "react";

export const OurMissions: FC = () => {
    return (
        <div className="bg-[#D8E7FF] mt-[30px] relative rounded-[8px] border-2 border-[#2D7DFF] py-[16px] px-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px]">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className={`flex gap-[16px] ${index % 2 !== 3 ? 'md:ml-[-13px] max-[500px]:ml-[-10px]' : ''} ${index >= 2 ? 'mt-[12px]' : ''}`}>
                        <div className="bg-[#2D7DFF] w-fit px-[15px] h-fit rounded-r-[8px]">
                            <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div className="text-[20px] font-semibold">
                            <p>Развитие инновационных технологий</p>
                            <p className="text-[12px] font-[400] mt-[10px] leading-[20px]">
                                Мы сосредоточены на поддержке и внедрении передовых технологий в реальную практику. Это включает в себя разработку решений в области искусственного интеллекта, робототехники, интернета вещей (IoT) и других технологических инноваций, которые могут изменить будущее.
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

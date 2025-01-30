import { FC } from "react";

export const OurMissions: FC = () => {
    return (
        <div className="bg-[#D8E7FF] mt-[30px] relative rounded-[8px] border-2 border-[#2D7DFF] py-[16px]">
            <div className="grid grid-cols-2 gap-[26px]">
                {/* Миссия 1 */}
                <div className="flex gap-[16px]">
                    <div className="bg-[#2D7DFF] w-fit px-[15px] h-fit rounded-r-[8px]">
                        <span className="text-white font-bold">1</span>
                    </div>
                    <div className="text-[20px] font-semibold">
                        <p>Развитие инновационных технологий</p>
                        <p className="text-[12px]  font-[400] mt-[10px] leading-[20px]">
                          Мы сосредоточены на поддержке и внедрении передовых технологий в реальную практику. Это включает в себя разработку решений в области искусственного интеллекта, робототехники, интернета вещей (IoT) и других технологических инноваций, которые могут изменить будущее.
                        </p>
                    </div>
                </div>

                {/* Миссия 2 */}
                <div className="flex gap-[16px] ml-[-13px]">
                    <div className="bg-[#2D7DFF] w-fit px-[15px] h-fit rounded-r-[8px]">
                        <span className="text-white font-bold">2</span>
                    </div>
                    <div className="text-[20px] font-semibold">
                        <p>Развитие инновационных технологий</p>
                        <p className="text-[12px] font-[400] mt-[10px] leading-[20px]">
                          Мы сосредоточены на поддержке и внедрении передовых технологий в реальную практику. Это включает в себя разработку решений в области искусственного интеллекта, робототехники, интернета вещей (IoT) и других технологических инноваций, которые могут изменить будущее.
                        </p>
                    </div>
                </div>

                {/* Миссия 3 */}
                <div className="flex gap-[16px]  mt-[12px] ">
                    <div className="bg-[#2D7DFF] w-fit px-[15px] h-fit rounded-r-[8px]">
                        <span className="text-white font-bold">3</span>
                    </div>
                    <div className="text-[20px] font-semibold">
                        <p>Развитие инновационных технологий</p>
                        <p className="text-[12px] font-[400] mt-[10px] leading-[20px]">
                          Мы сосредоточены на поддержке и внедрении передовых технологий в реальную практику. Это включает в себя разработку решений в области искусственного интеллекта, робототехники, интернета вещей (IoT) и других технологических инноваций, которые могут изменить будущее.
                        </p>
                    </div>
                </div>

                {/* Миссия 4 */}
                <div className="flex gap-[16px] mt-[12px] ml-[-13px]">
                    <div className="bg-[#2D7DFF] w-fit px-[15px] h-fit rounded-r-[8px]">
                        <span className="text-white font-bold">4</span>
                    </div>
                    <div className="text-[20px] font-semibold">
                        <p>Развитие инновационных технологий</p>
                        <p className="text-[12px] font-[400] mt-[10px] leading-[20px]">
                          Мы сосредоточены на поддержке и внедрении передовых технологий в реальную практику. Это включает в себя разработку решений в области искусственного интеллекта, робототехники, интернета вещей (IoT) и других технологических инноваций, которые могут изменить будущее.
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2D7DFF] transform -translate-y-1/2"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#2D7DFF] transform -translate-x-1/2"></div>
        </div>
    );
};

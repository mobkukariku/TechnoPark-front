import {FC} from "react";
import {Container} from "@/shared/components";
import {OurMissions} from "@/shared/components/aboutus/OurMissions";

export const AboutUsContent:FC = () => {
    return (
        <Container>
            <p className={"text-center text-[20px] mt-[24px] max-[500px]:text-[16px] font-medium"}>
                <b className={"text-[24px] max-[500px]:text-[20px]"}>SDU TechnoPark</b> – это инновационный центр, расположенный в сердце города Каскелен, Казахстан. Мы создаем экосистему для развития новых технологий, стартапов и проектов в области науки и бизнеса. Наша цель — стать платформой для инноваций и развития высококвалифицированных специалистов, готовых внедрять решения завтрашнего дня уже сегодня.
            </p>

            <div>
                <p className={"text-center text-[24px] font-bold mt-[60px]"}>
                    НАША МИССИЯ
                </p>
                <OurMissions />
            </div>
        </Container>
    )
}
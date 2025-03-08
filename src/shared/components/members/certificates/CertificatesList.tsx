import {FC} from "react";
import {Container} from "@/shared/components"
import {NotCeritficate} from "@/shared/components/members/certificates/NotCeritficate";
export const CertificatesList:FC = () => {
    return(
        <Container className={"p-[20px] mt-[50px]"} >
            <p className={"text-[20px] font-semibold"}>Сертификаты</p>
            <NotCeritficate/>
        </Container>
    )
}
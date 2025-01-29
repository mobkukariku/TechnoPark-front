import {FC} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"
import {House} from "lucide-react";
import {Container} from "@/shared/components";


export const SoftwareBreadcrumb:FC = () => {
    return (
        <Container>
            <Breadcrumb className={"bg-[#D8E7FF] rounded-[8px] p-[8px] uppercase font-[600] flex  items-center gap-[10px]"}>
                <House width={16} />
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className={"hover:text-[#2D7DFF]"}>Главная страница</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className={"text-[#2D7DFF]"}>
                        <BreadcrumbLink href="/software">Software</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </Container>

    )
}
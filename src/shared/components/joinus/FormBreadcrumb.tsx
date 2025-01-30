import {FC} from "react";
import {House} from "lucide-react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/shared/ui/breadcrumb";

export const FormBreadcrumb:FC = () => {
    return (
       <div className={"max-w-[500px] mx-auto mb-[11px]"}>
           <Breadcrumb className={"bg-[#D8E7FF] rounded-[8px] p-[8px] uppercase font-[600] flex  items-center gap-[10px]"}>
               <House width={16} />
               <BreadcrumbList>
                   <BreadcrumbItem>
                       <BreadcrumbLink href="/" className={"hover:text-[#2D7DFF]"}>Главная страница</BreadcrumbLink>
                   </BreadcrumbItem>
                   <BreadcrumbSeparator />
                   <BreadcrumbItem className={"text-[#2D7DFF]"}>
                       <BreadcrumbLink href="/joinus">JOIN US</BreadcrumbLink>
                   </BreadcrumbItem>
               </BreadcrumbList>
           </Breadcrumb>
       </div>
    )
}
import {FC} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {WorkExpForm} from "@/shared/components/profile/work-exp/WorkExpForm";
import {Pencil} from "lucide-react";
import {WorkExperience} from "@/store/useWorkExperienceStore";

export const WorkExpEdit:FC<{selectedExperience:WorkExperience}> = ({selectedExperience}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil className="cursor-pointer hover:text-[#2D7DFF] transition-colors" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать опыт работы</DialogTitle>
                </DialogHeader>
                <WorkExpForm workExperience={selectedExperience} />
            </DialogContent>
        </Dialog>
    )
}
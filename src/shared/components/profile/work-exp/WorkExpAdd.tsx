import {FC} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui";
import {WorkExpForm} from "@/shared/components/profile/work-exp/WorkExpForm";

export const WorkExpAdd:FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"w-[120px]"}>+</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить опыт работы</DialogTitle>
                </DialogHeader>
                    <WorkExpForm />
            </DialogContent>
        </Dialog>
    )
}
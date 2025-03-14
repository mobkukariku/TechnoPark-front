import {FC} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Pencil} from "lucide-react";
import {ContactsEditForm} from "./ContactsEditForm";

export const ContactsEditDialog:FC = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Pencil  className={"absolute top-[-20px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактировать Контакты</DialogTitle>
                    </DialogHeader>
                    <ContactsEditForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}
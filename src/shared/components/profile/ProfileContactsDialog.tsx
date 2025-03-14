import {FC} from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import {Pencil} from "lucide-react";


export const ProfileContactsDialog:FC<{className:string}> = ({className}) => {

    return (
        <Dialog>
            <DialogTrigger asChild className={`${className}`}>
                <Pencil  className={"absolute top-[30px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
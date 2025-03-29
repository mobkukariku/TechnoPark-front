"use client"
import {FC} from "react";
import {useParams} from "next/navigation";
import {CurrentMemberInfo} from "@/shared/components";

const CurrentMemberPage:FC = () => {
    const params = useParams();
    const id: string | Array<string> | undefined = params.id;

    return (
        <div>
            <CurrentMemberInfo id={id} />
        </div>
    )
}

export default CurrentMemberPage;
"use client"
import {FC} from "react";
import {CurrentNewsInfo,} from "@/shared/components";
import {useParams} from "next/navigation";

const CurrentNewsPage:FC = () => {
    const params = useParams();
    const id: string | Array<string> | undefined = params.id;

    return (
        <>
            <CurrentNewsInfo newsId={id} />
        </>
    )
}

export default CurrentNewsPage;
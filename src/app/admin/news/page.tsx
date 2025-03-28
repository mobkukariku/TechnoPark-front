import {FC} from "react";
import {NewsButtons, NewsList} from "@/shared/components";

const NewsPage:FC = () => {
    return (
        <>
            <NewsButtons />
            <NewsList />

        </>
    )
}

export default NewsPage;
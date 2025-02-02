import {FC} from "react";
import {CustomBreadcrumb, NewsBreadcrumb, NewsPageList} from "@/shared/components";

const NewsPage:FC = () => {

    return (
        <>
            <CustomBreadcrumb name={"Новости"} link={"/news"} />
            <NewsPageList />
        </>
    )
}

export default NewsPage;
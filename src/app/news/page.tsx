import {FC} from "react";
import {CustomBreadcrumb, Header, NewsPageList} from "@/shared/components";

const NewsPage:FC = () => {

    return (
        <>
            <Header/>
            <CustomBreadcrumb name={"Новости"} link={"/news"} />
            <NewsPageList />
        </>
    )
}

export default NewsPage;
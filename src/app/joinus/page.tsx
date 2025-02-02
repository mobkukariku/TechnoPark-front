import {FC} from "react";
import {FormBreadcrumb, Header, JoinUsForm} from "@/shared/components";

const joinusPage:FC = () => {
    return (
        <>
            <Header />
            <FormBreadcrumb />
            <JoinUsForm />
        </>
    )
}

export default joinusPage;
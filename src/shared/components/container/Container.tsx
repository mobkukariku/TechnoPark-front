import {FC, ReactNode} from "react";

export const Container:FC<{children:ReactNode, className?:string}> = ({children, className}) => {
    return (
        <div className={`${className} max-w-[1186px] mx-auto`}>
            {children}
        </div>
    )
}
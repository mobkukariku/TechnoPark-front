import {FC, ReactNode} from "react";

export const Container:FC<{children:ReactNode, className?:string}> = ({children, className}) => {
    return (
        <div className={`${className} max-w-[1186px] max-[1000px]:max-w-[95%] mx-auto`}>
            {children}
        </div>
    )
}
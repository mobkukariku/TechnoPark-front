import {FC} from "react";

export const NewsSideBar:FC = () => {
    return (
        <div>
            <p className={"text-center font-semibold text-[20px] mt-[10px] "}>Последние новости</p>
            <div className={"max-w-[290px] mt-[21px] flex flex-col gap-[20px]"}>
                <div className={"flex flex-col gap-[6px]"}>
                    <h2 className={"font-medium cursor-pointer hover:text-[#5998FF] transition-colors"}>Аналоги доллара в криптовалютах обогнали Visa и Mastercard по объему транзакций</h2>
                    <p className={"text-[#444444] text-[14px] cursor-pointer "}>04.02.2024</p>
                    <hr className={"border-[#CDCDCD]"}/>
                </div>
                <div className={"flex flex-col gap-[6px]"}>
                    <h2 className={"font-medium cursor-pointer hover:text-[#5998FF] transition-colors"}>Аналоги доллара в криптовалютах обогнали Visa и Mastercard по объему транзакций</h2>
                    <p className={"text-[#444444] text-[14px] cursor-pointer "}>04.02.2024</p>
                    <hr className={"border-[#CDCDCD]"}/>
                </div>
                <div className={"flex flex-col gap-[6px]"}>
                    <h2 className={"font-medium cursor-pointer hover:text-[#5998FF] transition-colors"}>Аналоги доллара в криптовалютах обогнали Visa и Mastercard по объему транзакций</h2>
                    <p className={"text-[#444444] text-[14px] cursor-pointer "}>04.02.2024</p>
                    <hr className={"border-[#CDCDCD]"}/>
                </div>
            </div>
        </div>
    )
}
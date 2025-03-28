"use client"
import {FC, useEffect} from "react";
import useMembersStore from "@/store/useMembersStore";
import Image from "next/image"
import {Input} from "@/shared/ui";
import Link from "next/link";

export const MembersList:FC = () => {

    const { membersForUsers, isLoading,fetchingMembersForUsers, search, setSearch} = useMembersStore();

    useEffect(() => {
        if(!isLoading){
            fetchingMembersForUsers();
        }
    }, [search]);

    return (
        <div className={"mt-[50px]  "}>
            <div className={"flex "}>
                <Input placeholder={"Поиск"} className={"max-w-[500px] w-[93%]"} value={search}  onChange={(e) => setSearch(e.target.value)} />
            </div>
           <div className={"flex mt-[50px] flex-wrap gap-[20px]"}>
               {membersForUsers.map((item, index) =>(
                   <div key={index} className={"border-[1.5px] pt-[30px] w-[295px] h-[324px] rounded-[10px] border-[#2D7DFF]"}>
                       <div className={"flex flex-col justify-center gap-[10px] items-center text-center"}>
                           <Link href={`/members/${item.id}`}>
                               <div className="relative w-[165px] h-[165px] rounded-full overflow-hidden ">
                                   <Image
                                       src={item.memberProfile?.imageURL || "/test.jpeg"}
                                       alt={"title"}
                                       layout="fill"
                                       objectFit="cover"
                                   />
                               </div>
                           </Link>
                           <hr className={"border-1 mt-[10px] w-[80%]"}/>
                           <span className={"text-[14px] text-[#777777]"}>{item.memberProfile?.position}</span>
                           <Link href={`/members/${item.id}`}>
                               <p className={"text-[20px] font-semibold "}>{item.name} </p>
                           </Link>
                       </div>
                   </div>
               ))}
           </div>
        </div>
    )
}
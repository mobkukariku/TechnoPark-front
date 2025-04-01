"use client";
import { FC, useEffect } from "react";
import useMembersStore from "@/store/useMembersStore";
import Image from "next/image";
import { Input } from "@/shared/ui";
import Link from "next/link";
import { motion } from "framer-motion";

export const MembersList: FC = () => {
  const { membersForUsers, fetchingMembersForUsers, search, setSearch } =
    useMembersStore();

  useEffect(() => {
    fetchingMembersForUsers();
  }, [fetchingMembersForUsers, search]);

  return (
    <div className="mt-12 p-4 max-w-6xl mx-auto">
      <div className="flex justify-center">
        <Input
          placeholder="Поиск..."
          className="max-w-lg w-full border border-gray-300 shadow-sm rounded-[8px] p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex mt-12 flex-wrap gap-6 justify-center">
        {membersForUsers.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
            className="border-[1.5px] pt-6 w-[295px] h-[324px] rounded-[8px] shadow-sm bg-white hover:shadow-md transition-all transform hover:scale-105"
          >
            <div className="flex flex-col justify-center gap-4 items-center text-center">
              <Link href={`/members/${item.id}`}>
                <div className="relative w-[165px] h-[165px] rounded-full overflow-hidden shadow-sm">
                  <Image
                    src={item.memberProfile?.imageURL || "/test.jpeg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Link>
              <hr className="border border-gray-300 w-[80%]" />
              <span className="text-sm text-gray-500">
                {item.memberProfile?.position}
              </span>
              <Link href={`/members/${item.id}`}>
                <p className="text-lg font-semibold text-blue-700 hover:underline">
                  {item.name}
                </p>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

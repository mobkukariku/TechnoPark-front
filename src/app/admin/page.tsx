"use client";
import { FC } from "react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Users, LogOut, Newspaper, Presentation } from "lucide-react";
import useProfileStore from "@/store/useProfileStore";

const AdminPage: FC = () => {
  const { logout } = useProfileStore();

  return (
    <div className=" flex flex-col bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Админ-панель</h1>
        <Button
          variant="outline"
          onClick={async () => logout()}
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          Выйти
        </Button>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/members" className="group">
          <div className="p-6 bg-white shadow-md rounded-lg flex items-center gap-4 hover:shadow-lg transition">
            <Users className="w-10 h-10 text-blue-500 group-hover:text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Пользователи</h2>
              <p className="text-gray-500 text-sm">Управление пользователями</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/news" className="group">
          <div className="p-6 bg-white shadow-md rounded-lg flex items-center gap-4 hover:shadow-lg transition">
            <Newspaper className="w-10 h-10 text-green-500 group-hover:text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Новости</h2>
              <p className="text-gray-500 text-sm">Управление новостями</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/projects" className="group">
          <div className="p-6 bg-white shadow-md rounded-lg flex items-center gap-4 hover:shadow-lg transition">
            <Presentation className="w-10 h-10 text-purple-500 group-hover:text-purple-600" />
            <div>
              <h2 className="text-lg font-semibold">Проекты</h2>
              <p className="text-gray-500 text-sm">Управление проектами</p>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default AdminPage;

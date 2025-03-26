import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useDepartmentStore, { Department } from "@/store/useDepartmentStore";
import useMemberStore, { Member } from "@/store/useMembersStore";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { motion } from "framer-motion";

interface DepartmentFormData {
    id: string | undefined;
    name: string;
    headId?: string;
    parentDepartmentId?: string;
}

export const DepartmentCreateDialog: FC = () => {
    const { createDepartment, fetchDepartments, departments } = useDepartmentStore();
    const { fetchMembersforAdmins, membersForAdmin } = useMemberStore();
    const { register, handleSubmit, reset, setValue } = useForm<DepartmentFormData>();

    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
    const [searchMember, setSearchMember] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");

    useEffect(() => {
        if (membersForAdmin.length === 0) {
            fetchMembersforAdmins();
        }
        if (departments.length === 0) {
            fetchDepartments();
        }
    }, []);

    // Фильтрация сотрудников
    useEffect(() => {
        setFilteredMembers(
            searchMember.trim()
                ? membersForAdmin.filter((member) =>
                    member.name.toLowerCase().includes(searchMember.toLowerCase())
                )
                : []
        );
    }, [searchMember, membersForAdmin]);


    useEffect(() => {
        setFilteredDepartments(
            searchDepartment.trim()
                ? departments.filter((dep) =>
                    dep.name.toLowerCase().includes(searchDepartment.toLowerCase())
                )
                : []
        );
    }, [searchDepartment, departments]);

    const onSubmit = (data: DepartmentFormData) => {
        createDepartment({
            id: undefined,
            name: data.name,
            headId: data.headId || null,
            parentDepartmentId: data.parentDepartmentId || null
        });
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Добавить</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавить департамент</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" {...register("name", { required: true })} />
                    </div>

                    {/* Руководитель */}
                    <div className="relative">
                        <Label>Руководитель</Label>
                        <Input
                            value={searchMember}
                            onChange={(e) => setSearchMember(e.target.value)}
                            placeholder="Введите имя руководителя"
                        />
                        {filteredMembers.length > 0 && (
                            <motion.ul
                                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-10 w-full bg-white border rounded-md shadow-md"
                            >
                                {filteredMembers.map((member) => (
                                    <li
                                        key={member.id}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSearchMember(member.name);
                                            setValue("headId", member.id);
                                            setFilteredMembers([]);
                                        }}
                                    >
                                        {member.name}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </div>

                    {/* Родительский департамент */}
                    <div className="relative">
                        <Label>Родительский департамент</Label>
                        <Input
                            value={searchDepartment}
                            onChange={(e) => setSearchDepartment(e.target.value)}
                            placeholder="Введите название департамента"
                        />
                        {filteredDepartments.length > 0 && (
                            <motion.ul
                                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-10 w-full bg-white border rounded-md shadow-md"
                            >
                                {filteredDepartments.map((dep) => (
                                    <li
                                        key={dep.id}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSearchDepartment(dep.name);
                                            setValue("parentDepartmentId", dep.id);
                                            setFilteredDepartments([]);
                                        }}
                                    >
                                        {dep.name}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit">Сохранить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

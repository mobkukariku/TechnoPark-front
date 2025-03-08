import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TreeDataItem } from "@/shared/ui/tree-view";

interface Member {
    id: string;
    name: string;
}

interface Department {
    id: string;
    name: string;
    head?: Member;
    members?: Member[];
    subDepartments?: Department[];
}

export const transformDepartmentsToTree = (departments: Department[], router: AppRouterInstance): TreeDataItem[] => {
    return departments.map((dept) => {
        const headId = dept.head?.id;

        const head: TreeDataItem = dept.head
            ? {
                id: `head-${dept.head.id}`,
                name: `👤 ${dept.head.name}`,
                onClick: () => router.push(`/members/${dept.head!.id}`),
            }
            : { id: `head-${dept.id}-none`, name: "Без главы" };

        const members: TreeDataItem[] = (dept.members ?? [])
            .filter((m) => m.id !== headId)
            .map((m) => ({
                id: `member-${m.id}`,
                name: `👥 ${m.name}`,
                onClick: () => router.push(`/members/${m.id}`),
            }));

        return {
            id: dept.id,
            name: `🏢 ${dept.name}`,
            children: [
                head,
                ...members,
                ...(dept.subDepartments?.length ? transformDepartmentsToTree(dept.subDepartments, router) : []),
            ],
        };
    });
};


"use client";
import { FC, useState } from "react";
import { Button, Input } from "@/shared/ui";
import { ContactSelect } from "@/shared/components/profile/contacts/ContactSelect";
import { useContactLink } from "@/hooks/useContactLink";
import useContactsStore from "@/store/useContactsStore";
import { ConfirmDialog } from "@/shared/components"; // Импортируем диалог

export interface IContactProps {
    id: string;
    type: string;
    value: string;
}

export const ContactLine: FC<IContactProps> = ({ id, type, value }) => {
    const { updateContacts, deleteContact } = useContactsStore();

    const [isEdit, setIsEdit] = useState(false);
    const [editedValue, setEditedValue] = useState(value);
    const [editedType, setEditedType] = useState(type);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const getContactLink = useContactLink();
    const link = getContactLink(type, value);
    const isLink = ["PHONE", "TELEGRAM", "LINKEDIN", "GITHUB", "EMAIL"].includes(type);

    const handleUpdate = async () => {
        try {
            await updateContacts(id, { type: editedType, value: editedValue });
            setIsEdit(false);
        } catch (error) {
            console.error("Failed to update contact:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteContact(id);
        } catch (error) {
            console.error("Failed to delete contact:", error);
        } finally {
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="border-b flex justify-between items-center">
            <div className="flex flex-col gap-2 pb-2">
                {isEdit ? (
                    <ContactSelect className={"w-[250px]"} value={editedType} onChange={setEditedType} />
                ) : (
                    <p className="font-medium">{type}</p>
                )}

                {isEdit ? (
                    <Input
                        className="w-[250px]"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                    />
                ) : isLink ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {value}
                    </a>
                ) : (
                    <p className="text-gray-600">{value}</p>
                )}
            </div>
            <div className="flex gap-2">
                {isEdit ? (
                    <>
                        <Button variant="outline" onClick={handleUpdate}>
                            Подтвердить
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsEdit(false);
                                setEditedValue(value);
                                setEditedType(type);
                            }}
                        >
                            Отмена
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="outline" onClick={() => setIsEdit(true)}>
                            Изменить
                        </Button>
                        <Button variant="destructive" className={"rounded-[8px]"} onClick={() => setIsDialogOpen(true)}>
                            Удалить
                        </Button>
                    </>
                )}
            </div>

            <ConfirmDialog
                text="Вы уверены, что хотите удалить этот контакт? Это действие нельзя отменить."
                onConfirm={handleDelete}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
};

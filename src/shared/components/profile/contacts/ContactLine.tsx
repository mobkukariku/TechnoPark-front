"use client";
import {FC, useEffect, useState} from "react";
import { Button, Input } from "@/shared/ui";
import { ContactSelect } from "@/shared/components/profile/contacts/ContactSelect";
import { useContactLink } from "@/hooks/useContactLink";
import useContactsStore from "@/store/useContactsStore";

export interface IContactProps {
    id: string;
    type: string;
    value: string;
}

export const ContactLine: FC<IContactProps> = ({ id, type, value }) => {
    const {updateContacts} = useContactsStore();

    const [isEdit, setIsEdit] = useState(false);
    const [editedValue, setEditedValue] = useState(value);
    const [editedType, setEditedType] = useState(type);

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
    return (
        <div className="border-b flex justify-between items-center">
            <div className="flex flex-col gap-2 pb-2">
                {isEdit ? (
                    <ContactSelect value={editedType} onChange={setEditedType} />
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
                            Confirm
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsEdit(false);
                                setEditedValue(value);
                                setEditedType(type);
                            }}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="outline" onClick={() => setIsEdit(true)}>
                        Edit
                    </Button>
                )}
            </div>
        </div>
    );
};

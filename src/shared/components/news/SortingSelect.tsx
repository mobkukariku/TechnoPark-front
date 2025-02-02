import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import {FC} from "react";

export const SortingSelect:FC<{value:string, hadnleChange:(value:string) => void}> = ({value, hadnleChange}) => {

    return (
        <Select value={value} onValueChange={hadnleChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select a sorting" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem  value="newest">Новые</SelectItem>
                    <SelectItem value="oldest">Старые</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
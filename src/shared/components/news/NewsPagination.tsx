import { FC } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/ui/pagination";

interface NewsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const NewsPagination: FC<NewsPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={handlePrevious} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            onClick={() => onPageChange(index + 1)}
                            className={index + 1 === currentPage ? "text-white bg-[#2D7DFF] rounded-[5px]" : ""}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

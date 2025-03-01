import * as React from "react"

import { Card, CardContent } from "@/shared/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui/carousel"
import {FC} from "react";
import Image from "next/image";

interface ProjectsImageCarouselProps {
    images: { id: string; imageUrl: string }[]; // Должен быть массив объектов
}


export const ProjectImageCarousel:FC<ProjectsImageCarouselProps> = ({images = []}) => {
    return (
        <Carousel className="w-[374px] max-[500px]:w-[300px]">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="w-fit">
                            <Card className={"w-fit"}>
                                <CardContent className="relative h-[211px] w-[374px] max-[500px]:h-[169px]  max-[500px]:w-[300px] overflow-hidden rounded-[8px]">
                                        <Image src={image.imageUrl} alt={image.id}  layout="fill" objectFit="cover" className="object-cover w-full h-full" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant={"link"} />
            <CarouselNext variant={"link"} />
        </Carousel>
    )
}

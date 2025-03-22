"use client";
import { FC } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import {Container} from "@/shared/components";


export const PhotoGallery: FC = () => {
    const images = [
        { src: "/interior/1.JPG", alt: "1" },
        { src: "/interior/2.JPG", alt: "2" },
        { src: "/interior/3.JPG", alt: "3" },
        { src: "/interior/4.JPG", alt: "4" },
        { src: "/interior/5.JPG", alt: "5" },
        { src: "/interior/6.JPG", alt: "6" },
    ];

    return (
        <Container className="w-fit my-[50px] mx-auto p-4">
            <h2 className="text-center text-[32px] font-bold mb-6">Галерея</h2>
            <SlideshowLightbox theme="lightbox" className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"}>
                    {images.map((item, index) => (
                        <img
                            key={index}
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-[200px] object-cover rounded-[8px] cursor-pointer transition-transform duration-300 hover:scale-105"
                        />
                    ))}
            </SlideshowLightbox>
        </Container>
    );
};

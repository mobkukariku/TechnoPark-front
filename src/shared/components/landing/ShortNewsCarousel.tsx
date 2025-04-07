"use client";

import { FC, useEffect, useState } from "react";
import { getNews } from "@/api/newsApi";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { NewsItem } from "@/shared/components";
import { ShortNewsSkeleton } from "@/shared/components/landing";
import { motion } from "framer-motion";

interface ShortNewsProps {
  id: string;
  title: string;
  imageURL: string;
  createdAt: string;
}

// Create a separate component for each news item
const AnimatedNewsItem: FC<{ item: ShortNewsProps; index: number }> = ({
  item,
  index,
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.disconnect();
    };
  }, [ref]);

  return (
    <CarouselItem className="basis-1/3 max-[1000px]:basis-1/2 max-[500px]:basis-full">
      <motion.div
        ref={setRef}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
      >
        <NewsItem
          id={item.id}
          imageURL={item.imageURL}
          title={item.title}
          createdAt={item.createdAt}
        />
      </motion.div>
    </CarouselItem>
  );
};

// Skeleton version with the same animation logic
const AnimatedSkeleton: FC<{ index: number }> = ({ index }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.disconnect();
    };
  }, [ref]);

  return (
    <CarouselItem className="basis-1/3 max-[1000px]:basis-1/2 max-[500px]:basis-full">
      <motion.div
        ref={setRef}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
      >
        <ShortNewsSkeleton />
      </motion.div>
    </CarouselItem>
  );
};

export const ShortNewsCarousel: FC = () => {
  const [newsData, setNewsData] = useState<ShortNewsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response: ShortNewsProps[] = (await getNews({
          page: 1,
          limit: 3,
          sort: "newest",
        })) as ShortNewsProps[];
        setNewsData(response || []);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Carousel opts={{ align: "start" }} className="w-full my-[30px]">
      <CarouselContent>
        {!isLoading
          ? newsData.map((item, index) => (
              <AnimatedNewsItem key={item.id} item={item} index={index} />
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <AnimatedSkeleton key={index} index={index} />
            ))}
      </CarouselContent>
    </Carousel>
  );
};

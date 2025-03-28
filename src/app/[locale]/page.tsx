import {
    CampusToor,
    Directions,
    LandingBanner,
    PhotoGallery,
    ShortAboutUs,
    ShortNews
} from "@/shared/components";

export default function Home() {
    return (
       <>
           <LandingBanner />
           <ShortAboutUs />
           <Directions />
           <ShortNews />
           <PhotoGallery />
           <CampusToor/>
       </>
    );
}

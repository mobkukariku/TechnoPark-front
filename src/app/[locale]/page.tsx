import {
    CampusToor,
    Directions,
    Footer,
    Header,
    LandingBanner,
    PhotoGallery,
    ShortAboutUs,
    ShortNews
} from "@/shared/components";

export default function Home() {
    return (
       <>
           <Header />
           <div className="min-h-screen flex flex-col">
               <main className="flex-grow">
                   <LandingBanner />
                   <ShortAboutUs />
                   <Directions />
                   <ShortNews />
                   <PhotoGallery />
                   <CampusToor/>
               </main>
               <Footer />
           </div>
       </>
    );
}

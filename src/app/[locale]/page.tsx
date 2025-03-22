import {CampusToor, Directions, Footer, Header, LandingBanner, ShortAboutUs, ShortNews} from "@/shared/components";

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
                   <CampusToor/>
               </main>
               <Footer />
           </div>
       </>
    );
}

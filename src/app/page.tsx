import {Directions, Header, LandingBanner, ShortAboutUs, ShortNews} from "@/shared/components";

export default function Home() {
  return (
      <div>
          <Header />
          <LandingBanner />
          <ShortAboutUs/>
          <Directions />
          <ShortNews />
      </div>
  );
}

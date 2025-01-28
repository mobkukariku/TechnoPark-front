import {Directions, Header, LandingBanner, ShortAboutUs} from "@/shared/components";

export default function Home() {
  return (
      <div>
          <LandingBanner />
          <ShortAboutUs/>
          <Directions />
      </div>
  );
}

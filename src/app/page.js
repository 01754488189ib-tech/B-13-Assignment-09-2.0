import AdoptionProcess from "@/components/AdoptionProcess";
import Banner from "@/components/Banner";
import CallToAction from "@/components/CallToAction";
import Patnest from "@/components/Patnest";
import Petcare from "@/components/Petcare";
import SimplePetFeature from "@/components/SimplePetFeature";
import SuccessStories from "@/components/SuccessStories";
import Tabs from "@/components/Tabs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <Tabs />
      <Petcare />
      <AdoptionProcess />
      <Patnest />
      <SuccessStories />
      <SimplePetFeature />
      <CallToAction />
    </div>
  );
}

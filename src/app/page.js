import Banner from "@/components/Banner";
import CallToAction from "@/components/CallToAction";
import Petcare from "@/components/Petcare";
import Tabs from "@/components/Tabs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <Tabs />
      {/* <Petcare /> */}
      {/* <Adoption /> */}
      {/* <Patnest /> */}
      {/* <SuccessStories /> */}
      {/* <SimplePetFeature /> */}
      <CallToAction />
    </div>
  );
}

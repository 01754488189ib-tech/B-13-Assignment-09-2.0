import Banner from "@/components/Banner";
import CallToAction from "@/components/CallToAction";
import Patnest from "@/components/Patnest";
import Petcare from "@/components/Petcare";
import SimplePetFeature from "@/components/SimplePetFeature";
import SuccessStories from "@/components/SuccessStories";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <div>
      <Banner />
      <Tabs />
      <Petcare />
      <Patnest />
      <SuccessStories />
      <SimplePetFeature />
      <CallToAction />
    </div>
  );
}

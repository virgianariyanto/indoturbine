import Navbar from "./components/sections/Navbar";
import Hero from "./components/page/home/Hero";
import Visi from "./components/page/home/Visi";
import { getVisiMisiData } from "./actions/visimisi";
import CoreValue from "./components/page/home/CoreValue";
import { getCoreValueData } from "./actions/corevalue";
import History from "./components/page/home/History";
import Policy from "./components/page/home/Policy";
import Contact from "./components/page/home/Contact";
import News from "./components/page/home/News";
import Footer from "./components/sections/Footer";
import { getHeroData } from "./actions/hero";

export default async function Home() {
  const heroData = await getHeroData();
  const visiMisiData = await getVisiMisiData();
  const coreValueData = await getCoreValueData();

  return (
    <>
      <Navbar />
      <Hero data={heroData} />
      <Visi data={visiMisiData} />
      <CoreValue data={coreValueData} />
      <History />
      <Policy />
      <Contact />
      <News />
      <Footer />
    </>
  );
}


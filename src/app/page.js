import Navbar from "./components/sections/Navbar";
import HomeHero from "./components/page/home/Hero";
import Visi from "./components/page/home/Visi";
import CoreValue from "./components/page/home/CoreValue";
import History from "./components/page/home/History";
import Policy from "./components/page/home/Policy"; 
import Contact from "./components/page/home/Contact";
import News from "./components/page/home/News";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <Visi />
      <CoreValue />
      <History />
      <Policy />
      <Contact />
      <News />
      <Footer />
    </>
  );
}


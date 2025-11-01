import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Streamers from "./_components/Streamers";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";
import { Header } from "./_components/Appbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* <Header/> */}
      <Navbar/>
      <Hero />
      <Features />
      <Streamers />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;

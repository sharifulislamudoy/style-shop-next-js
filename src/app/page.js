import Image from "next/image";
import Hero from "./components/HeroSection";
import ProductHighlightSection from "./components/ProductHighLightSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductHighlightSection />
    </div>
  );
}

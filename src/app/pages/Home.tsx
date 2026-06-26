import { Helmet } from "react-helmet-async";
import { HeroSection } from "../components/home/HeroSection";
import { PromoTiles } from "../components/home/PromoTiles";
import { CategoryList } from "../components/home/CategoryList";
import { ServiceStrip } from "../components/home/ServiceStrip";
import { ProductSection } from "../components/home/ProductSection";

export function Home() {
  return (
    <>
      <Helmet>
        <title>SKML Mobiles | Best Deals on Phones</title>
        <meta name="description" content="Shop the latest smartphones and accessories at SKML Mobiles." />
      </Helmet>
      <HeroSection />
      <PromoTiles />
      <CategoryList />
      <ServiceStrip />
      <ProductSection title="Trending Now" layout="scroll" viewAllTo="/categories" sort="newest" />
      <ProductSection title="Top Picks For You" layout="grid" viewAllTo="/categories" sort="top" />
    </>
  );
}

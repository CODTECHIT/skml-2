import { Helmet } from "react-helmet-async";
import { HeroSection } from "../components/home/HeroSection";
import { PromoTiles } from "../components/home/PromoTiles";
import { CategoryList } from "../components/home/CategoryList";
import { ServiceStrip } from "../components/home/ServiceStrip";
import { ProductSection } from "../components/home/ProductSection";

export function Home() {
  return (
    <div className="bg-gradient-to-b from-primary/15 via-primary/5 to-accent/15 min-h-screen">
      <Helmet>
        <title>SKML Mobiles | Best Deals on Electronics, Mobiles & Fashion in Yellamanchili</title>
        <meta name="description" content="SKML Mobiles — your trusted online store for smartphones, accessories, electronics, fashion & lifestyle products in Yellamanchili, Anakapalli District. Best prices, fast delivery." />
        <meta name="keywords" content="SKML Mobiles, mobiles Yellamanchili, buy phones online, electronics store, smartphones, accessories, fashion, best deals, online shopping" />
        <link rel="canonical" href="https://skmlmobiles.com/" />
        <meta property="og:title" content="SKML Mobiles | Best Deals on Electronics, Mobiles & Fashion" />
        <meta property="og:description" content="Your trusted online store for smartphones, accessories, electronics, fashion & lifestyle products in Yellamanchili." />
        <meta property="og:url" content="https://skmlmobiles.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://skmlmobiles.com/image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SKML Mobiles | Best Deals on Electronics, Mobiles & Fashion" />
        <meta name="twitter:description" content="Your trusted online store for smartphones, accessories, electronics, fashion & lifestyle products in Yellamanchili." />
      </Helmet>
      <div className="pt-2">
        <HeroSection />
      </div>
      <div className="py-4">
        <PromoTiles />
      </div>
      <div className="py-4 my-2">
        <CategoryList />
      </div>
      <div className="py-4">
        <ServiceStrip />
      </div>
      <div className="py-8">
        <ProductSection title="Trending Now" layout="scroll" viewAllTo="/categories" sort="newest" />
      </div>
      <div className="pt-8 pb-12">
        <ProductSection title="Top Picks For You" layout="grid" viewAllTo="/categories" sort="top" />
      </div>
    </div>
  );
}

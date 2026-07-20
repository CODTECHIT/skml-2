import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Heart, ShoppingCart, ArrowLeft, Share2, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { StarRating } from "../components/product/StarRating";
import { useGetProductById } from "../hooks/useData";
function ProductDetailSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="md:w-1/2 bg-muted rounded-xl h-80" />
        <div className="md:w-1/2 space-y-4">
          <div className="h-4 w-24 bg-muted rounded-full" />
          <div className="h-8 w-3/4 bg-muted rounded-xl" />
          <div className="h-4 w-40 bg-muted rounded-full" />
          <div className="h-10 w-32 bg-muted rounded-xl" />
          <div className="h-24 bg-muted rounded-xl" />
          <div className="flex gap-3 mt-4">
            <div className="flex-1 h-12 bg-muted rounded-xl" />
            <div className="flex-1 h-12 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center' });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading, isError } = useGetProductById(id);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
    return (
      <div className="p-10 text-center font-poppins">
        <p className="text-foreground text-xl font-bold mb-4">Product not found</p>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mx-auto text-primary hover:underline">
          <ArrowLeft size={16} /> Go back
        </button>
      </div>
    );
  }

  const productId = product._id;
  const images = product.images && product.images.length > 0 ? product.images : ["/placeholder.png"];
  const image = images[selectedImageIndex] || images[0];
  const name = product.title || product.name;
  const price = product.price || 0;
  const originalPrice = product.originalPrice || product.discountPrice;
  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;
  const inWishlist = wishlist.includes(productId);
  const inStock = product.stock == null ? true : product.stock > 0;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: `Check out ${name} on SKML Mobiles!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>{name} | SKML Mobiles — Best Price, Fast Delivery</title>
        <meta name="description" content={`Buy ${name} at the best price on SKML Mobiles. Shop now with fast delivery in Yellamanchili, Anakapalli District.`} />
        <meta name="keywords" content={`${name}, buy ${name}, ${name} price, SKML Mobiles, mobiles Yellamanchili`} />
        <link rel="canonical" href={`https://skmlmobiles.com/products/${id || ''}`} />
        <meta property="og:title" content={`${name} | SKML Mobiles`} />
        <meta property="og:description" content={`Buy ${name} at the best price on SKML Mobiles. Fast delivery available.`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://skmlmobiles.com/image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} | SKML Mobiles`} />
        <meta name="twitter:description" content={`Buy ${name} at the best price on SKML Mobiles.`} />
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2 flex items-center justify-center bg-muted rounded-xl p-8 relative">
            <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
              <button
                onClick={() => toggleWishlist(productId)}
                className="p-2.5 bg-background rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform"
                title="Add to Wishlist"
              >
                <Heart size={20} className={inWishlist ? "fill-destructive text-destructive" : "text-muted-foreground"} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 bg-background rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform"
                title="Share Product"
              >
                <Share2 size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            <div 
              className="relative overflow-hidden cursor-zoom-in w-full h-full flex items-center justify-center rounded-xl"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                setZoomStyle({ transformOrigin: `${x}% ${y}%` });
              }}
              onClick={() => setIsFullscreen(true)}
            >
              <img src={image} alt={name}
                className={`w-full max-w-sm object-contain transition-transform duration-200 ease-out ${isZoomed ? 'scale-[2.5]' : 'scale-100'}`}
                style={isZoomed ? zoomStyle : undefined}
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2 px-4 mt-4">
                <div className="bg-background rounded-full p-2 flex gap-2 shadow-md border border-border">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? 'border-primary scale-110' : 'border-transparent hover:border-primary/50'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            {product.brand && (
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full w-fit mb-3">
                {product.brand}
              </span>
            )}
            <h1 className="font-poppins font-bold text-2xl md:text-3xl text-foreground mb-2">{name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={product.rating || 0} reviews={product.numReviews || 0} />
              <span className={`text-sm font-medium px-2 py-0.5 rounded border ${inStock ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-destructive bg-destructive/10 border-destructive/20'}`}>
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <p className="font-poppins font-bold text-3xl text-foreground">₹{price.toLocaleString()}</p>
              {originalPrice && originalPrice > price && (
                <>
                  <p className="text-sm text-muted-foreground line-through mb-1">₹{originalPrice.toLocaleString()}</p>
                  {discount && <p className="text-sm font-bold text-green-600 mb-1">{discount}% OFF</p>}
                </>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">{product.description}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={() => addToCart(product)}
                disabled={!inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-[#E1ECEE] text-[#0A2E36] font-bold py-3.5 rounded-xl hover:bg-[#C8DDE1] transition-colors disabled:opacity-50"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button
                onClick={() => { addToCart(product); navigate("/checkout"); }}
                disabled={!inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-[#FF7A00] text-white font-bold py-3.5 rounded-xl hover:bg-[#e06c00] transition-colors shadow-lg shadow-[#FF7A00]/20 disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        >
          <button 
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
          >
            <X size={28} />
          </button>
          
          <div className="flex-1 flex items-center justify-center w-full max-h-[80vh]">
            <img 
              src={image} 
              alt={name} 
              className="max-w-full max-h-full object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
            />
          </div>

          {images.length > 1 && (
            <div className="mt-6 flex gap-4 overflow-x-auto p-4" onClick={e => e.stopPropagation()}>
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImageIndex === idx ? 'border-primary opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover bg-white" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

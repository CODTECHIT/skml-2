import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { AddressForm } from "../components/checkout/AddressForm";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { TRENDING, TOP_PICKS } from "../data/products";

export function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  const allProducts = [...TRENDING, ...TOP_PICKS];
  const subtotal = cartItems.reduce((acc, item) => {
    const product = allProducts.find((p) => p.id === item.id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);
  
  const deliveryCharge = subtotal > 0 ? 50 : 0;

  const handlePlaceOrder = () => {
    // In a real app, send data to API
    clearCart();
    navigate("/orders");
  };

  return (
    <>
      <Helmet>
        <title>Checkout | SKML Mobiles</title>
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="font-poppins font-bold text-2xl text-foreground mb-6">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <AddressForm />
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-poppins font-bold text-foreground text-lg mb-2">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-4 h-4 text-primary" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="w-4 h-4 text-primary" />
                  <span className="font-medium">Online Payment (Razorpay)</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="lg:w-[380px]">
            <OrderSummary subtotal={subtotal} deliveryCharge={deliveryCharge} />
            <button 
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className="mt-4 w-full flex justify-center bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

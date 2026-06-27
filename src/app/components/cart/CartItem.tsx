import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { Product } from "../../types/product";

export function CartItem({ item, product }: { item: { id: string; quantity: number }; product: Product }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm font-poppins">
      <div className="w-24 h-24 bg-muted rounded-xl p-2 flex-shrink-0">
        <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground text-sm line-clamp-2">{product.name}</h3>
          <p className="text-primary font-bold mt-1">₹{product.price.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 bg-muted px-2 py-1 rounded-full border border-border">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
              <Minus size={14} />
            </button>
            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
              <Plus size={14} />
            </button>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 bg-muted rounded-full">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

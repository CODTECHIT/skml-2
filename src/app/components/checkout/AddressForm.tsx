export function AddressForm() {
  return (
    <div className="space-y-4">
      <h3 className="font-poppins font-bold text-foreground text-lg mb-2">Shipping Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input type="text" className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your name" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input type="tel" className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter phone number" />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-foreground">Address</label>
          <input type="text" className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Street, house number" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">City</label>
          <input type="text" className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="City" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">State</label>
          <input type="text" className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="State" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Pincode</label>
          <input type="text" className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Pincode" />
        </div>
      </div>
    </div>
  );
}

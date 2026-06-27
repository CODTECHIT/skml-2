import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface AddressData {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressFormProps {
  address: AddressData;
  onChange: (field: keyof AddressData, value: string) => void;
  errors?: Partial<Record<keyof AddressData, string>>;
}

export function AddressForm({ address, onChange, errors }: AddressFormProps) {
  const [detecting, setDetecting] = useState(false);

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by your browser");
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.address) {
            const addr = data.address;
            
            // Format a clean street address
            const road = addr.road || "";
            const neighborhood = addr.neighbourhood || addr.suburb || "";
            const streetVal = [road, neighborhood].filter(Boolean).join(", ");
            
            const cityVal = addr.city || addr.town || addr.village || addr.county || "";
            const stateVal = addr.state || "";
            const zipVal = addr.postcode || "";

            if (streetVal) onChange("street", streetVal);
            if (cityVal) onChange("city", cityVal);
            if (stateVal) onChange("state", stateVal);
            if (zipVal) onChange("zipCode", zipVal);

            toast.success("Location auto-detected successfully!");
          } else {
            toast.error("Failed to parse address details.");
          }
        } catch (err) {
          toast.error("Error geocoding location.");
        } finally {
          setDetecting(false);
        }
      },
      (error) => {
        let errorMsg = "Location access denied or timed out.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Please enable location services in your browser.";
        }
        toast.error(errorMsg);
        setDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="space-y-4 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <h3 className="font-bold text-foreground text-lg">Shipping Address</h3>
        <button
          type="button"
          onClick={handleAutoDetect}
          disabled={detecting}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-xl px-3.5 py-2 hover:bg-primary hover:text-white transition-all w-fit disabled:opacity-50 active:scale-[0.97]"
        >
          {detecting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <MapPin size={13} />
              Auto-Detect Location
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input
            type="text"
            value={address.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 bg-background text-foreground ${
              errors?.fullName ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
            }`}
            placeholder="Enter your name"
            required
          />
          {errors?.fullName && <p className="text-xs font-semibold text-destructive mt-1">{errors.fullName}</p>}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input
            type="tel"
            value={address.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 bg-background text-foreground ${
              errors?.phone ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
            }`}
            placeholder="Enter 10-digit number"
            required
          />
          {errors?.phone && <p className="text-xs font-semibold text-destructive mt-1">{errors.phone}</p>}
        </div>

        {/* Address (Street) */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-foreground">Address</label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => onChange("street", e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 bg-background text-foreground ${
              errors?.street ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
            }`}
            placeholder="Street, house number"
            required
          />
          {errors?.street && <p className="text-xs font-semibold text-destructive mt-1">{errors.street}</p>}
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">City</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 bg-background text-foreground ${
              errors?.city ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
            }`}
            placeholder="City"
            required
          />
          {errors?.city && <p className="text-xs font-semibold text-destructive mt-1">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">State</label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => onChange("state", e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 bg-background text-foreground ${
              errors?.state ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
            }`}
            placeholder="State"
            required
          />
          {errors?.state && <p className="text-xs font-semibold text-destructive mt-1">{errors.state}</p>}
        </div>

        {/* Pincode */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Pincode</label>
          <input
            type="text"
            value={address.zipCode}
            onChange={(e) => onChange("zipCode", e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 bg-background text-foreground ${
              errors?.zipCode ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
            }`}
            placeholder="Pincode"
            required
          />
          {errors?.zipCode && <p className="text-xs font-semibold text-destructive mt-1">{errors.zipCode}</p>}
        </div>
      </div>
    </div>
  );
}

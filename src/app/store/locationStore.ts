import { create } from "zustand";

type LocationState = {
  location: string | null;
  isLoading: boolean;
  error: string | null;
  setLocation: (location: string) => void;
  requestLocation: () => Promise<void>;
  clearError: () => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  isLoading: false,
  error: null,

  setLocation: (location) => set({ location, error: null }),

  clearError: () => set({ error: null }),

  requestLocation: async () => {
    set({ isLoading: true, error: null });

    if (!navigator.geolocation) {
      set({ 
        isLoading: false, 
        error: "Geolocation not supported by your browser" 
      });
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      // Try to get a human-readable address using reverse geocoding
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        
        let locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        
        if (data.display_name) {
          const parts = data.display_name.split(',').slice(0, 3);
          locationName = parts.join(', ');
        }

        set({ location: locationName, isLoading: false });
      } catch {
        // Fallback to coordinates if reverse geocoding fails
        set({ 
          location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, 
          isLoading: false 
        });
      }
    } catch (error) {
      let errorMessage = "Failed to get location";
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

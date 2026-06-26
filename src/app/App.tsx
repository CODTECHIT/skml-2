import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { QueryProvider } from "./providers/QueryProvider";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  return (
    <HelmetProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </HelmetProvider>
  );
}

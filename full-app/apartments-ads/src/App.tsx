import { ApartmentAds } from "./Pages/ApartmentAds";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import { useState } from "react";

const client = new QueryClient();

function App() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <ApartmentAds />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;

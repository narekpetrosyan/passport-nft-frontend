import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig";
import { Hero } from "./sections/Hero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Form } from "./sections/Form";
import { Footer } from "./sections/Footer";

export const queryClient = new QueryClient();

export const App = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Hero />
        <Form />
        <Footer />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

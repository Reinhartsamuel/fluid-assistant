import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  abstractTestnet,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'blocktix',
    projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID!,
    chains: [mainnet, polygon, optimism, arbitrum, base, abstractTestnet],
    // ssr: true, // If your dApp uses server side rendering (SSR)
  });


  const queryClient = new QueryClient();

const WalletContextProvider = ({children} : {children: React.ReactNode}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletContextProvider;
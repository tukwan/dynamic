"use client"

import {
  DynamicContextProvider,
  LocaleResource,
} from "@dynamic-labs/sdk-react-core"
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import { SolanaWalletConnectors } from "@dynamic-labs/solana"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector"
import { config } from "@/lib/wagmi"

const locale: LocaleResource = {
  en: {
    dyn_widget: {
      other_wallets: "OTHER WALLETS",
    },
    dyn_login: {
      title: {
        all_wallet_list: "ALL WALLETS",
      },
    },
  },
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ""

  return (
    <DynamicContextProvider
      theme="auto"
      settings={{
        environmentId: projectId,
        walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
        initialAuthenticationMode: "connect-only",
        // termsOfServiceUrl: "test",
        appName: "Dapp",
        // policiesConsentInnerComponent: (
        //   <div>
        //     <p>
        //       By checking this box, you agree to our{" "}
        //       <a
        //         href="https://www.dynamic.xyz/terms-of-service"
        //         target="_blank"
        //       >
        //         Terms of Service
        //       </a>{" "}
        //       and{" "}
        //       <a href="https://www.dynamic.xyz/privacy-policy" target="_blank">
        //         Privacy Policy
        //       </a>
        //       .
        //     </p>
        //   </div>
        // ),

        // overrides: {
        //   views: [
        //     {
        //       type: 'wallet-list',
        //       tabs: {
        //         items: [
        //           {
        //             label: { text: 'My own tab' },
        //           }
        //         ]
        //       }
        //     }
        //   ]
        // }
      }}
      locale={locale}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}

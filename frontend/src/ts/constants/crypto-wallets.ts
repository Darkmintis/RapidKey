export interface CryptoWallet {
    name: string;
    symbol: string;
    address: string;
    icon: string; // FontAwesome icon class
    network?: string; // Optional network specification (e.g., "ERC-20" for USDT)
}

/**
 * Sample cryptocurrency wallet addresses for donations.
 * These are test addresses - replace with real wallet addresses in production.
 */
export const CRYPTO_WALLETS: CryptoWallet[] = [
    {
        name: "Bitcoin",
        symbol: "BTC",
        address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        icon: "fab fa-bitcoin",
    },
    {
        name: "Ethereum",
        symbol: "ETH",
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        icon: "fab fa-ethereum",
    },
    {
        name: "Tether",
        symbol: "USDT",
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        icon: "fas fa-dollar-sign",
        network: "ERC-20",
    },
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        icon: "fas fa-coins",
        network: "ERC-20",
    },
];

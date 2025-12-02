import AnimatedModal from "../utils/animated-modal";
import * as Commandline from "../commandline/commandline";
import * as Notifications from "../elements/notifications";
import QRCode from "qrcode";
import { CRYPTO_WALLETS, CryptoWallet } from "../constants/crypto-wallets";

async function generateQRCode(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 200,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return "";
  }
}

function createWalletCard(wallet: CryptoWallet, qrCodeDataUrl: string): string {
  const networkLabel = wallet.network ? `<span class="network">${wallet.network}</span>` : "";

  return `
    <div class="walletCard" data-symbol="${wallet.symbol}">
      <div class="walletHeader">
        <i class="${wallet.icon}"></i>
        <div class="walletName">
          <span class="name">${wallet.name}</span>
          <span class="symbol">${wallet.symbol}</span>
          ${networkLabel}
        </div>
      </div>
      <div class="qrCode">
        <img src="${qrCodeDataUrl}" alt="${wallet.symbol} QR Code" />
      </div>
      <div class="walletAddress">
        <input type="text" readonly value="${wallet.address}" />
        <button class="copyButton" data-address="${wallet.address}" aria-label="Copy address">
          <i class="fas fa-copy"></i>
        </button>
      </div>
    </div>
  `;
}

async function setupCryptoWallets(modalEl: HTMLElement): Promise<void> {
  const walletsContainer = modalEl.querySelector(".cryptoWallets");
  if (!walletsContainer) return;

  // Generate QR codes and create wallet cards
  const walletCardsPromises = CRYPTO_WALLETS.map(async (wallet) => {
    const qrCodeDataUrl = await generateQRCode(wallet.address);
    return createWalletCard(wallet, qrCodeDataUrl);
  });

  const walletCards = await Promise.all(walletCardsPromises);
  walletsContainer.innerHTML = walletCards.join("");

  // Add copy button event listeners
  const copyButtons = modalEl.querySelectorAll(".copyButton");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const address = (button as HTMLElement).dataset["address"];
      if (!address) return;

      try {
        await navigator.clipboard.writeText(address);
        Notifications.add("Address copied to clipboard!", 1, {
          duration: 2,
        });
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        Notifications.add("Failed to copy address", -1);
      }
    });
  });
}

export function show(): void {
  void modal.show();
}

const modal = new AnimatedModal({
  dialogId: "supportModal",
  setup: async (modalEl): Promise<void> => {
    modalEl.querySelector("button.ads")?.addEventListener("click", async () => {
      Commandline.show(
        { subgroupOverride: "enableAds" },
        {
          modalChain: modal,
        }
      );
    });

    // Setup crypto wallets
    await setupCryptoWallets(modalEl);
  },
});

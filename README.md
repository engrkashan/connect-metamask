# Wealth Portal: Institutional Treasury Dashboard

A premium, institutional-grade digital asset deployment platform designed for high-net-worth individuals and corporate treasury managers. This portal provides a secure, streamlined interface for deploying $1M+ capital directly into digital assets using corporate infrastructure.

## 💎 Key Features

- **Institutional Dashboard**: Real-time visibility into treasury balances, portfolio statistics, and deployment activity.
- **Direct $1M+ Deployments**: Specialized pipelines for high-value transactions that bypass retail limits.
  - **Stripe Corporate**: Embedded high-limit card processing for 7-figure deployments.
  - **Direct Bank Link**: $0-fee institutional bank pulls powered by Circle & Plaid.
- **Wealth Portfolio Aesthetic**: A "Wealth Portal" UI featuring glassmorphism, dynamic gradients, and institutional branding.
- **Privacy-Forward Architecture**: Guidance and implementation patterns for using corporate wrappers (Cayman/Panama Foundations) to maintain investor privacy.
- **Web3 Native**: Seamless MetaMask integration with real-time balance tracking via `@usedapp`.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Chakra UI
- **Fiat-to-Asset**: Stripe (High-Limit), Circle (Direct Bank), Transak (Retail)
- **Web3 Infrastructure**: `@usedapp/core`, Ethers.js, MetaMask
- **Styling**: Vanilla CSS + Chakra UI (Premium Glassmorphism tokens)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MetaMask browser extension
- Stripe Public API Key (for Corporate Card demo)

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd connect-metamask
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment (Optional for Demo):
   The demo uses a pre-configured Stripe test key. For production use, update the `stripePromise` in `App.tsx`.

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/src/components`: The core UI components.
  - `DashboardLayout.tsx`: Main dashboard structural wrapper with Sidebar.
  - `InvestPage.tsx`: Full-page institutional deployment center ($1M+).
  - `DashboardOverview.tsx`: Portfolio visibility and activity tracking.
  - `StripeCorporateCheckout.tsx`: Secure high-limit card entry.
- `/src/App.tsx`: Navigation router and global provider state.

## 📜 Strategic Documentation

Detailed technical and strategic advice can be found in the [Strategic Advice Artifact](file:///C:/Users/User/.gemini/antigravity/brain/b36205fb-3ad4-4469-922a-b816187ddf6f/HighValueTransactionAdvice.md), covering:

- Fee optimization for $1M+ transactions.
- Corporate entity KYC structures.
- On-platform vs. Manual Wire trade-offs.

## ⚖️ License

Created by **Kashif Bin Umer**. Private/Institutional use only.

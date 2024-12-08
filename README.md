# Telegram Mini App with Payment Enabled by Social SBT on TON

This repository provides a template for building a **Telegram Mini App** with **payment integration** using **Social Bound Identity Tokens (SBTID)** on the TON blockchain. It demonstrates how Telegram admins can integrate a secure and innovative payment system into their mini apps, enabling users to mint unique SBT tokens and verify payments with their Telegram ID.

---

## Key Benefits

- **Seamless Payment Integration**: Uses the TON blockchain to process payments via SBTID tokens.
- **Telegram User Authentication**: Automatically verifies user identity using Telegram WebApp.
- **Secure and Transparent**: All transactions are recorded on the blockchain, ensuring trust and accountability.
- **Customizable Template**: Easily adapt this template to create mini apps with paid features, such as subscriptions or exclusive content.
- **End-to-End Example**: From user authentication to payment verification, this app includes everything you need to get started.

---

## Prerequisites

1. **Deploy Your SBTID Collection**  
   Visit the [SBTID Platform](https://sbtid.nikandr.com) to deploy your SBTID collection. Follow these steps:
   - Go to Deploy page.
   - Connect your TON wallet.
   - Fill in the required collection metadata.
   - Deploy the smart contract.
   - Copy the **smart contract address** once the deployment is successful.

2. **Set Up a Telegram Bot**  
   Create a Telegram bot using [BotFather](https://t.me/BotFather) and obtain the bot token.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nikandr-surkov/Telegram-MiniApp-SBTID-Payment-TON.git
cd Telegram-MiniApp-SBTID-Payment-TON
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

> **Note**: Local `.env` variables are not required as this app only works within the Telegram ecosystem.

---

## Deployment

### 1. Push to GitHub

Ensure your changes are pushed to the GitHub repository:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Log in to [Vercel](https://vercel.com/) and import your GitHub repository.
2. During the setup process, add the required environment variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: The address of your deployed SBTID smart contract.
   - `BOT_TOKEN`: The Telegram bot token.
3. Complete the deployment setup.

> **Important**: If you update environment variables later, make sure to **redeploy the app manually**. Vercel does not automatically redeploy on environment variable changes.

### 3. Connect the App to Telegram

After deploying the Vercel app:

1. Open [BotFather](https://t.me/BotFather) on Telegram.
2. Select the bot you created earlier and choose **Create New Telegram App**.
3. Provide the required details:
   - **App Name**: Enter a name for your mini app.
   - **App URL**: Provide the URL of your deployed Vercel app (e.g., `https://your-vercel-app.vercel.app`).
4. Save the configuration to finalize the connection.

---

## How It Works

1. **User Authentication**: Telegram WebApp authenticates the user and retrieves their Telegram ID.
2. **Generate Payment Link**: The app generates a payment link pointing to the SBTID minting page for the user.
3. **Mint SBT**: Users mint the SBT by connecting their TON wallet and completing the transaction.
4. **Verify Payment**: After minting, users return to the mini app to verify their payment and access premium features.

---

## Examples of Use Cases

- **Exclusive Content**: Offer premium access to Telegram group resources or digital goods.
- **Subscription Payments**: Set up subscription models using non-transferable SBT tokens.
- **Event Tickets**: Manage ticket sales for events hosted on Telegram.

---

## Troubleshooting

1. **Why can't I access the app locally?**  
   This mini app only works inside the Telegram ecosystem. Ensure you are accessing it via your configured Telegram bot.

2. **My changes to environment variables aren’t applied.**  
   Push updates to your GitHub repository and **redeploy manually** via the Vercel dashboard.

---

## Contact

For any inquiries, please contact me:
- Telegram: [@nikandr_s](https://t.me/nikandr_s)
- YouTube: [@NikandrSurkov](https://www.youtube.com/@NikandrSurkov)
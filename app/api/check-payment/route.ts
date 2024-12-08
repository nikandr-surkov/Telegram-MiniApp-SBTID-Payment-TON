import { NextResponse } from 'next/server';
import { Address } from '@ton/core';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, Contract, ContractProvider } from '@ton/ton';
import crypto from 'crypto';

// Minimal NFT Collection contract interface
class NftCollection implements Contract {
    readonly address: Address;

    constructor(address: Address) {
        this.address = address;
    }

    static create(address: Address): NftCollection {
        return new NftCollection(address);
    }

    async getGetNftAddressByIndex(provider: ContractProvider, itemIndex: bigint): Promise<Address | null> {
        const { stack } = await provider.get("get_nft_address_by_index", [{ type: "int", value: itemIndex }]);
        return stack.readAddressOpt();
    }
}

// Function to validate Telegram WebApp authentication
function validateTelegramWebAppData(initData: string): { isValid: boolean; userId?: number } {
    try {
        const BOT_TOKEN = process.env.BOT_TOKEN;
        if (!BOT_TOKEN) {
            throw new Error('BOT_TOKEN not configured');
        }

        const params = new URLSearchParams(initData);
        const hash = params.get('hash');
        params.delete('hash');

        const paramArray = Array.from(params.entries());
        paramArray.sort(([a], [b]) => a.localeCompare(b));

        const dataCheckString = paramArray
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        const secretKey = crypto
            .createHmac('sha256', 'WebAppData')
            .update(BOT_TOKEN)
            .digest();

        const calculatedHash = crypto
            .createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex');

        if (hash !== calculatedHash) {
            return { isValid: false };
        }

        const userData = JSON.parse(params.get('user') || '{}');

        return {
            isValid: true,
            userId: userData.id
        };
    } catch (error) {
        console.error('Error validating Telegram data:', error);
        return { isValid: false };
    }
}

export async function POST(request: Request) {
    try {
        const { initData } = await request.json();
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

        if (!contractAddress) {
            throw new Error('Contract address not configured');
        }

        // Validate Telegram WebApp data
        const validation = validateTelegramWebAppData(initData);
        if (!validation.isValid || !validation.userId) {
            return NextResponse.json({
                success: false,
                message: 'Invalid authentication data'
            }, { status: 401 });
        }

        const socialId = validation.userId.toString();

        // Connect to TON
        const endpoint = await getHttpEndpoint({ network: 'mainnet' });
        const client = new TonClient({ endpoint });

        // Create contract instance
        const nftCollection = NftCollection.create(Address.parse(contractAddress));
        const contract = client.open(nftCollection);

        // Get NFT address
        const nftAddress = await contract.getGetNftAddressByIndex(BigInt(socialId));

        if (!nftAddress) {
            return NextResponse.json({
                success: false,
                message: 'Contract check issue'
            });
        }

        const isContractDeployed = await client.isContractDeployed(nftAddress);

        if (!isContractDeployed) {
            return NextResponse.json({
                success: false,
                message: 'Payment not found'
            });
        }

        // If we found the NFT, it means the payment was successful
        return NextResponse.json({
            success: true,
            message: 'Payment confirmed! You can get your ice cream now!',
            data: {
                exists: true,
                nftAddress: nftAddress.toString()
            }
        });

    } catch (error) {
        console.error('Error checking payment:', error);
        return NextResponse.json({
            success: false,
            message: 'Error checking payment status'
        }, { status: 500 });
    }
}
'use client';

import { useState, useEffect } from 'react';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export default function Home() {
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user?.id) {
        setUserId(user.id);
      }
    }
    setIsLoading(false);
  }, []);

  const paymentLink = userId
    ? `https://sbtid.nikandr.com/collection?contract=${CONTRACT_ADDRESS}&socialId=${userId}`
    : null;

  const checkPayment = async () => {
    if (!window.Telegram?.WebApp) {
      setMessage('Telegram WebApp not available');
      setIsSuccess(false);
      return;
    }

    setIsChecking(true);
    setMessage('');

    try {
      const response = await fetch('/api/check-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initData,
        }),
      });

      const data = await response.json();
      setIsSuccess(data.success);
      setMessage(data.message);
    } catch (error) {
      setIsSuccess(false);
      setMessage('Error checking payment status');
    } finally {
      setIsChecking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0088CC]"></div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">
            This app can only be accessed through Telegram
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1C2B46] mb-4">
            Get Ice Cream 🍦
          </h1>
          <p className="text-gray-600 mb-8">
            Get your delicious ice cream by making a payment with TON blockchain
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#1C2B46]">
              How to get your ice cream:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Click the payment link below</li>
              <li>Connect your TON wallet</li>
              <li>Mint SBT to complete the payment</li>
              <li>Click "Check Payment" button</li>
              <li>Get your ice cream!</li>
            </ol>
          </div>

          {paymentLink && (
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800 font-medium">Payment Link:</p>
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0088CC] hover:text-[#0077B5] text-sm break-all"
              >
                {paymentLink}
              </a>
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-xl ${isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
              {message}
            </div>
          )}

          <button
            onClick={checkPayment}
            disabled={isChecking}
            className="w-full py-4 px-8 rounded-xl font-semibold text-white 
                            bg-gradient-to-r from-[#0088CC] to-[#0077B5] 
                            hover:from-[#0077B5] hover:to-[#006699] 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {isChecking ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Checking Payment...
              </span>
            ) : (
              'Check and Get Ice Cream'
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
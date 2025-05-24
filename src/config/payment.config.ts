
export interface PaymentConfig {
  // API Configuration
  api: {
    baseUrl: string;
    apiKey: string;
    timeout: number;
  };
  
  // Payment Methods
  methods: {
    googlePay: {
      enabled: boolean;
      merchantId?: string;
    };
    applePay: {
      enabled: boolean;
      merchantId?: string;
    };
    paypal: {
      enabled: boolean;
      clientId?: string;
      sandbox?: boolean;
    };
    crypto: {
      enabled: boolean;
      walletAddress?: string;
    };
  };
  
  // UI Configuration
  ui: {
    theme: 'light' | 'dark';
    primaryColor: string;
    showPaymentHistory: boolean;
    anonymous: boolean;
    showShareButton: boolean;
  };
  
  // Security
  security: {
    requireSSL: boolean;
    sessionTimeout: number;
    enableCSRFProtection: boolean;
    rateLimitRequests: number;
  };
}

export const defaultConfig: PaymentConfig = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    apiKey: process.env.REACT_APP_API_KEY || '',
    timeout: 30000,
  },
  methods: {
    googlePay: { enabled: true },
    applePay: { enabled: true },
    paypal: { enabled: true, sandbox: true },
    crypto: { enabled: true },
  },
  ui: {
    theme: 'light',
    primaryColor: '#8B5CF6',
    showPaymentHistory: true,
    anonymous: true,
    showShareButton: true,
  },
  security: {
    requireSSL: true,
    sessionTimeout: 3600000, // 1 hour
    enableCSRFProtection: true,
    rateLimitRequests: 100, // requests per minute
  },
};

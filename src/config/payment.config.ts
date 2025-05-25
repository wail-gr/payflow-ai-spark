
export interface PaymentConfig {
  // API Configuration
  api: {
    baseUrl: string;
    apiKey: string;
    timeout: number;
    useHttps: boolean;
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
  
  // Security Configuration
  security: {
    requireSSL: boolean;
    sessionTimeout: number;
    enableCSRFProtection: boolean;
    enableXSSProtection: boolean;
    rateLimitRequests: number;
    rateLimitWindowMs: number;
    encryptSensitiveData: boolean;
    allowedOrigins: string[];
    secureHeaders: boolean;
  };
}

export const defaultConfig: PaymentConfig = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'https://localhost:3001/api',
    apiKey: process.env.REACT_APP_API_KEY || '',
    timeout: 30000,
    useHttps: true,
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
    enableXSSProtection: true,
    rateLimitRequests: 100, // requests per minute
    rateLimitWindowMs: 60000, // 1 minute window
    encryptSensitiveData: true,
    allowedOrigins: ['https://localhost:3000', 'https://yourdomain.com'],
    secureHeaders: true,
  },
};

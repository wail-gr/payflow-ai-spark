
export interface PaymentRequest {
  amount: number;
  currency: string;
  method: 'google-pay' | 'apple-pay' | 'paypal' | 'crypto';
  userId?: string;
  anonymous?: boolean;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message?: string;
  error?: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface DonationRecord {
  id: string;
  userId?: string;
  amount: number;
  currency: string;
  method: string;
  transactionId: string;
  anonymous: boolean;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  metadata?: Record<string, any>;
}

export class PaymentAPI {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Payment methods
  async processPayment(payment: PaymentRequest): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }

  async getPaymentStatus(transactionId: string): Promise<DonationRecord> {
    return this.request<DonationRecord>(`/payments/${transactionId}`);
  }

  // User authentication
  async loginUser(email: string, password: string): Promise<{ user: UserData; token: string }> {
    return this.request<{ user: UserData; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async registerUser(email: string, password: string, name: string): Promise<{ user: UserData; token: string }> {
    return this.request<{ user: UserData; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  // Donation history
  async getUserDonations(userId: string): Promise<DonationRecord[]> {
    return this.request<DonationRecord[]>(`/users/${userId}/donations`);
  }

  async getDonationStats(userId?: string): Promise<{ total: number; count: number }> {
    const endpoint = userId ? `/users/${userId}/stats` : '/donations/stats';
    return this.request<{ total: number; count: number }>(endpoint);
  }
}

// Factory function for easy integration
export const createPaymentAPI = (config: { baseUrl: string; apiKey: string }) => {
  return new PaymentAPI(config.baseUrl, config.apiKey);
};

// Webhook payload types for backend integration
export interface PaymentWebhook {
  event: 'payment.completed' | 'payment.failed' | 'user.registered';
  data: DonationRecord | UserData;
  timestamp: string;
}

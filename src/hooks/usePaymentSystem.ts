
import { usePayment } from '../components/PaymentSystem/PaymentContext';
import { PaymentAPI, PaymentRequest, PaymentResponse } from '../services/PaymentAPI';
import { PaymentConfig } from '../config/payment.config';

export interface UsePaymentSystemOptions {
  config: PaymentConfig;
  onPaymentSuccess?: (response: PaymentResponse) => void;
  onPaymentError?: (error: Error) => void;
  onUserLogin?: (user: any) => void;
}

export const usePaymentSystem = (options: UsePaymentSystemOptions) => {
  const paymentContext = usePayment();
  const api = new PaymentAPI(options.config.api.baseUrl, options.config.api.apiKey);

  const processPayment = async (paymentData: Omit<PaymentRequest, 'method'>) => {
    try {
      if (!paymentContext.selectedPaymentMethod) {
        throw new Error('No payment method selected');
      }

      const request: PaymentRequest = {
        ...paymentData,
        method: paymentContext.selectedPaymentMethod,
        userId: paymentContext.user?.id,
        anonymous: paymentContext.donateAnonymously,
      };

      paymentContext.setProcessing(true);
      const response = await api.processPayment(request);
      
      if (response.success) {
        paymentContext.completeTransaction();
        options.onPaymentSuccess?.(response);
      } else {
        throw new Error(response.error || 'Payment failed');
      }

      return response;
    } catch (error) {
      options.onPaymentError?.(error as Error);
      throw error;
    } finally {
      paymentContext.setProcessing(false);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await api.loginUser(email, password);
      options.onUserLogin?.(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    ...paymentContext,
    processPayment,
    loginUser,
    api,
  };
};

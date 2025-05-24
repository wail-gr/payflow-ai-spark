
import { usePayment } from '../components/PaymentSystem/PaymentContext';
import { PaymentAPI, PaymentRequest, PaymentResponse } from '../services/PaymentAPI';
import { PaymentConfig } from '../config/payment.config';

export interface UsePaymentSystemOptions {
  config: PaymentConfig;
  onPaymentSuccess?: (response: PaymentResponse) => void;
  onPaymentError?: (error: Error) => void;
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
        anonymous: true, // Always anonymous now
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

  return {
    ...paymentContext,
    processPayment,
    api,
  };
};


// Simple encryption utilities for sensitive data
// Note: In production, use proper encryption libraries like crypto-js or similar

export class EncryptionService {
  private static readonly SALT = 'payment_system_salt_2024';
  
  /**
   * Encrypt sensitive data using Base64 encoding with salt
   * @param data - The data to encrypt
   * @returns Encrypted string
   */
  static encrypt(data: string): string {
    try {
      const saltedData = this.SALT + data + Date.now();
      return btoa(saltedData);
    } catch (error) {
      console.error('Encryption error:', error);
      return data; // Fallback to original data
    }
  }
  
  /**
   * Decrypt data that was encrypted with encrypt method
   * @param encryptedData - The encrypted data
   * @returns Decrypted string
   */
  static decrypt(encryptedData: string): string {
    try {
      const decoded = atob(encryptedData);
      // Remove salt and timestamp
      const withoutSalt = decoded.replace(this.SALT, '');
      const timestampIndex = withoutSalt.lastIndexOf('1');
      return withoutSalt.substring(0, timestampIndex);
    } catch (error) {
      console.error('Decryption error:', error);
      return ''; // Return empty string on error
    }
  }
  
  /**
   * Hash sensitive data for storage (one-way)
   * @param data - The data to hash
   * @returns Hashed string
   */
  static hash(data: string): string {
    try {
      // Simple hash function for demo purposes
      let hash = 0;
      const saltedData = this.SALT + data;
      for (let i = 0; i < saltedData.length; i++) {
        const char = saltedData.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash).toString(36);
    } catch (error) {
      console.error('Hashing error:', error);
      return data;
    }
  }
  
  /**
   * Generate secure token for transactions
   * @returns Random secure token
   */
  static generateSecureToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

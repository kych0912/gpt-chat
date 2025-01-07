import crypto from 'crypto';
import get32ByteKey from '@/app/util/get32ByteKey';

export default function decryptApiKey(encryptedData: string): string {
    const [ivHex, authTagHex, encryptedHex] = encryptedData.split(':');
    
    const ENCRYPTION_KEY = get32ByteKey(process.env.ENCRYPTION_KEY!);
  
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY), iv);
    decipher.setAuthTag(authTag);
    
    const decrypted = decipher.update(encrypted) + decipher.final('utf8');
    
    return decrypted;
  };
import crypto from 'crypto';

export default function get32ByteKey(key: string) {
    if (!key) throw new Error('ENCRYPTION_KEY is not defined');
    
    // 키를 해시하여 32바이트 길이로 만듦
    return crypto.createHash('sha256').update(key).digest();
};
  
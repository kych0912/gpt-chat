import { NextResponse } from 'next/server';
import crypto from 'crypto';
import get32ByteKey from '@/app/util/get32ByteKey';


const IV_LENGTH = 16;

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();
    
    // 32바이트 키 생성
    const ENCRYPTION_KEY = get32ByteKey(process.env.ENCRYPTION_KEY!);
    
    // 암호화
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
    
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    
    // 암호화된 키, IV, authTag를 함께 저장
    const encryptedData = `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    
    return NextResponse.json({ encryptedKey: encryptedData });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json({ error: 'Encryption failed' }, { status: 500 });
  }
} 
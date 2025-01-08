interface EncryptKeyResponse {
    encryptedKey: string;
  }

export default async function encryptKey(apiKey: string): Promise<EncryptKeyResponse> {
    const response = await fetch('/api/encrypt-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });
  
    if (!response.ok) {
      throw new Error('API 키 암호화에 실패했습니다');
    }
  
    return response.json();
  };
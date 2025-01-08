interface ValidateKeyResponse {
    success: boolean;
  }
  
  export default async function validateKey(apiKey: string): Promise<ValidateKeyResponse> {
    const response = await fetch('/api/validate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });
  
    if (!response.ok) {
      throw new Error('API 키 검증에 실패했습니다');
    }
  
    return response.json();
  };
  
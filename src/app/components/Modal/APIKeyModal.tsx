'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import * as S from './modal.styles';

interface EncryptKeyResponse {
  encryptedKey: string;
}

interface ValidateKeyResponse {
  success: boolean;
}

const validateKey = async (apiKey: string): Promise<ValidateKeyResponse> => {
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

const encryptKey = async (apiKey: string): Promise<EncryptKeyResponse> => {
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

export default function APIKeyModal() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  // API 키 검증 mutation
  const validateMutation = useMutation({
    mutationFn: validateKey,
    onSuccess: async () => {
      // 검증 성공 시 암호화 mutation 실행
      await encryptMutation.mutateAsync(apiKey);
    },
  });

  // API 키 암호화 mutation
  const encryptMutation = useMutation({
    mutationFn: encryptKey,
    onSuccess: (data) => {
      // 암호화된 키를 세션 스토리지에 저장
      sessionStorage.setItem('encrypted-api-key', data.encryptedKey);
      router.push('/chat');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    try {
      await validateMutation.mutateAsync(apiKey);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 에러 상태 계산
  const error = validateMutation.error || encryptMutation.error;
  // 로딩 상태 계산
  const isLoading = validateMutation.isPending || encryptMutation.isPending;

  return (
    <S.ModalContainer>
      <S.Title>API 키 입력</S.Title>
      <S.Description>
        OpenAI API 키를 입력해주세요. API 키는{' '}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
        >
          여기서
        </a>{' '}
        얻을 수 있습니다.
      </S.Description>
      
      <form onSubmit={handleSubmit}>
        <S.Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          required
          disabled={isLoading}
        />
        
        {error && (
          <S.ErrorMessage>
            {error instanceof Error ? error.message : '오류가 발생했습니다'}
          </S.ErrorMessage>
        )}
        
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : '시작하기'}
        </S.SubmitButton>
      </form>
    </S.ModalContainer>
  );
}
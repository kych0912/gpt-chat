'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const ModalContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-bottom: 1rem;
  color: #4b5563;
  
  a {
    color: #3b82f6;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export default function APIKeyModal() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateAPIKey = async (key: string) => {
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: key }),
      });

      if (!response.ok) throw new Error('잘못된 API 키입니다');
      
      localStorage.setItem('gpt-api-key', key);
      router.push('/chat');
    } catch (err) {
      setError('API 키 검증에 실패했습니다');
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    validateAPIKey(apiKey);
  };

  return (
    <ModalContainer>
      <Title>API 키 입력</Title>
      <Description>
        OpenAI API 키를 입력해주세요. API 키는{' '}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
        >
          여기서
        </a>{' '}
        얻을 수 있습니다.
      </Description>
      
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          required
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? '확인 중...' : '시작하기'}
        </SubmitButton>
      </form>
    </ModalContainer>
  );
}
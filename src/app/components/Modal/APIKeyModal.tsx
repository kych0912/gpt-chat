'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from './modal.styles';
import InfoToggle from './InfoToggle';
import RecommendToggle from "./RecommendToggle"
import { useValidateKeyMutation, useEncryptMutation } from '@/app/react-query/mutations/mutations';

export default function APIKeyModal() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  // API 키 검증 mutation
  const validateMutation = useValidateKeyMutation(apiKey);
  const encryptMutationResult = useEncryptMutation();

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
  const error = validateMutation.error || encryptMutationResult.error;
  // 로딩 상태 계산
  const isLoading = validateMutation.isPending || encryptMutationResult.isPending;

  return (
    <S.ModalContainer>
      <S.Title>KeyChat</S.Title>

      <S.DescriptionTitle>
        GPT 사용량 만큼만 결제하세요.
      </S.DescriptionTitle>

      <S.Description>  
        서비스 이용을 위한 개인 번호(API KEY)가 필요합니다.
        <br/>
        개인 번호는{' '}      
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
        >
          여기서
        </a>{' '}
        얻을 수 있으며,{' '} 
        <a
          href="https://platform.openai.com/settings/organization/billing/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          크레딧 충전
        </a>
        이 필요합니다.
      </S.Description>

      
      <S.Description>
        <span style={{ display: 'block', fontWeight:800}}>
          KeyChat은 API 키, 채팅 내역을{' '}
          <strong style={{
            color: '#dc2626',
            fontWeight: '600'
          }}>저장하지 않습니다.</strong>
        </span>
        키는 안전한 곳에 따로 보관해주세요.
      </S.Description>
      
      <form onSubmit={handleSubmit}>
        <S.Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="개인 번호를 입력해주세요."
          required
          disabled={isLoading}
          autoComplete="off"
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
      <InfoToggle />
      <RecommendToggle />
    </S.ModalContainer>
  );
}
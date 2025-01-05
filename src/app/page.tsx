'use client';

import styled from 'styled-components';
import APIKeyModal from '@/app/components/Modal/APIKeyModal';

const MainContainer = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const MainTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export default function Home() {
  return (
    <MainContainer>
      <MainTitle>GPT 채팅 서비스</MainTitle>
      <APIKeyModal />
    </MainContainer>
  );
}

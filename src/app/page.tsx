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


export default function Home() {
  return (
    <MainContainer>
      <APIKeyModal />
    </MainContainer>
  );
}

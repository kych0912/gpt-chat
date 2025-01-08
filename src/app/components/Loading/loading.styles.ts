import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  margin: 1rem 0;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({theme})=>theme.primary};
  border-radius: 50%;
  animation: ${bounce} 0.5s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

export const LoadingText = styled.span`
  color: #64748b;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`; 
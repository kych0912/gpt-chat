import * as S from './loading.styles';

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = '처리 중...' }: LoadingProps) {
  return (
    <S.LoadingContainer>
      <S.Dot />
      <S.Dot />
      <S.Dot />
      <S.LoadingText>{text}</S.LoadingText>
    </S.LoadingContainer>
  );
} 
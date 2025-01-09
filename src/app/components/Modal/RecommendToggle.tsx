import { useState } from "react";
import * as S from "./modal.styles";

export default function InfoToggle() {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <S.InfoToggleContainer>
          <S.InfoToggleButton onClick={() => setIsOpen(!isOpen)}>
            💡 어떤 사람에게 추천하나요? {isOpen ? '▼' : '▶'}
          </S.InfoToggleButton>
          
          {isOpen && (
            <S.InfoContent>
              <p>ChatGPT를 가끔 사용하시는 분들에게 경제적인 선택이 될 거예요!</p>
            <ul>
              <li>• 20$는 GPT-3.5로 약 2000개 질문이 가능해요.</li>
              <li>• GPT-4, GPT-o1-mini 모델도 사용할 수 있어요!</li>
            </ul>
          </S.InfoContent>
        )}
      </S.InfoToggleContainer>
    );
  };
  
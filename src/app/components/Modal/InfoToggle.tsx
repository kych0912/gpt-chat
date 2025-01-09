import { useState } from "react";
import * as S from "./modal.styles";

export default function InfoToggle() {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <S.InfoToggleContainer>
        <S.InfoToggleButton onClick={() => setIsOpen(!isOpen)}>
          💡 ChatGPT Plus 구독이 필요한가요? {isOpen ? '▼' : '▶'}
        </S.InfoToggleButton>
        
        {isOpen && (
          <S.InfoContent>
            <p>아니요, ChatGPT Plus 구독은 필요하지 않아요!</p>
            <ul>
              <li>• OpenAI API는 별도의 서비스에요.</li>
              <li>• 크레딧을 충전한 후 API 사용량만큼만 지불하면 됩니다</li>
            </ul>
          </S.InfoContent>
        )}
      </S.InfoToggleContainer>
    );
  };
  
import { useMutation } from '@tanstack/react-query';
import validateKey from '@/app/util/validateKey';
import encryptKey from '@/app/util/encrypApiKey';
import { useRouter } from 'next/navigation';

  // API 키 암호화 mutation
  export const encryptMutation = () =>{
    const router = useRouter();
    return(
        useMutation({
            mutationFn: encryptKey,
            onSuccess: (data) => {
                // 암호화된 키를 세션 스토리지에 저장
                sessionStorage.setItem('encrypted-api-key', data.encryptedKey);
                router.push('/chat');
            },  
        })
    );
}


export const validateKeyMutation = (apiKey: string) => {
    const encrypt = encryptMutation();
    
    return useMutation({
        mutationFn: validateKey,
        onSuccess: async () => {
            // 검증 성공 시 암호화 mutation 실행
            await encrypt.mutateAsync(apiKey);
        },
    });
}

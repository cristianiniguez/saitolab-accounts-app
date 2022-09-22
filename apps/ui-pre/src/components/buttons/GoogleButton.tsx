import { FC } from 'react';
// components
import { Button } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
// hooks
import { useAuth } from 'reactfire';
// utils
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';

const provider = new GoogleAuthProvider();

type GoogleButtonProps = {
  label: string;
  onError: (error: unknown) => void;
  onSuccess: (result: UserCredential) => void;
};

const GoogleButton: FC<GoogleButtonProps> = ({ label, onError, onSuccess }) => {
  const auth = useAuth();

  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onSuccess(result);
    } catch (e) {
      console.error(e);
      onError(e);
    }
  };

  return (
    <Button
      color='white'
      colorScheme='red'
      leftIcon={<FaGoogle />}
      onClick={handleClick}
      type='button'
    >
      {label}
    </Button>
  );
};

export default GoogleButton;

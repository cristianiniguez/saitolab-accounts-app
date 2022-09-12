import { useToast, UseToastOptions } from '@chakra-ui/react';

const useAppToast = () => {
  const toast = useToast();
  return (args: Pick<UseToastOptions, 'description' | 'title' | 'status'>) =>
    toast({ ...args, duration: 5000, isClosable: true });
};

export default useAppToast;

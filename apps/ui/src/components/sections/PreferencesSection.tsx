import useFormatMessage from '@/hooks/useFormatMessage';
import { Box, Button, Container, Divider, Flex, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import { FaPencilAlt } from 'react-icons/fa';
import PreferencesForm from '../forms/PreferencesForm';

const PreferencesSection = () => {
  const t = useFormatMessage();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as='section'>
      <Container maxW='container.xl' py={4}>
        <VStack alignItems='stretch' divider={<Divider />} spacing={4}>
          <Flex alignItems='flex-end' justifyContent='space-between'>
            <Heading fontSize='lg'>{t('profile.subtitle.preferences')}</Heading>
            <Button colorScheme='blue' leftIcon={<FaPencilAlt />} onClick={onOpen}>
              {t('preferences.button.edit.label')}
            </Button>
          </Flex>
        </VStack>
      </Container>

      <PreferencesForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default PreferencesSection;

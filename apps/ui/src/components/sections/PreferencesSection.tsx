import withPreferences, { WithPreferencesProps } from '@/hocs/withPreferences';
import withUser, { WithUserProps } from '@/hocs/withUser';
import useFormatMessage from '@/hooks/useFormatMessage';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import PreferencesForm from '../forms/PreferencesForm';

type PreferencesSectionProps = WithUserProps & WithPreferencesProps;

const PreferencesSection: FC<PreferencesSectionProps> = ({ preferences, user }) => {
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
          <VStack
            alignItems='stretch'
            bgColor='white'
            borderRadius='md'
            boxShadow='md'
            divider={<Divider />}
            p={4}
          >
            <Flex alignItems='flex-end' justifyContent='space-between'>
              <Text fontWeight='bold'>{t('preferences.form.name.label')}</Text>
              <Text>{user.displayName}</Text>
            </Flex>
            <Flex alignItems='flex-end' justifyContent='space-between'>
              <Text fontWeight='bold'>{t('preferences.form.currency.label')}</Text>
              <Text>{preferences.currency}</Text>
            </Flex>
          </VStack>
        </VStack>
      </Container>

      <PreferencesForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default withUser(withPreferences(PreferencesSection));

import { Navigate, useNavigate } from 'react-router-dom';
import { BellIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useNewTransaction } from 'features/transactions/hooks/useNewTransaction';
import { useOverlap } from 'features/transactions/hooks/useOverlap';
import { useCurrentUser } from 'services/auth/hooks/useCurrentUser';
import { Paths } from 'services/routes/Paths';

import { useMyInventory } from '../hooks/useInventory';
import { PersonBox } from './PersonBox';
import { TransactionTable } from './TransactionTable';

export const ShelterCard = ({ id, phone, email, logo, name, address, offersPickupOfThings }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addNewTransaction } = useNewTransaction();
  const [{ data, fetching }] = useMyInventory();
  const { theirs, overlap } = useOverlap(id);
  const { profile } = useCurrentUser();
  const navigate = useNavigate();

  const quantityInput: number[] = [];

  const handleSubmit = async () => {
    const { data } = await addNewTransaction({
      giver: profile.userId as string, // id usera
      taker: id, // id schroniska
      items: [...new Set(quantityInput)], // id itemow
      status: 'SUBMITTED',
    });

    onClose();

    navigate(`/${Paths.Transaction.replace(':id', data?.[0].id)}`);
  };

  const handleChange = (e: any, id: any) => {
    const quantity = e?.nativeEvent?.data;

    quantityInput.push(id);
  };

  return (
    <>
      <Box border="1px" borderColor="gray.100" w="600px" borderRadius="md" mt={4}>
        <Flex gridGap={10} mb={4} justify="space-between">
          <Flex alignItems="center">
            <Image src={logo} boxSize={20} borderRadius="full" alt="" marginLeft="1rem" />
            <Box ml={5} mt={5}>
              <Box textStyle="h2">{name}</Box>
              <Text color="gray.500">{address}</Text>
              <Flex>
                <Text color="gray.500">{phone}</Text>
                <Text color="gray.500">{email}</Text>
              </Flex>
            </Box>
          </Flex>
          {offersPickupOfThings && (
            <Badge colorScheme="blue" mb={20} mr={7} mt={7}>
              <Flex>
                <BellIcon mt={1} color="blue.500" position="relative" top="-2px" />
                <Text color="blue.500">Oferuje odbi??r rzeczy</Text>
              </Flex>
            </Badge>
          )}
        </Flex>
        <Flex ml={5} mb={5}>
          {theirs?.map((need: any) => (
            <Box mr={4} bg={overlap?.some((o) => o.id === need.id) ? 'green.100' : ''}>
              <Box mb={2}>
                {overlap?.some((o) => o.id === need.id) ? <CheckIcon mt={1} /> : <CloseIcon mt={1} />}
                <Badge colorScheme={overlap?.some((o) => o.id === need.id) ? 'green' : ''}>{need.category}</Badge>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box border="1px" bg="gray.100" borderColor="gray.100" w="600px" borderRadius="md" h={16}>
        <Flex justify="right" mr={4} mt={3}>
          <Button mr={3} colorScheme="blue" onClick={onOpen}>
            Zaproponuj transakcj??
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="xxl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zaproponuj transakcj??</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PersonBox
              shelterAvatar={profile?.avatar}
              shelterName={profile?.name}
              shelterPlace={profile?.city}
              userAvatar={logo}
              userName={name}
              userCity={address}
            />
            <Box h={10} />
            <Box textStyle="h2">Tw??j inwentarz</Box>
            <Text color="gray.400">Wybierz przedmioty, kt??re chesz odda??/sprzeda?? w ramach transakcji.</Text>
            <Box h={5} />
            <TransactionTable
              columns={['Przedmiot', 'Cena za szt.', 'Data Wa??no??ci', 'Ilo????']}
              data={data}
              handleChange={handleChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Anuluj
            </Button>
            <Button onClick={handleSubmit} colorScheme="brand">
              Zaproponuj transakcj??
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

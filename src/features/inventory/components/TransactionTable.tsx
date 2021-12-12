import { Flex, Input, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

export type OurTableProps = {
  columns: string[];
  data: any;
  handleChange: any;
};

export const TransactionTable = ({ columns, data, handleChange }: OurTableProps) => {
  return (
    <Table width="100%" variant="simple">
      <Thead bg="gray.200">
        <Tr>
          {columns.map((header) => (
            <Th>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row: any) => (
          <Tr>
            <Td color="gray.400">{row.name ?? '-'}</Td>
            <Td color="gray.400">{row.price ?? '-'}</Td>
            <Td color="gray.400">{row.expirationDate ?? '-'}</Td>
            <Td p={1}>
              <Flex>
                <Input placeholder="0" size="md" w="100px" name="quan" onChange={(e) => handleChange(e, row.id)} />
                <Text position="relative" right="40px" top="9px" pointerEvents="none" color="gray.400">
                  /{row.quantity ?? '-'}
                </Text>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
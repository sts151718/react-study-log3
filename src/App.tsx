import { Container, Heading, List, Spinner, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAllRecords } from "./hooks/useAllRecords";
import { StudyRecords } from "./components/organisms/StudyRecords";

function App() {
  const { records, isLoading, getRecords } = useAllRecords();

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  const recordTexts = records.map((record) => ({
    record_id: record.id,
    text: record.toListItemText(),
  }));

  return (
    <Container w="96" mx="auto" py="8">
      <Heading as="h1" size="2xl" mb="4">
        学習記録一覧
      </Heading>
      <Stack spaceY={4} p="2" borderRadius="md">
        {isLoading && <Spinner mx="auto" mt={2} />}
        <List.Root unstyled spaceY={2}>
          {recordTexts.map((recordText) => (
            <List.Item
              key={recordText.record_id}
              border="1px solid"
              borderColor="gray.300"
              p={4}
            >
              {recordText.text}
            </List.Item>
          ))}
        </List.Root>
      </Stack>
    </Container>
  );
}

export default App;

import { Container, Heading, List, Spinner, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAllRecords } from "./hooks/useAllRecords";
import { StudyRecords } from "./components/organisms/StudyRecords";

function App() {
  const { records, isLoading, getRecords } = useAllRecords();

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <Container w="96" mx="auto" py="8">
      <Heading as="h1" size="2xl" mb="4">
        学習記録一覧
      </Heading>
      <StudyRecords isLoading={isLoading} records={records} />
    </Container>
  );
}

export default App;

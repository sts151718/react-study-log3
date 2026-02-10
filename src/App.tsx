import { Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAllRecords } from "./hooks/useAllRecords";
import { StudyRecords } from "./components/organisms/StudyRecords";
import { StudyFormDialog } from "./components/organisms/StudyFormDialog";
import type { StudyForm } from "./types/StudyForm";

function App() {
  const { records, isLoading, getRecords, addRecord } = useAllRecords();

  useEffect(() => {
    getRecords();
  }, []);

  const onStudyDialogSubmit = async (form: StudyForm) => {
    await addRecord(form);
  };

  return (
    <Container w="96" mx="auto" py="8" textAlign="center">
      <Heading as="h1" size="2xl" mb="4">
        学習記録一覧
      </Heading>
      <StudyFormDialog onSubmit={onStudyDialogSubmit} />
      <StudyRecords isLoading={isLoading} records={records} />
    </Container>
  );
}

export default App;

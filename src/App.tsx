import { Container, Heading } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { useCallback, useEffect } from "react";
import { useCrudRecords } from "./hooks/useCrudRecords";
import { StudyRecords } from "./components/organisms/StudyRecords";
import { StudyFormDialog } from "./components/organisms/StudyFormDialog";
import { useFormDialog } from "./hooks/useFormDialog";
import type { RecordInput } from "./types/RecordInput";
import hash from "stable-hash";

function App() {
  const {
    records,
    isLoading,
    getRecords,
    addRecord,
    updateRecord,
    deleteRecord,
  } = useCrudRecords();

  const {
    selectedRecord,
    isDialogOpen,
    isEdit,
    openAddDialog,
    openEditDialog,
    closeDialog,
  } = useFormDialog({ records });

  useEffect(() => {
    getRecords();
  }, []);

  const onDeleteRecord = async (id: string) => {
    await deleteRecord(id);
  };

  const submitStudyDialog = useCallback(
    async (input: RecordInput) => {
      if (isEdit) {
        if (!selectedRecord?.id) {
          throw new Error("学習記録が選択されていません。");
        }

        await updateRecord(selectedRecord?.id, input);
      } else {
        await addRecord(input);
      }
    },
    [addRecord, updateRecord, isEdit, selectedRecord],
  );

  const dialogTitle = isEdit ? "記録編集" : "新規登録";

  return (
    <>
      <Toaster />
      <Container
        w="96"
        mx="auto"
        mt="20"
        p="8"
        textAlign="center"
        bg="white"
        borderRadius="md"
      >
        <Heading as="h1" size="2xl" mb="4">
          学習記録一覧
        </Heading>
        <StudyFormDialog
          key={hash(selectedRecord)}
          isOpen={isDialogOpen}
          record={{
            title: selectedRecord?.title ?? "",
            time: selectedRecord?.time.toString() ?? "0",
          }}
          dialogTitle={dialogTitle}
          onSubmit={submitStudyDialog}
          onClickOpenDialog={openAddDialog}
          onClickCloseDialog={closeDialog}
        />
        <StudyRecords
          isLoading={isLoading}
          records={records}
          onDeleteRecord={onDeleteRecord}
          onOpenDialog={openEditDialog}
        />
      </Container>
    </>
  );
}

export default App;

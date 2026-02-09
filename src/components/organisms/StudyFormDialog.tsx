import { CloseButton, Dialog, Flex, Stack } from "@chakra-ui/react";
import { memo, useState, type ChangeEvent, type FC } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { SecondaryButton } from "../atoms/SecondaryButton";
import { TextField } from "../molecules/TextField";
import { NumberField } from "../molecules/NumberField";
import { ButtonsWrap } from "../atoms/ButtonsWrap";
import type { StudyForm } from "@/types/StudyForm";

type Props = {
  onSubmit: (form: StudyForm) => void;
};

export const StudyFormDialog: FC<Props> = memo((props) => {
  const { onSubmit } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("0");

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const onStudySubmit = () => {
    onSubmit({ title, time });
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <Flex justifyContent="center" align="center" mb={2}>
          <PrimaryButton onClick={() => setIsOpen(true)}>登録</PrimaryButton>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton />
          </Dialog.CloseTrigger>
          <Dialog.Header justifyContent="center">
            <Dialog.Title>新規登録</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Stack spaceY="4">
              <TextField
                label="学習内容"
                placeholder="学習内容を入力してください"
                value={title}
                onChange={onChangeTitle}
              />
              <NumberField
                w="full"
                label="学習時間"
                placeholder="時間で入力してください"
                min={0}
                value={time}
                onChange={onChangeTime}
              />
            </Stack>
          </Dialog.Body>
          <Dialog.Footer justifyContent="center">
            <ButtonsWrap justifyContent="center" gap="2">
              <PrimaryButton onClick={onStudySubmit}>登録</PrimaryButton>
              <SecondaryButton onClick={() => setIsOpen(!isOpen)}>
                キャンセル
              </SecondaryButton>
            </ButtonsWrap>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
});

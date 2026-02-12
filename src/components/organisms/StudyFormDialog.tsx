import {
  CloseButton,
  Dialog,
  Flex,
  Stack,
  type DialogOpenChangeDetails,
} from "@chakra-ui/react";
import { memo, type FC } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { SecondaryButton } from "../atoms/SecondaryButton";
import { TextField } from "../molecules/TextField";
import { NumberField } from "../molecules/NumberField";
import { ButtonsWrap } from "../atoms/ButtonsWrap";
import type { RecordInput } from "@/types/RecordInput";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  record: RecordInput;
  dialogTitle: string;
  onClickOpenDialog: () => void;
  onClickCloseDialog: () => void;
  onSubmit: (form: RecordInput) => void;
};

export const StudyFormDialog: FC<Props> = memo((props) => {
  const {
    isOpen,
    record,
    dialogTitle,
    onClickOpenDialog,
    onClickCloseDialog,
    onSubmit,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecordInput>({
    defaultValues: {
      title: record.title,
      time: record.time,
    },
  });

  const titleRegister = register("title", {
    required: {
      value: true,
      message: "内容の入力は必須です",
    },
  });
  const timeRegister = register("time", {
    required: { value: true, message: "時間の入力は必須です" },
    min: { value: 0, message: "時間は0以上である必要があります" },
  });

  const onStudySubmit = (data: RecordInput) => {
    onSubmit(data);
    onClickCloseDialog();
    reset();
  };

  const dialogOpenChange = (e: DialogOpenChangeDetails) =>
    e.open ? onClickOpenDialog() : onClickCloseDialog();

  return (
    <form onSubmit={handleSubmit(onStudySubmit)}>
      <Dialog.Root open={isOpen} onOpenChange={dialogOpenChange}>
        <Dialog.Trigger asChild>
          <Flex justifyContent="center" align="center" mb={2}>
            <PrimaryButton>登録</PrimaryButton>
          </Flex>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content data-testid="form-dialog-content">
            <Dialog.CloseTrigger focusVisibleRing="none" asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header justifyContent="center">
              <Dialog.Title as="h2">{dialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack spaceY="4">
                <TextField
                  label="学習内容"
                  placeholder="学習内容を入力してください"
                  name={titleRegister.name}
                  onChange={titleRegister.onChange}
                  onBlur={titleRegister.onBlur}
                  inputRef={titleRegister.ref}
                  errorMessage={errors.title?.message}
                />
                <NumberField
                  w="full"
                  label="学習時間"
                  placeholder="時間で入力してください"
                  min={0}
                  name={timeRegister.name}
                  onChange={timeRegister.onChange}
                  onBlur={timeRegister.onBlur}
                  inputRef={timeRegister.ref}
                  errorMessage={errors.time?.message}
                />
              </Stack>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <ButtonsWrap justifyContent="center" gap="2">
                <PrimaryButton type="submit">保存</PrimaryButton>
                <Dialog.ActionTrigger asChild>
                  <SecondaryButton>キャンセル</SecondaryButton>
                </Dialog.ActionTrigger>
              </ButtonsWrap>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </form>
  );
});

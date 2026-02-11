import {
  CloseButton,
  Dialog,
  Flex,
  Stack,
  type DialogOpenChangeDetails,
} from "@chakra-ui/react";
import { memo, useState, type FC } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { SecondaryButton } from "../atoms/SecondaryButton";
import { TextField } from "../molecules/TextField";
import { NumberField } from "../molecules/NumberField";
import { ButtonsWrap } from "../atoms/ButtonsWrap";
import type { RecordInput } from "@/types/RecordInput";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (form: RecordInput) => void;
};

export const StudyFormDialog: FC<Props> = memo((props) => {
  const { onSubmit } = props;

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecordInput>({
    defaultValues: {
      title: "",
      time: "0",
    },
  });

  const title = register("title", {
    required: {
      value: true,
      message: "内容の入力は必須です",
    },
  });
  const time = register("time", {
    required: { value: true, message: "時間の入力は必須です" },
    min: { value: 0, message: "時間は0以上である必要があります" },
  });

  const onStudySubmit = (data: RecordInput) => {
    onSubmit(data);
    setIsOpen(false);
    reset();
  };

  const dialogOpenChange = (e: DialogOpenChangeDetails) => setIsOpen(e.open);

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
              <Dialog.Title as="h2">新規登録</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack spaceY="4">
                <TextField
                  label="学習内容"
                  placeholder="学習内容を入力してください"
                  name={title.name}
                  onChange={title.onChange}
                  onBlur={title.onBlur}
                  inputRef={title.ref}
                  errorMessage={errors.title?.message}
                />
                <NumberField
                  w="full"
                  label="学習時間"
                  placeholder="時間で入力してください"
                  min={0}
                  name={time.name}
                  onChange={time.onChange}
                  onBlur={time.onBlur}
                  inputRef={time.ref}
                  errorMessage={errors.time?.message}
                />
              </Stack>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <ButtonsWrap justifyContent="center" gap="2">
                <PrimaryButton type="submit">登録</PrimaryButton>
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

import type { Record } from "@/domain/record";
import { Flex, List, Spinner, Stack, Text } from "@chakra-ui/react";
import { memo, type FC } from "react";
import { ButtonsWrap } from "../atoms/ButtonsWrap";
import { AlertButton } from "../atoms/AlertButton";

type Props = {
  isLoading: boolean;
  records: Array<Record>;
  onDeleteRecord: (id: string) => void;
};

export const StudyRecords: FC<Props> = memo((props) => {
  const { isLoading, records, onDeleteRecord } = props;

  const recordTexts = records.map((record) => ({
    record_id: record.id,
    text: record.toListItemText(),
  }));

  return (
    <Stack spaceY={4} p="2" borderRadius="md">
      <List.Root unstyled spaceY={2} textAlign="left">
        {recordTexts.map((recordText) => (
          <List.Item
            key={recordText.record_id}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text>{recordText.text}</Text>
              <ButtonsWrap gap="2">
                <AlertButton
                  buttonProps={{ size: "xs" }}
                  onClick={() => onDeleteRecord(recordText.record_id)}
                >
                  削除
                </AlertButton>
              </ButtonsWrap>
            </Flex>
          </List.Item>
        ))}
      </List.Root>
      {isLoading && <Spinner mx="auto" mt={2} />}
    </Stack>
  );
});

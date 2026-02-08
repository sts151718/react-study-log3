import type { Record } from "@/domain/record";
import { List, Spinner, Stack } from "@chakra-ui/react";
import { memo, type FC } from "react";

type Props = {
  isLoading: boolean;
  records: Array<Record>;
};

export const StudyRecords: FC<Props> = memo((props) => {
  const { isLoading, records } = props;

  const recordTexts = records.map((record) => ({
    record_id: record.id,
    text: record.toListItemText(),
  }));

  return (
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
  );
});

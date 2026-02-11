import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { Record } from "@/domain/record";
import type { RecordInput } from "@/types/RecordInput";

vi.mock("@/lib/record.ts", () => ({
  getAllRecords: vi
    .fn()
    .mockResolvedValue([
      Record.fromRow({ id: "1", title: "テストデータ1", time: 1 }),
      Record.fromRow({ id: "2", title: "テストデータ2", time: 2 }),
      Record.fromRow({ id: "3", title: "テストデータ3", time: 3 }),
      Record.fromRow({ id: "4", title: "テストデータ4", time: 0 }),
    ]),
  insertRecord: vi.fn().mockImplementation(async (record: RecordInput) =>
    Record.fromRow({
      id: "5",
      title: record.title,
      time: Number(record.time),
    }),
  ),
  deleteRecordById: vi.fn().mockResolvedValue(void 0),
}));

import App from "../App";
import userEvent from "@testing-library/user-event";

describe("ローディング画面をみることができる", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("タイトルが表示されている。", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const ListContainer = screen.getByTestId("study-records");

    await waitFor(() => {
      const loading = within(ListContainer).getByLabelText("ローディング中");
      expect(loading).toBeVisible();
    });
  });

  it("学習記録リストを表示できていること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const ListContainer = screen.getByTestId("study-records");

    await waitFor(() => {
      const list = within(ListContainer).getByRole("list");
      const listitem = within(list).getAllByRole("listitem");
      expect(list).toBeVisible();
      expect(listitem).toHaveLength(4);
    });
  });

  it("登録ボタンを表示できていること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const openDialogButton = screen.getByRole("button", { name: "登録" });
    expect(openDialogButton).toBeVisible();
  });

  it("タイトルに「学習記録一覧」を表示できていること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const title = screen.getByRole("heading", {
      level: 1,
    });

    expect(title).toHaveTextContent("学習記録一覧");
  });

  it("ダイアログから登録できること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const openDialogButton = screen.getByRole("button", { name: "登録" });

    await userEvent.click(openDialogButton);

    const dialog = await screen.findByTestId("form-dialog-content");
    const titleInput = await within(dialog).findByRole("textbox", {
      name: "学習内容",
    });
    const timeInput = await within(dialog).findByRole("spinbutton", {
      name: "学習時間",
    });

    const newRecordTitle = "テストデータ5";
    const newRecordTime = "5";
    await userEvent.type(titleInput, newRecordTitle);
    await userEvent.type(timeInput, newRecordTime);

    const submitButton = within(dialog).getByRole("button", { name: "保存" });
    await userEvent.click(submitButton);

    const listContainer = await screen.findByTestId("study-records");
    const listitem = within(listContainer).getAllByRole("listitem");

    await waitFor(() => {
      expect(listitem).toHaveLength(5);
      expect(listitem[4]).toHaveTextContent(newRecordTitle);
      expect(listitem[4]).toHaveTextContent(newRecordTime);
    });
  });

  it("ダイアログのタイトルが「新規登録」であること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const openDialogButton = screen.getByRole("button", { name: "登録" });

    await userEvent.click(openDialogButton);

    const dialog = await screen.findByTestId("form-dialog-content");
    const dialogTitle = within(dialog).getByRole("heading", {
      level: 2,
      name: "新規登録",
    });

    expect(dialogTitle).toBeVisible();
  });

  it("学習内容が空の場合、エラーメッセージが表示されること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const openDialogButton = screen.getByRole("button", { name: "登録" });

    await userEvent.click(openDialogButton);

    const dialog = await screen.findByTestId("form-dialog-content");
    const timeInput = await within(dialog).findByRole("spinbutton", {
      name: "学習時間",
    });

    const newRecordTime = "5";
    await userEvent.type(timeInput, newRecordTime);

    const submitButton = within(dialog).getByRole("button", { name: "保存" });
    await userEvent.click(submitButton);

    const errorMessage = within(dialog).getByText("内容の入力は必須です");

    expect(errorMessage).toBeVisible();
  });

  it("学習時間が空の場合、エラーメッセージが表示されること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const openDialogButton = screen.getByRole("button", { name: "登録" });

    await userEvent.click(openDialogButton);

    const dialog = await screen.findByTestId("form-dialog-content");
    const titleInput = await within(dialog).findByRole("textbox", {
      name: "学習内容",
    });
    const timeInput = await within(dialog).findByRole("spinbutton", {
      name: "学習時間",
    });

    const newRecordTitle = "テストデータ5";
    await userEvent.type(titleInput, newRecordTitle);
    await userEvent.clear(timeInput);

    const submitButton = within(dialog).getByRole("button", { name: "保存" });
    await userEvent.click(submitButton);

    const errorMessage = within(dialog).getByText("時間の入力は必須です");

    expect(errorMessage).toBeVisible();
  });

  it("学習時間が負数の場合、エラーメッセージが表示されること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const openDialogButton = screen.getByRole("button", { name: "登録" });

    await userEvent.click(openDialogButton);

    const dialog = await screen.findByTestId("form-dialog-content");
    const titleInput = await within(dialog).findByRole("textbox", {
      name: "学習内容",
    });
    const timeInput = await within(dialog).findByRole("spinbutton", {
      name: "学習時間",
    });

    const newRecordTitle = "テストデータ5";
    const newRecordTime = "-1";
    await userEvent.type(titleInput, newRecordTitle);
    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, newRecordTime);

    const submitButton = within(dialog).getByRole("button", { name: "保存" });
    await userEvent.click(submitButton);

    const errorMessage =
      within(dialog).getByText("時間は0以上である必要があります");

    expect(errorMessage).toBeVisible();
  });

  it("学習記録が削除できること", async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const ListContainer = screen.getByTestId("study-records");
    const list = await within(ListContainer).findByRole("list");
    const listitem = await within(list).findAllByRole("listitem");
    const removingListItem = listitem[0];

    fireEvent.click(
      within(removingListItem).getByRole("button", { name: "削除" }),
    );
    await waitForElementToBeRemoved(removingListItem);
  });
});

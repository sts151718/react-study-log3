import { sum } from "../test";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("sum関数のテスト", () => {
  test("1 + 2 は 3になる", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("コンポーネントテスト", () => {
  test("タイトルが表示されている。", () => {
    render(<App />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Hello World");
  });
});

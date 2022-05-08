import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import ToggleTheme from "../ToggleTheme";

describe("ToggleTheme Tests", () => {
  beforeEach(() => {
    render(<ToggleTheme />);
  });
  test("renders content", () => {
    const toggleThemeItem = screen.getByLabelText(/toggle-theme/i);
    expect(toggleThemeItem).toBeInTheDocument();
  });
});

import Input, { IProps } from "./index";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  const mockedOnChange = jest.fn();
  const mockedOnBlur = jest.fn();
  const label = "my super label";
  const id = "#my-super-id";
  const value = "my super value";
  const defaultInvalid = false;

  const renderInput = (propsToOverride?: Partial<IProps>) => {
    return render(
      <Input
        label={label}
        onChange={mockedOnChange}
        id={id}
        value={value}
        validationMessage={undefined}
        invalid={defaultInvalid}
        onBlur={mockedOnBlur}
        {...propsToOverride}
      />
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should properly call onChange", () => {
    const { getByLabelText } = renderInput();
    const input = getByLabelText(label);
    userEvent.type(input, "some text");
    expect(mockedOnChange).toHaveBeenCalled();
    expect(mockedOnBlur).not.toHaveBeenCalled();
  });

  it("should properly pass value", () => {
    const { getByLabelText } = renderInput();
    const input = getByLabelText(label);
    expect(input).toHaveValue(value);
  });

  it("should properly handle invalid props", () => {
    const { getByLabelText, queryByText } = renderInput();
    const input = getByLabelText(label);
    const validationMessage = queryByText("validation-message");
    expect(input).toBeValid();
    expect(validationMessage).toBeNull();
  });

  it("should properly handle onBlur", () => {
    const { getByLabelText } = renderInput();
    const input = getByLabelText(label);
    fireEvent.blur(input);
    expect(mockedOnBlur).toHaveBeenCalled();
    expect(mockedOnChange).not.toHaveBeenCalled();
  });

  it("should properly handle invalid props", () => {
    const { getByText, getByLabelText } = renderInput({
      invalid: true,
      validationMessage: "validation-message",
    });
    const input = getByLabelText(label);
    expect(input).toBeInvalid();
    expect(getByText("validation-message")).toBeInTheDocument();
  });
});

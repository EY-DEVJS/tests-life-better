import OrderPage from ".";
import {
  findByLabelText,
  findByText,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Order", () => {
  describe("#first-name input", () => {
    it("should proper handle typing", async () => {
      const mockedFirstName = "Artur";
      const { getByLabelText } = render(<OrderPage />);
      const firstNameInput = getByLabelText("Imię");
      userEvent.type(firstNameInput, mockedFirstName);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedFirstName);
        expect(firstNameInput).toBeValid();
      });
    });

    it("should proper validate blur", async () => {
      const { findByText, getByLabelText } = render(<OrderPage />);
      const firstNameInput = getByLabelText("Imię");

      fireEvent.blur(firstNameInput);

      const validationMessage = await findByText(
        "Pole Imię nie może być puste"
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();
    });

    it("should proper revalidate after blur and typing", async () => {
      const { getByLabelText, findByText, queryByText } = render(<OrderPage />);
      const firstNameInput = getByLabelText("Imię");

      fireEvent.blur(firstNameInput);
      const validationMessage = await findByText(
        "Pole Imię nie może być puste"
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();

      userEvent.type(firstNameInput, "Poprawne Imie");

      await waitForElementToBeRemoved(() =>
        queryByText("Pole Imię nie może być puste")
      );

      expect(firstNameInput).toHaveValue("Poprawne Imie");
      expect(firstNameInput).toBeValid();
    });
  });

  describe("#email input", () => {
    it("should validate shape of email when bad format", async () => {
      const mockedEmailValue = "someemail.com";
      const { getByLabelText, queryByText } = render(<OrderPage />);
      const firstNameInput = getByLabelText("E-mail");
      userEvent.type(firstNameInput, mockedEmailValue);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedEmailValue);
        expect(firstNameInput).not.toBeValid();
        expect(queryByText("Wymagany poprawny email")).toBeInTheDocument();
      });
    });

    it("should validate shape of email when proper", async () => {
      const mockedEmailValue = "perfect@email.com";
      const { getByLabelText, queryByText } = render(<OrderPage />);
      const firstNameInput = getByLabelText("E-mail");
      userEvent.type(firstNameInput, mockedEmailValue);

      await waitFor(() => {
        expect(queryByText("Wymagany poprawny email")).toBeNull();
        expect(firstNameInput).toHaveValue(mockedEmailValue);
        expect(firstNameInput).toBeValid();
      });
    });
  });

  describe("Submission", () => {
    it("should validate whole form when submit", async () => {
      const { findByText, findByLabelText, getByText } = render(<OrderPage />);
      const submitButton = getByText("Zapłać");
      userEvent.click(submitButton);

      expect(await findByText("Pole Imię nie może być puste")).toBeDefined();
      expect(await findByLabelText("Imię")).toBeInvalid();

      expect(
        await findByText("Pole Nazwisko nie może być puste")
      ).toBeDefined();
      expect(await findByLabelText("Nazwisko")).toBeInvalid();

      expect(
        await findByText("Pole Kod pocztowy nie może być puste")
      ).toBeDefined();

      expect(await findByLabelText("Kod pocztowy")).toBeInvalid();

      expect(await findByText("To pole nie może być puste")).toBeDefined();
      expect(
        await findByLabelText("Ulica i numer domu/mieszkania")
      ).toBeInvalid();
    });
  });

  describe("Price calculation", () => {
    it("should have base price total", () => {
      const { getByTestId } = render(<OrderPage />);
      const priceTotal = getByTestId("price-total");
      expect(priceTotal.textContent).toBe("106.97");
    });

    it("should have proper shipping price and proper total price", async () => {
      const { getByLabelText, getByTestId } = render(<OrderPage />);
      const inpost = getByLabelText("Kurier (InPost)");

      userEvent.click(inpost);

      const priceShipping = getByTestId("price-shipping");
      const priceTotal = getByTestId("price-total");

      await waitFor(() => {
        expect(priceShipping.textContent).toEqual("+ dostawa 10.95");
        expect(priceTotal.textContent).toEqual("117.92");
        expect(inpost).toBeChecked();
      });
    });

    it("should properly recalculate price shipping", async () => {
      const { getByTestId, getByLabelText } = render(<OrderPage />);
      const inpost = getByLabelText("Kurier (InPost)");
      const pocztex = getByLabelText("Kurier (Pocztex)");

      userEvent.click(inpost);

      const priceShipping = getByTestId("price-shipping");
      const priceTotal = getByTestId("price-total");

      await waitFor(() => {
        expect(priceShipping.textContent).toEqual("+ dostawa 10.95");
        expect(priceTotal.textContent).toEqual("117.92");
        expect(inpost).toBeChecked();
      });

      userEvent.click(pocztex);

      await waitFor(() => {
        expect(inpost).not.toBeChecked();
        expect(pocztex).toBeChecked();
        expect(priceShipping.textContent).toEqual("+ dostawa 9.99");
        expect(priceTotal.textContent).toEqual("116.96");
      });
    });
  });

  describe("#payment-method", () => {
    it(" should revalidate after submission ", async () => {
      const { findByText, queryByText, getByLabelText, getByText } = render(
        <OrderPage />
      );

      const blik = getByLabelText("Blik");
      const submitButton = getByText("Zapłać");
      userEvent.click(submitButton);

      const validationMessage = await findByText("Wybierz sposób płatności");
      expect(validationMessage).toBeDefined();

      userEvent.click(blik);

      await waitForElementToBeRemoved(() =>
        queryByText("Wybierz sposób płatności")
      );

      expect(blik).toBeChecked();
    });
  });
});

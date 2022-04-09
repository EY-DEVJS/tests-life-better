import OrderPage from ".";
import {
  findByLabelText,
  findByText,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Oder", () => {
  describe("#first-name input", () => {
    it("should proper handle typing", async () => {
      const mockedFirstName = "Artur";
      const { findByLabelText } = render(<OrderPage />);
      const firstNameInput = await findByLabelText("Imię");
      userEvent.type(firstNameInput, mockedFirstName);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedFirstName);
        expect(firstNameInput).toBeValid();
      });
    });

    it("should proper validate blur", async () => {
      const { findByLabelText, findByText } = render(<OrderPage />);
      const firstNameInput = await findByLabelText("Imię");

      fireEvent.blur(firstNameInput);
      const validationMessage = await findByText(
        "Pole Imię nie może być puste"
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();
    });

    it("should proper revalidate after blur and typing", async () => {
      const { findByLabelText, findByText, queryByText } = render(
        <OrderPage />
      );
      const firstNameInput = await findByLabelText("Imię");

      fireEvent.blur(firstNameInput);
      const validationMessage = await findByText(
        "Pole Imię nie może być puste"
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();

      userEvent.type(firstNameInput, "Poprawne Imie");

      await waitFor(() => {
        expect(queryByText("Pole Imię nie może być puste")).toBeNull();
        expect(firstNameInput).toHaveValue("Poprawne Imie");
        expect(firstNameInput).toBeValid();
      });
    });
  });

  describe("Submission", () => {
    it("should validate whole form when submit", async () => {
      const { findByText, findByLabelText } = render(<OrderPage />);
      const submitButton = await findByText("Zapłać");
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
      expect(priceTotal?.textContent).toBe("106.97");
    });

    it("should have proper shipping price and proper total price", async () => {
      const { findByLabelText, findByTestId } = render(<OrderPage />);
      const inpost = await findByLabelText("Kurier (InPost)");

      userEvent.click(inpost);

      const priceShipping = await findByTestId("price-shipping");
      const priceTotal = await findByTestId("price-total");

      expect(priceShipping.textContent).toEqual("+ dostawa 10.95");
      expect(priceTotal.textContent).toEqual("117.92");
      expect(inpost).toBeChecked();
    });

    it("should properly recalculate price shipping", async () => {
      const { findByLabelText, findByTestId } = render(<OrderPage />);
      const inpost = await findByLabelText("Kurier (InPost)");
      const pocztex = await findByLabelText("Kurier (Pocztex)");

      userEvent.click(inpost);
      const priceShipping = await findByTestId("price-shipping");
      const priceTotal = await findByTestId("price-total");

      expect(priceShipping.textContent).toEqual("+ dostawa 10.95");
      expect(priceTotal.textContent).toEqual("117.92");
      expect(inpost).toBeChecked();

      userEvent.click(pocztex);

      expect(inpost).not.toBeChecked();
      expect(pocztex).toBeChecked();

      expect(priceShipping.textContent).toEqual("+ dostawa 9.99");
      expect(priceTotal.textContent).toEqual("116.96");
    });
  });

  describe("#payment-method", () => {
    it(" should revalidate after submission ", async () => {
      const { findByLabelText, findByText, queryByText } = render(
        <OrderPage />
      );

      const blik = await findByLabelText("Blik");
      const submitButton = await findByText("Zapłać");
      userEvent.click(submitButton);

      const validationMessage = await findByText("Wybierz sposób płatności");
      expect(validationMessage).toBeDefined();

      userEvent.click(blik);

      await waitFor(() => {
        expect(queryByText("Wybierz sposób płatności")).toBeNull();
        expect(blik).toBeChecked();
      });
    });
  });
});

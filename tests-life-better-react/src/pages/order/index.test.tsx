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
    const mockedFirstName = "Artur";
    const firstNameLabel = "Imię";
    const firstNameRequiredValidationMessage = "Pole Imię nie może być puste";

    it("should proper handle typing", async () => {
      const { getByLabelText } = render(<OrderPage />);
      const firstNameInput = getByLabelText(firstNameLabel);
      userEvent.type(firstNameInput, mockedFirstName);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedFirstName);
        expect(firstNameInput).toBeValid();
      });
    });

    it("should proper validate blur", async () => {
      const { findByText, getByLabelText } = render(<OrderPage />);
      const firstNameInput = getByLabelText(firstNameLabel);

      fireEvent.blur(firstNameInput);

      const validationMessage = await findByText(
        firstNameRequiredValidationMessage
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();
    });

    it("should proper revalidate after blur and typing", async () => {
      const { getByLabelText, findByText, queryByText } = render(<OrderPage />);
      const firstNameInput = getByLabelText(firstNameLabel);

      fireEvent.blur(firstNameInput);
      const validationMessage = await findByText(
        firstNameRequiredValidationMessage
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();

      userEvent.type(firstNameInput, mockedFirstName);

      await waitForElementToBeRemoved(() =>
        queryByText(firstNameRequiredValidationMessage)
      );

      expect(firstNameInput).toHaveValue(mockedFirstName);
      expect(firstNameInput).toBeValid();
    });
  });

  describe("#email input", () => {
    const mockedWrongEmailValue = "someemail.com";
    const emailShapeValidationMessage = "Wymagany poprawny email";
    const mockedEmailValue = "perfect@email.com";
    const emailLabel = "E-mail";

    it("should validate shape of email when bad format", async () => {
      const { getByLabelText, queryByText } = render(<OrderPage />);
      const firstNameInput = getByLabelText("E-mail");
      userEvent.type(firstNameInput, mockedWrongEmailValue);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedWrongEmailValue);
        expect(firstNameInput).not.toBeValid();
        expect(queryByText(emailShapeValidationMessage)).toBeInTheDocument();
      });
    });

    it("should validate shape of email when proper", async () => {
      const { getByLabelText, queryByText } = render(<OrderPage />);
      const firstNameInput = getByLabelText(emailLabel);
      userEvent.type(firstNameInput, mockedEmailValue);

      await waitFor(() => {
        expect(queryByText(emailShapeValidationMessage)).toBeNull();
        expect(firstNameInput).toHaveValue(mockedEmailValue);
        expect(firstNameInput).toBeValid();
      });
    });
  });

  describe("Submission", () => {
    const submitButtonText = "Zapłać";
    const firstNameLabel = "Imię";
    const firstNameRequiredValidationMessage = "Pole Imię nie może być puste";
    const lastNameLabel = "Nazwisko";
    const lastNameRequiredValidationMessage =
      "Pole Nazwisko nie może być puste";
    const postalCodeLabel = "Kod pocztowy";
    const postalCodeRequiredValidationMessage =
      "Pole Kod pocztowy nie może być puste";
    const addressLabel = "Ulica i numer domu/mieszkania";
    const addressRequiredValidationMessage = "To pole nie może być puste";

    it("should validate whole form when submit", async () => {
      const { findByText, findByLabelText, getByText } = render(<OrderPage />);
      const submitButton = getByText(submitButtonText);
      userEvent.click(submitButton);

      expect(
        await findByText(firstNameRequiredValidationMessage)
      ).toBeDefined();
      expect(await findByLabelText(firstNameLabel)).toBeInvalid();

      expect(await findByText(lastNameRequiredValidationMessage)).toBeDefined();
      expect(await findByLabelText(lastNameLabel)).toBeInvalid();

      expect(
        await findByText(postalCodeRequiredValidationMessage)
      ).toBeDefined();

      expect(await findByLabelText(postalCodeLabel)).toBeInvalid();

      expect(await findByText(addressRequiredValidationMessage)).toBeDefined();
      expect(await findByLabelText(addressLabel)).toBeInvalid();
    });
  });

  describe("Price calculation", () => {
    const priceTotalId = "price-total";
    const priceShippingId = "price-shipping";
    const basePriceTotal = "106.97";
    const inpostLabel = "Kurier (InPost)";
    const pocztexLabel = "Kurier (Pocztex)";

    it("should have base price total", () => {
      const { getByTestId } = render(<OrderPage />);
      const priceTotal = getByTestId(priceTotalId);
      expect(priceTotal.textContent).toBe(basePriceTotal);
    });

    it("should have proper shipping price and proper total price", async () => {
      const inpostShippingResult = "+ dostawa 10.95";
      const inpostPriceTotalResult = "117.92";
      const { getByLabelText, getByTestId } = render(<OrderPage />);
      const inpost = getByLabelText(inpostLabel);

      userEvent.click(inpost);

      const priceShipping = getByTestId(priceShippingId);
      const priceTotal = getByTestId(priceTotalId);

      await waitFor(() => {
        expect(priceShipping.textContent).toEqual(inpostShippingResult);
        expect(priceTotal.textContent).toEqual(inpostPriceTotalResult);
        expect(inpost).toBeChecked();
      });
    });

    it("should properly recalculate price shipping", async () => {
      const inpostShippingResult = "+ dostawa 10.95";
      const inpostPriceTotalResult = "117.92";
      const pocztexShippingResult = "+ dostawa 9.99";
      const pocztexPriceTotalResult = "116.96";
      const { getByTestId, getByLabelText } = render(<OrderPage />);
      const inpost = getByLabelText(inpostLabel);
      const pocztex = getByLabelText(pocztexLabel);

      userEvent.click(inpost);

      const priceShipping = getByTestId(priceShippingId);
      const priceTotal = getByTestId(priceTotalId);

      await waitFor(() => {
        expect(priceShipping.textContent).toEqual(inpostShippingResult);
        expect(priceTotal.textContent).toEqual(inpostPriceTotalResult);
        expect(inpost).toBeChecked();
      });

      userEvent.click(pocztex);

      await waitFor(() => {
        expect(inpost).not.toBeChecked();
        expect(pocztex).toBeChecked();
        expect(priceShipping.textContent).toEqual(pocztexShippingResult);
        expect(priceTotal.textContent).toEqual(pocztexPriceTotalResult);
      });
    });
  });

  describe("#payment-method", () => {
    const blikLabel = "Blik";
    const submitButtonText = "Zapłać";
    const paymentMethodRequiredValidationMessage = "Wybierz sposób płatności";
    it("should revalidate after submission ", async () => {
      const { findByText, queryByText, getByLabelText, getByText } = render(
        <OrderPage />
      );

      const blik = getByLabelText(blikLabel);
      const submitButton = getByText(submitButtonText);
      userEvent.click(submitButton);

      const validationMessage = await findByText(
        paymentMethodRequiredValidationMessage
      );
      expect(validationMessage).toBeDefined();

      userEvent.click(blik);

      await waitForElementToBeRemoved(() =>
        queryByText(paymentMethodRequiredValidationMessage)
      );

      expect(blik).toBeChecked();
    });
  });
});

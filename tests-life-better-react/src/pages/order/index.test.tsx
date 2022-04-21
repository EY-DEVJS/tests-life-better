import OrderPage from ".";
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Order", () => {
  describe("#first-name input", () => {
    const mockedFirstName = "Artur";
    const firstNameLabel = "Imię";
    const firstNameRequiredValidationMessage = "Pole Imię nie może być puste";

    it("should properly handle typing", async () => {
      render(<OrderPage />);
      const firstNameInput = screen.getByLabelText(firstNameLabel);
      userEvent.type(firstNameInput, mockedFirstName);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedFirstName);
        expect(firstNameInput).toBeValid();
      });
    });

    it("should properly validate blur", async () => {
      render(<OrderPage />);
      const firstNameInput = screen.getByLabelText(firstNameLabel);

      fireEvent.blur(firstNameInput);

      const validationMessage = await screen.findByText(
        firstNameRequiredValidationMessage
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();
    });

    it("should properly revalidate after blur and typing", async () => {
      render(<OrderPage />);
      const firstNameInput = screen.getByLabelText(firstNameLabel);

      fireEvent.blur(firstNameInput);
      const validationMessage = await screen.findByText(
        firstNameRequiredValidationMessage
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();

      userEvent.type(firstNameInput, mockedFirstName);

      await waitForElementToBeRemoved(() =>
        screen.queryByText(firstNameRequiredValidationMessage)
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
      render(<OrderPage />);
      const firstNameInput = screen.getByLabelText("E-mail");
      userEvent.type(firstNameInput, mockedWrongEmailValue);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedWrongEmailValue);
        expect(firstNameInput).not.toBeValid();
        expect(
          screen.queryByText(emailShapeValidationMessage)
        ).toBeInTheDocument();
      });
    });

    it("should validate shape of email when is proper", async () => {
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
      render(<OrderPage />);
      const submitButton = screen.getByText(submitButtonText);
      userEvent.click(submitButton);

      expect(
        await screen.findByText(firstNameRequiredValidationMessage)
      ).toBeDefined();
      expect(await screen.findByLabelText(firstNameLabel)).toBeInvalid();

      expect(
        await screen.findByText(lastNameRequiredValidationMessage)
      ).toBeDefined();
      expect(await screen.findByLabelText(lastNameLabel)).toBeInvalid();

      expect(
        await screen.findByText(postalCodeRequiredValidationMessage)
      ).toBeDefined();

      expect(await screen.findByLabelText(postalCodeLabel)).toBeInvalid();

      expect(
        await screen.findByText(addressRequiredValidationMessage)
      ).toBeDefined();
      expect(await screen.findByLabelText(addressLabel)).toBeInvalid();
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
      render(<OrderPage />);
      const inpost = screen.getByLabelText(inpostLabel);
      const pocztex = screen.getByLabelText(pocztexLabel);

      userEvent.click(inpost);

      const priceShipping = screen.getByTestId(priceShippingId);
      const priceTotal = screen.getByTestId(priceTotalId);

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
      render(<OrderPage />);

      const blik = screen.getByLabelText(blikLabel);
      const submitButton = screen.getByText(submitButtonText);
      userEvent.click(submitButton);

      const validationMessage = await screen.findByText(
        paymentMethodRequiredValidationMessage
      );
      expect(validationMessage).toBeDefined();

      userEvent.click(blik);

      await waitForElementToBeRemoved(() =>
        screen.queryByText(paymentMethodRequiredValidationMessage)
      );

      expect(blik).toBeChecked();
    });
  });
});

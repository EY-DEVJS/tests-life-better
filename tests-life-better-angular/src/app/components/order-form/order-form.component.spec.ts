import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { OrderFormComponent } from './order-form.component';
import { AppModule } from '../../app.module';
import userEvent from '@testing-library/user-event';

describe('Order', () => {
  describe('#first-name input', () => {
    const mockedFirstName = 'Artur';
    const firstNameLabel = 'Imię';
    const firstNameRequiredValidationMessage = 'Pole Imię nie może być puste';

    beforeEach(async () => {
      await render(OrderFormComponent, {
        imports: [AppModule],
      });
    });

    it('should properly handle typing', async () => {
      const firstNameInput = screen.getByLabelText(firstNameLabel);
      await userEvent.type(firstNameInput, mockedFirstName);

      await waitFor(() => {
        expect(firstNameInput).toHaveValue(mockedFirstName);
        expect(firstNameInput).toBeValid();
      });
    });

    it('should properly validate blur', async () => {
      const firstNameInput = screen.getByLabelText(firstNameLabel);

      fireEvent.blur(firstNameInput);

      const validationMessage = await screen.findByText(
        firstNameRequiredValidationMessage
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();
    });

    it('should properly revalidate after blur and typing', async () => {
      // const { getByLabelText, findByText, queryByText } = render(<OrderPage />);
      const firstNameInput = screen.getByLabelText(firstNameLabel);

      fireEvent.blur(firstNameInput);
      const validationMessage = await screen.findByText(
        firstNameRequiredValidationMessage
      );

      expect(validationMessage.textContent).toBeDefined();
      expect(firstNameInput).toBeInvalid();

      await userEvent.type(firstNameInput, mockedFirstName);

      expect(firstNameInput).toHaveValue(mockedFirstName);
      expect(firstNameInput).toBeValid();
    });
  });

  describe('#email input', () => {
    const mockedWrongEmailValue = 'someemail.com';
    const emailShapeValidationMessage = 'Wymagany poprawny e-mail';
    const mockedEmailValue = 'perfect@email.com';
    const emailLabel = 'E-mail';

    beforeEach(async () => {
      await render(OrderFormComponent, {
        imports: [AppModule],
      });
    });

    it('should validate shape of email when bad format', async () => {
      const emailInput = screen.getByLabelText(emailLabel);
      await userEvent.type(emailInput, mockedWrongEmailValue);

      await waitFor(() => {
        expect(emailInput).toHaveValue(mockedWrongEmailValue);
        expect(emailInput).not.toBeValid();
        expect(
          screen.queryByText(emailShapeValidationMessage)
        ).toBeInTheDocument();
      });
    });

    it('should validate shape of email when is proper', async () => {
      const emailInput = screen.getByLabelText(emailLabel);
      await userEvent.type(emailInput, mockedEmailValue);

      await waitFor(() => {
        expect(screen.queryByText(emailShapeValidationMessage)).toBeNull();
        expect(emailInput).toHaveValue(mockedEmailValue);
        expect(emailInput).toBeValid();
      });
    });
  });

  describe('Submission', () => {
    const submitButtonText = 'Zapłać';
    const firstNameLabel = 'Imię';
    const firstNameRequiredValidationMessage = 'Pole Imię nie może być puste';
    const lastNameLabel = 'Nazwisko';
    const lastNameRequiredValidationMessage =
      'Pole Nazwisko nie może być puste';
    const postalCodeLabel = 'Kod pocztowy';
    const postalCodeRequiredValidationMessage =
      'Pole Kod pocztowy nie może być puste';
    const addressLabel = 'Ulica i numer domu/mieszkania';
    const addressRequiredValidationMessage = 'To pole nie może być puste';

    beforeEach(async () => {
      await render(OrderFormComponent, {
        imports: [AppModule],
      });
    });

    it('should validate whole form when submit', async () => {
      const submitButton = screen.getByText(submitButtonText);
      await userEvent.click(submitButton);

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

  describe('Price calculation', () => {
    const priceTotalId = 'price-total';
    const priceShippingId = 'price-shipping';
    const basePriceTotal = '106.97';
    const inpostLabel = 'Kurier (InPost)';
    const pocztexLabel = 'Kurier (Pocztex)';

    beforeEach(async () => {
      await render(OrderFormComponent, {
        imports: [AppModule],
      });
    });

    it('should have base price total', () => {
      const priceTotal = screen.getByTestId(priceTotalId);
      expect(priceTotal.textContent).toBe(basePriceTotal);
    });

    it('should have proper shipping price and proper total price', async () => {
      const inpostShippingResult = '+ dostawa 10.95';
      const inpostPriceTotalResult = '117.92';
      const inpost = screen.getByLabelText(inpostLabel);

      await userEvent.click(inpost);

      const priceShipping = screen.getByTestId(priceShippingId);
      const priceTotal = screen.getByTestId(priceTotalId);

      await waitFor(() => {
        expect(priceShipping.textContent).toEqual(inpostShippingResult);
        expect(priceTotal.textContent).toEqual(inpostPriceTotalResult);
        expect(inpost).toBeChecked();
      });
    });

    it('should properly recalculate price shipping', async () => {
      const inpostShippingResult = '+ dostawa 10.95';
      const inpostPriceTotalResult = '117.92';
      const pocztexShippingResult = '+ dostawa 9.99';
      const pocztexPriceTotalResult = '116.96';
      const inpost = screen.getByLabelText(inpostLabel);
      const pocztex = screen.getByLabelText(pocztexLabel);

      await userEvent.click(inpost);

      const priceShipping = screen.getByTestId(priceShippingId);
      const priceTotal = screen.getByTestId(priceTotalId);

      await waitFor(() => {
        expect(priceShipping.textContent).toEqual(inpostShippingResult);
        expect(priceTotal.textContent).toEqual(inpostPriceTotalResult);
        expect(inpost).toBeChecked();
      });

      await userEvent.click(pocztex);

      await waitFor(() => {
        expect(inpost).not.toBeChecked();
        expect(pocztex).toBeChecked();
        expect(priceShipping.textContent).toEqual(pocztexShippingResult);
        expect(priceTotal.textContent).toEqual(pocztexPriceTotalResult);
      });
    });
  });
});

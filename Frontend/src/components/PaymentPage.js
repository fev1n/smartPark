import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/spotInfo.css';
import classNames from 'classnames';

const col1Classes = classNames('col-1', {
  'responsive-col-1': window.innerWidth <= 768,
});
const col2Classes = classNames('col-2', {
  'responsive-col-2': window.innerWidth <= 768,
});

function PaymentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="register">
      <div className={col1Classes}>
     {/* <div className="register" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}> */}
        <h2>Payment Page</h2>
        <span>Enter your payment details</span>
        <form id="form" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register('cardHolderName', {
              required: 'Card Holder Name is required',
            })}
            placeholder="Card Holder Name"
          />
          {errors.cardHolderName && <p className="error">{errors.cardHolderName.message}</p>}

          <input
            type="text"
            {...register('cardNumber', {
              required: 'Card Number is required',
              pattern: {
                value: /^[0-9]{16}$/,
                message: 'Invalid card number',
              },
            })}
            placeholder="Card Number"
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}

          <div className="password-container">
            <input
              type="text"
              {...register('cvv', {
                required: 'CVV is required',
                pattern: {
                  value: /^[0-9]{3}$/,
                  message: 'Invalid CVV',
                },
              })}
              placeholder="CVV"
            />
            {errors.cvv && <p className="error">{errors.cvv.message}</p>}
          </div>

          <input
            type="text"
            {...register('expiryDate', {
              required: 'Expiry Date is required',
            })}
            placeholder="Expiry Date"
          />
          {errors.expiryDate && <p className="error">{errors.expiryDate.message}</p>}

          <button className="btn" disabled={!isValid}>
            PROCEED
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;

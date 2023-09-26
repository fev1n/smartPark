import React from 'react';
import bgpng from '../assets/img2.jpg';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
export default function Form() {
  const { register, handleSubmit, formState: { errors, isValid }} = useForm({
    mode: 'onBlur',
  });

  

  const onSubmit = (data) => {
    if (isValid) {
      if (data.password === data.confirmpwd) {
        console.log(data);
      } else {
        console.error('Passwords do not match.');
      }
    } else {
      console.error('Form contains validation errors.');
    }
  };

  const validateEmail = (email) => {
    
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };


  return (
    <section>
      <div className="register1">
        <div className="col-1">
          <h2>Smart Park</h2>
          <span>login and enjoy the service</span>

          <form
            id='form'
            className='flex flex-col'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("email", {
                required: true,
                validate: validateEmail, 
              })}
              placeholder='email'
            />
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "validate" && "Invalid email format"}
            
            <input
              type="password"
              {...register('password')}
              placeholder="password"
            />
    
            {errors.confirmpwd?.type === 'validate' &&
              'Passwords do not match'}

            
            

            <button className='btn' disabled={!isValid}>Login</button>
            <p>
      Don't have an account? <Link to="/signup">Click here to sign up</Link>.
    </p>
          </form>
        </div>
        <div className="col-2">
          <img src={bgpng} alt="" />
        </div>
      </div>
    </section>
  );
}

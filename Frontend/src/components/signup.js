import React from "react";
import bgImg from "../assets/img1.jpeg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import "../styles/signup.css";
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const password = watch("password");

  async function onSubmit(data) {
    if (isValid) {
      if (data.password === data.password2) {
        console.log(data);
        await fetch("http://localhost:4000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).catch((err) => console.log(err));

        navigate("/login");
      } else {
        console.error("Passwords do not match.");
      }
    } else {
      console.error("Form contains validation errors.");
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Use classNames to conditionally apply classes
  const col1Classes = classNames("col-1", {
    "responsive-col-1": window.innerWidth <= 768, // Example condition
  });
  const col2Classes = classNames("col-2", {
    "responsive-col-2": window.innerWidth <= 768, // Example condition
  });

  return (
    <section>
      <div className="register">
        <div className={col1Classes}>
          {" "}
          <h2>Smart Park</h2>
          <span>Register and enjoy the service</span>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              placeholder="Name"
            />
            {errors.name?.type === "required" && "Name is required"}

            <input
              type="text"
              {...register("email", {
                required: true,
                validate: validateEmail,
              })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "validate" && "Invalid email format"}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            <input
              type="password"
              {...register("password2", {
                validate: (value) => value === password,
              })}
              placeholder="Confirm Password"
            />
            {errors.password2?.type === "validate" && "Passwords do not match"}

            <button className="btn" disabled={!isValid}>
              Sign In
            </button>
          </form>
        </div>
        <div className={col2Classes}>
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
}

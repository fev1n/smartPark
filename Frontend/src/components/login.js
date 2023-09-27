import React from "react";
import bgImg from "../assets/img2.jpg";
import "../styles/login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from "classnames";
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();

  async function onSubmit(data) {
    console.log(data);
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("token"),
        },

        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 200 && responseData.success) {
        console.log("Login successful!");

        console.log("JWT Token: ", responseData.token);

        navigate("/dashboard", { state: { email: data.email } });
      } else {
        console.error("Failed to login:", responseData);
      }
    } catch (error) {
      console.error("Error while logging in:", error);
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
      <div className="login">
        <div className={col1Classes}>
          <h2>Smart Park</h2>
          <span>Login and enjoy the service</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("email", {
                required: true,
                validate: validateEmail,
              })}
              placeholder="email"
            />
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "validate" && "Invalid email format"}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />

            {errors.password2?.type === "validate" && "Passwords do not match"}
            <button className="btn">Login</button>
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Click here to sign up</Link>.
            </p>
          </form>
        </div>
        <div className={col2Classes}>
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
}

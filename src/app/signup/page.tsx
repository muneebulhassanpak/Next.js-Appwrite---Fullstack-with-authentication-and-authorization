"use client";
import React, { useState } from "react";
import Link from "next/link";
import Inputfield from "@/components/input-field";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signuppage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const success = () => toast.success("Signup successful!");
  const failure = (message: string) => toast.error(message);
  const promise = async (myPromise: any) => {
    toast.promise(myPromise, {
      loading: "Sending",
      success: () => "Signup successful",
      error: () => "Signup failed",
    });
    const resolved = await myPromise;
  };

  const onSignup = async (e: any) => {
    e.preventDefault();
    if (
      user.email.includes("@") &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      try {
        const response = axios.post("/api/users/signup", user);
        promise(response); // Wait for the toast promise to complete
      } catch (error) {
        failure("Sending failed");
        console.error("Error during signup:", error);
      }
    } else {
      failure("Fill in the form");
    }
  };

  return (
    <>
      <section className="min-h-screen grid place-items-center">
        <form
          className="w-full max-w-lg m-auto p-2 rounded-md dark:bg-orange-200"
          onSubmit={onSignup}
        >
          <h1 className="text-center my-2 text-white dark:text-black text-2xl font-bold">
            Sign Up
          </h1>
          <Inputfield
            text="Username"
            placeholderText="Username"
            type="text"
            fieldType="regular"
            onChange={(e: any) =>
              setUser((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
          />
          <Inputfield
            text="Email"
            placeholderText="Email"
            type="email"
            fieldType="regular"
            onChange={(e: any) =>
              setUser((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <Inputfield
            text="Password"
            placeholderText="Password"
            type="password"
            fieldType="regular"
            onChange={(e: any) =>
              setUser((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
          <Inputfield
            text="SignUp"
            placeholderText="button"
            type="submit"
            fieldType="button"
          />
          <div className="text-center">
            <Link href="/login" className="text-center text-blue-700">
              Visit login page
            </Link>
          </div>
        </form>
      </section>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default Signuppage;

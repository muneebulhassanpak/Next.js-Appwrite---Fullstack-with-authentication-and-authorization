"use client";
import React, { useState } from "react";
import Link from "next/link";
import Inputfield from "@/components/input-field";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Loginpage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const failure = (message: string) => toast.error(message);
  const promise = async (myPromise: any) => {
    toast.promise(myPromise, {
      loading: "Verifying",
      success: () => "Login successful",
      error: () => "Login failed",
    });

    const resolvedResponse = await myPromise;
    return resolvedResponse;
  };

  const onLogin = async (e: any) => {
    e.preventDefault();
    if (user.email.includes("@") && user.password.length > 0) {
      try {
        const response = axios.post("/api/users/login", user);
        const computedResponse = await promise(response);
        if (computedResponse.status == 200) {
          router.push("/profile");
        }
      } catch (error) {
        failure("Sending failed");
      }
    } else {
      failure("Fill in the form");
      return;
    }
  };

  return (
    <>
      <section className="min-h-screen grid place-items-center">
        <form
          className="w-full max-w-lg m-auto p-2 rounded-md dark:bg-orange-200"
          onSubmit={onLogin}
        >
          <h1 className="text-center my-2 text-white dark:text-black text-2xl font-bold">
            Login
          </h1>
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
            text="Login"
            placeholderText="button"
            type="submit"
            fieldType="button"
          />
          <div className="text-center">
            <Link href="/signup" className="text-center text-blue-700">
              Visit Signup page
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

export default Loginpage;

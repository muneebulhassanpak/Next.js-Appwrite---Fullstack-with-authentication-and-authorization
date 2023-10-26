"use client";
import React, { use, useState } from "react";
import Link from "next/link";
import Inputfield from "@/components/input-field";

const Loginpage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = (e: any) => {
    e.preventDefault();
    console.log(user);
  };

  return (
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
  );
};

export default Loginpage;

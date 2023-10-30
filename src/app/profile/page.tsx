"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Profilepage = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const success = () => toast.success("Logout successful!");

  const logoutHandler = async () => {
    const response = await axios.get("/api/users/logout");
    response.status == 200 && success();
    router.push("/login");
  };

  const dataFetcher = async () => {
    const response = await axios.get("/api/users/profile");
    // console.log(response);

    response.status == 200
      ? setUserId(response.data.user.tokenDecoded.id)
      : null;
  };

  return (
    <>
      <div>
        <h1 className="text-center dark:text-white text-2xl">Profilepage</h1>
        {userId ? (
          <p className="text-center">
            <Link
              href={`/profile/${userId}`}
              className="bg-purple-500 text-white font-bold p-2 my-2 inline-block rounded-sm "
            >
              {userId}
            </Link>
          </p>
        ) : null}
        <div className="text-center">
          <button
            className="py-2 px-4 rounded-sm bg-blue-400 text-white mt-2"
            onClick={logoutHandler}
          >
            Logout
          </button>
          {!userId && (
            <button
              onClick={dataFetcher}
              className="py-2 px-4 rounded-sm bg-orange-400 text-white mt-2 ml-1"
            >
              Fetch Id
            </button>
          )}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Profilepage;

"use client";

const UserProfilepage = ({ params }: any) => {
  return (
    <div>
      <h1 className="text-center dark:text-white text-2xl">
        UserProfilepage {params.id}
      </h1>
    </div>
  );
};

export default UserProfilepage;

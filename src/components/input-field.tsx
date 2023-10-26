import React from "react";

const Inputfield = (props: any) => {
  if (props.fieldType == "regular") {
    return (
      <div className="my-1">
        <label
          htmlFor="username"
          className="block w-full text-white dark:text-black"
        >
          {props.text}
        </label>
        <input
          type={props.type}
          name={props.text}
          id={props.text}
          placeholder={props.placeholderText}
          onChange={props.onChange}
          className="block w-full p-2 mt-1 rounded-sm dark:bg-white dark:text-black"
        />
      </div>
    );
  } else if (props.fieldType == "button") {
    return (
      <div className="my-2 text-center">
        <input
          type={props.type}
          name={props.text}
          id={props.text}
          placeholder={props.placeholderText}
          className="inline-block cursor-pointer px-4 py-2 rounded-full mt-2 bg-black text-white dark:bg-white dark:text-black border border-black"
        />
      </div>
    );
  }
};

export default Inputfield;

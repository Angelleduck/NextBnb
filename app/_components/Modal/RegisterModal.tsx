"use client";

import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "../Input/Input";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { useState } from "react";
import type { z } from "zod";
import useLoginModal from "@/app/hooks/useLoginModal";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { register as signUp } from "@/actions/register";

type InputField = z.infer<typeof registerSchema>;

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [stateError, setStateError] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<InputField> = async (data) => {
    try {
      setSuccess("");
      const res = await signUp(data);

      if (res?.error) {
        setError("root", {
          message: res.error,
        });
      } else if (res?.success) {
        setSuccess(res.success);
      }
    } catch {
      setError("root", {
        message: "Sorry, something went wrong",
      });
    }
  };

  const handleCreateAccount = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const Body = (
    <div className="px-6 pt-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Airbnb</h1>
        <p className="text-gray-400">Create an account</p>
      </div>

      <Input
        register={register}
        label="email"
        type="email"
        id="email"
        error={stateError}
      />
      <Input
        register={register}
        label="name"
        type="text"
        id="name"
        error={stateError}
      />
      <Input
        register={register}
        label="password"
        type="password"
        id="password"
        error={stateError}
      />
    </div>
  );

  const Footer = (
    <div className="mt-4 space-y-4">
      <hr />

      {/* later */}
      {/* <Button label="continue with Google" Icon={FcGoogle} />

      <button className="relative border-2 w-full border-black rounded-lg p-3 hover:opacity-80">
        <FaGithub size={24} className="absolute left-6" />
        continue with Github
      </button> */}

      <div className="flex flex-col gap-2 justify-center font-light pt-2 min-[430px]:flex-row">
        <p className="text-neutral-500">First time using Airbnb ?</p>
        <span
          onClick={handleCreateAccount}
          className="text-slate-800 cursor-pointer hover:underline"
        >
          Already have an account?
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      title="Register"
      Body={Body}
      Footer={Footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      actionLabel="continue"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    />
  );
}

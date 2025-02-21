"use client";

import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "../Input";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import registerAction from "@/app/actions/register";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const [stateError, setStateError] = useState(false);

  async function clientAction(formData: FormData) {
    const res = await registerAction(formData);

    if (res?.error) {
      setStateError(true);
      toast.error(res.error);
    } else {
      toast.success("Account has been registered");
    }
  }
  const Body = (
    <div className="px-6 pt-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Airbnb</h1>
        <p className="text-gray-400">Create an account</p>
      </div>

      <Input label="email" type="email" id="email" error={stateError} />
      <Input label="name" type="text" id="name" error={stateError} />
      <Input
        label="password"
        type="password"
        id="password"
        error={stateError}
      />

      <div className=" pt-6 pb-1">
        <button className="bg-primary w-full rounded-lg py-4 text-white hover:opacity-80">
          Continue
        </button>
      </div>
      <hr />
    </div>
  );

  const Footer = (
    <div className="px-6 pb-6 mt-4 space-y-4">
      <Button label="continue with Google" Icon={FcGoogle} />

      <button className="relative border-2 w-full border-black rounded-lg p-3 hover:opacity-80">
        <FaGithub size={24} className="absolute left-6" />
        continue with Github
      </button>

      <div className="flex gap-2 justify-center font-light pt-2">
        <p className="text-neutral-500">Already have an account?</p>
        <span className="text-slate-800 cursor-pointer hover:underline">
          Log in
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
      clientAction={clientAction}
    />
  );
}

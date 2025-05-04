"use client";

import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "../Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useState } from "react";
import loginAction from "@/app/actions/login";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [stateError, setStateError] = useState(false);
  const router = useRouter();

  async function clientAction(formData: FormData) {
    const res = await loginAction(formData);

    if (res?.error) {
      setStateError(true);
      toast.error(res.error);
    } else {
      toast.success("you are logged in");
      loginModal.onClose();
      router.refresh();
    }
  }

  const handleCreateAccount = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };
  const Body = (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-400">Login to your account!</p>
      </div>

      <Input label="email" type="email" id="email" error={stateError} />
      <Input
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
      <Button label="continue with Google" Icon={FcGoogle} />

      <button className="relative border-2 w-full border-black rounded-lg p-3 hover:opacity-80">
        <FaGithub size={24} className="absolute left-6" />
        continue with Github
      </button>

      <div className="flex flex-col gap-2 justify-center font-light pt-2 min-[430px]:flex-row">
        <p className="text-neutral-500">First time using Airbnb ?</p>
        <span
          onClick={handleCreateAccount}
          className="text-slate-800 cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      title="Login"
      Body={Body}
      Footer={Footer}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      clientAction={clientAction}
      actionLabel="Continue"
    />
  );
}

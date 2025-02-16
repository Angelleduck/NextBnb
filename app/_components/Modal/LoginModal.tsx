"use client";

import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "../Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const Body = (
    <div className="px-6 pt-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-400">Login to your account!</p>
      </div>

      <Input label="Email" type="email" id="email" />
      <Input label="Password" type="password" id="password" />

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
        <p className="text-neutral-500">First time using Airbnb ?</p>
        <span className="text-slate-800 cursor-pointer hover:underline">
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
    />
  );
}

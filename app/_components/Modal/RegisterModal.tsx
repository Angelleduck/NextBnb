"use client";

import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "../Input/Input";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import registerAction from "@/app/actions/register";
import toast from "react-hot-toast";
import { useState } from "react";
import { z } from "zod";
import useLoginModal from "@/app/hooks/useLoginModal";

const registerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z
    .string()
    .min(4, { message: "name must be at least 4 character long" })
    .max(12, { message: "name must be at most 12 characters long" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters long" })
    .max(20, { message: "password must be at most 20 character long" })
    .regex(/[A-Z]/, "password must contain a uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "password must contain a special character"
    ),
});

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [stateError, setStateError] = useState(false);

  async function clientAction(formData: FormData) {
    //validating the data before sending to the server
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    const validation = registerSchema.safeParse({ email, name, password });

    if (validation.success == false) {
      toast.error(`${validation.error?.errors.at(0)?.message}`);
      return;
    }

    const res = await registerAction(formData);

    if (res?.error) {
      setStateError(true);
      toast.error(res.error);
    } else {
      toast.success("Account has been registered");
    }
  }

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

      <Input label="email" type="email" id="email" error={stateError} />
      <Input label="name" type="text" id="name" error={stateError} />
      <Input
        label="password"
        type="password"
        id="password"
        error={stateError}
      />
    </div>
  );

  // const Footer = (
  //   <div className="px-6 pb-6 mt-4 space-y-4">
  //     <Button label="continue with Google" Icon={FcGoogle} />

  //     <button className="relative border-2 w-full border-black rounded-lg p-3 hover:opacity-80">
  //       <FaGithub size={24} className="absolute left-6" />
  //       continue with Github
  //     </button>

  //     <div className="flex gap-2 justify-center font-light pt-2">
  //       <p className="text-neutral-500">Already have an account?</p>
  //       <span className="text-slate-800 cursor-pointer hover:underline">
  //         Log in
  //       </span>
  //     </div>
  //   </div>
  // );

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
      clientAction={clientAction}
      actionLabel="continue"
    />
  );
}

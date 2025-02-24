"use client";

import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

interface ModalProps {
  title: string;
  Body: JSX.Element;
  Footer: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  clientAction: (formData: FormData) => Promise<void>;
}
export default function Modal({
  title,
  Body,
  Footer,
  isOpen,
  onClose,
  clientAction,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) {
    return;
  }
  return (
    <div
      onClick={handleClose}
      className="inset-0 bg-neutral-800/70 fixed z-10 overflow-auto  "
    >
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        action={clientAction}
        className={`transition duration-300 w-full md:max-w-[525px] bg-white mx-auto my-10 rounded-md ${
          showModal ? "translate-y-0" : "translate-y-full"
        } ${showModal ? "opacity-100" : "opacity-0"}`}
      >
        {/* Header */}

        <div className="flex items-center justify-center p-6 relative">
          <div className="text-lg font-semibold">{title}</div>

          <IoMdClose
            size={18}
            onClick={handleClose}
            className="absolute left-9 hover:opacity-70 cursor-pointer"
          />
        </div>

        <hr />

        {/* Body */}

        {Body}
        {/* footer */}
        {Footer}
      </form>
    </div>
  );
}

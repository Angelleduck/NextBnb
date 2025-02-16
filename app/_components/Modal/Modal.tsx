"use client";

import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

interface ModalProps {
  title: string;
  Body: JSX.Element;
  Footer: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}
export default function Modal({
  title,
  Body,
  Footer,
  isOpen,
  onClose,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return;
  }
  return (
    <div className="inset-0 bg-neutral-800/70 fixed z-10 overflow-auto  ">
      <div
        className={`transition w-full md:max-w-[525px] bg-white mx-auto my-10 rounded-md ${
          showModal ? "translate-y-0" : "translate-y-full"
        } ${showModal ? "opacity-100" : "opacity-0"}`}
      >
        {/* Header */}

        <div className="flex items-center justify-center p-6 relative">
          <div className="text-lg font-semibold">{title}</div>
          <button className="absolute left-9 hover:opacity-70">
            <IoMdClose size={18} onClick={onClose} />
          </button>
        </div>

        <hr />

        {/* Body */}

        {Body}
        {/* footer */}
        {Footer}
      </div>
    </div>
  );
}

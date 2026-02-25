"use client";

import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";

interface ModalProps {
  title: string;
  Body: React.ReactNode;
  Footer?: React.ReactNode;
  isOpen: boolean;
  actionLabel: string;
  secondaryActionLabel?: string | false;
  error?: string;
  onClose: () => void;
  onSubmit: SubmitHandler<any>;
  secondaryAction?: () => void;
  handleSubmit: (
    onSubmit: SubmitHandler<any>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  onNext: () => Promise<void>;
}
export default function Modal({
  title,
  Body,
  Footer,
  isOpen,
  onClose,
  secondaryActionLabel,
  secondaryAction,
  actionLabel,
  error,
  isSubmitting,
  onNext,
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
      className="inset-0 bg-neutral-800/70 fixed z-30 overflow-auto  "
    >
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        className={`transition duration-300 w-full md:max-w-[602px] bg-white mx-auto mt-10 rounded-md ${
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
        <div className="p-6 flex flex-col gap-2">
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-2">
            {secondaryActionLabel && (
              <button
                onClick={secondaryAction}
                type="button"
                className="w-full rounded-lg py-3 hover:opacity-80 border-2 border-black"
              >
                {secondaryActionLabel}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onNext();
              }}
              disabled={isSubmitting}
              className="bg-primary w-full rounded-lg py-3 text-white hover:opacity-80"
            >
              {actionLabel}
            </button>
          </div>

          {/* footer */}
          {Footer}
        </div>
      </form>
    </div>
  );
}

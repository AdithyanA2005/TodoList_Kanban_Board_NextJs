"use client";

import { FormEvent, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import FormModalInput from "@/components/form-modal/form-modal-input";
import FormModalWrapper from "@/components/form-modal/form-modal-wrapper";
import FormModalSubmitButton from "@/components/form-modal/form-modal-submit-button";
import cn from "@/lib/utils/cn";
import { useModalStore } from "@/lib/store/modal-store";

export default function AuthModal() {
  const { authIsOpen, closeAuthModal } = useModalStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FormModalWrapper
      title="Authenticate"
      isOpen={authIsOpen}
      onSubmit={handleSubmit}
      onClose={closeAuthModal}
    >
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList className="w-full grid grid-cols-2 gap-2 mt-1">
          <AuthTab title="Login" />
          <AuthTab title="Register" />
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="space-y-2">
            <FormModalInput type="email" placeholder="Email" value={""} onChange={() => {}} />
            <FormModalInput type="password" placeholder="Password" value={""} onChange={() => {}} />
            <AlternateAction
              text="Don't have an account?"
              actionText="Register"
              action={() => setSelectedIndex(1)}
            />
          </TabPanel>

          <TabPanel className="space-y-2">
            <FormModalInput type="text" placeholder="Name" value={""} onChange={() => {}} />
            <FormModalInput type="email" placeholder="Email" value={""} onChange={() => {}} />
            <FormModalInput type="password" placeholder="Password" value={""} onChange={() => {}} />
            <AlternateAction
              text="Already have an account?"
              actionText="Sign In"
              action={() => setSelectedIndex(0)}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <FormModalSubmitButton btnText="Submit" />
    </FormModalWrapper>
  );
}

interface AuthTabProps {
  title: string;
}

interface AlternateActionProps {
  text: string;
  actionText: string;
  action: () => void;
}

function AuthTab({ title }: AuthTabProps) {
  return (
    <Tab
      className={cn(
        "col-span-1",
        "rounded-md py-2 px-3",
        "text-sm/6 font-semibold",
        "bg-blue-100 text-blue-800",
        "focus:outline-1 focus:outline-blue-900",
        "data-[selected]:bg-blue-500 data-[selected]:text-blue-50",
      )}
    >
      {title}
    </Tab>
  );
}

function AlternateAction({ text, actionText, action }: AlternateActionProps) {
  return (
    <div className="text-blue-900/90 text-[15px] flex justify-end">
      <div>
        {text}
        <button
          onClick={action}
          className="ml-0.5 font-medium cursor-pointer inline-block text-blue-600 hover:text-blue-700"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
}

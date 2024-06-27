"use client";

import { FormEvent, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import FormModalInput from "@/components/form-modal/form-modal-input";
import FormModalWrapper from "@/components/form-modal/form-modal-wrapper";
import FormModalSubmitButton from "@/components/form-modal/form-modal-submit-button";
import { useModalStore } from "@/lib/store/modal.store";
import { useFormStore } from "@/lib/store/form.store";
import { useAlertStore } from "@/lib/store/alert.stote";
import joinWithAnd from "@/lib/utils/localStorage/join-with-and";
import cn from "@/lib/utils/cn";
import { EAlertTypes } from "@/types/enums";

enum ETabs {
  Login = 0,
  Register = 1,
}

export default function AuthModal() {
  const [selectedIndex, setSelectedIndex] = useState<ETabs>(0);
  const { newAlert } = useAlertStore();
  const { authIsOpen, closeAuthModal } = useModalStore();
  const { authValues, setAuthValues, resetAuthValues } = useFormStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = authValues;

    // Find all missing fields
    const missingFields: string[] = [];
    if (selectedIndex === ETabs.Register && !name) missingFields.push("name"); // Field "name" is only present in registration tab
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    // Show alert and STOP if missing fields
    if (missingFields.length > 0) {
      newAlert(
        {
          title: `Required ${missingFields.length > 1 ? "fields are" : "field is"} missing`,
          message: `Please try again after entering your ${joinWithAnd(missingFields)}.`,
          type: EAlertTypes.Error,
        },
        5000,
      );
      return;
    }

    switch (selectedIndex) {
      case ETabs.Login:
      // TODO: Add Login
      case ETabs.Register:
      // TODO: Add Registration
    }

    resetAuthValues();
    closeAuthModal();
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
            <FormModalInput
              type="email"
              placeholder="Email"
              autoComplete="username"
              value={authValues.email}
              onChange={(e) => setAuthValues({ ...authValues, email: e.target.value })}
            />
            <FormModalInput
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={authValues.password}
              onChange={(e) => setAuthValues({ ...authValues, password: e.target.value })}
            />
            <AlternateAction
              text="Don't have an account?"
              actionText="Register"
              action={() => setSelectedIndex(ETabs.Register)}
            />
          </TabPanel>

          <TabPanel className="space-y-2">
            <FormModalInput
              type="text"
              placeholder="Name"
              autoComplete="name"
              value={authValues.name}
              onChange={(e) => setAuthValues({ ...authValues, name: e.target.value })}
            />
            <FormModalInput
              type="email"
              placeholder="Email"
              autoComplete="username"
              value={authValues.email}
              onChange={(e) => setAuthValues({ ...authValues, email: e.target.value })}
            />
            <FormModalInput
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={authValues.password}
              onChange={(e) => setAuthValues({ ...authValues, password: e.target.value })}
            />
            <AlternateAction
              text="Already have an account?"
              actionText="Sign In"
              action={() => setSelectedIndex(ETabs.Login)}
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

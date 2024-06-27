"use client";

import { FormEvent, useState } from "react";
import FormModalInput from "@/components/form-modal/form-modal-input";
import FormModalWrapper from "@/components/form-modal/form-modal-wrapper";
import FormModalSubmitButton from "@/components/form-modal/form-modal-submit-button";
import { useModalStore } from "@/lib/store/modal.store";
import { useFormStore } from "@/lib/store/form.store";
import { useAlertStore } from "@/lib/store/alert.stote";
import { useAuthStore } from "@/lib/store/auth.store";
import joinWithAnd from "@/lib/utils/join-with-and";
import { EAlertTypes } from "@/types/enums";

enum ETabs {
  Login = 0,
  Register = 1,
}

export default function AuthModal() {
  const [tab, setTab] = useState<ETabs>(ETabs.Login);
  const [submitting, setSubmitting] = useState(false);

  const { newAlert } = useAlertStore();
  const { authIsOpen, closeAuthModal } = useModalStore();
  const { authValues, setAuthValues, resetAuthValues } = useFormStore();
  const { signIn, createUser } = useAuthStore();

  const handleClose = () => {
    closeAuthModal();
    resetAuthValues();
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = authValues;

    // Find all missing fields
    const missingFields: string[] = [];
    if (tab === ETabs.Register && !name) missingFields.push("name"); // Field "name" is only present in registration tab
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

    // Sign in or register based on the selected tab
    setSubmitting(true);
    switch (tab) {
      case ETabs.Login:
        if (!email || !password) return;
        await signIn(email, password);
        break;
      case ETabs.Register:
        if (!email || !password || !name) return;
        await createUser(email, password, name);
        break;
    }
    setSubmitting(false);

    // Close the modal and reset the form values
    handleClose();
  };

  return (
    <FormModalWrapper
      title={tab === ETabs.Register ? "Register - Create new Account" : "Sign In - Login to your Account"}
      isOpen={authIsOpen}
      onSubmit={handleSubmit}
      onClose={handleClose}
    >
      <div className="space-y-2">
        {tab === ETabs.Register ? (
          <FormModalInput
            type="text"
            placeholder="Name"
            autoComplete="name"
            value={authValues.name}
            onChange={(e) => setAuthValues({ ...authValues, name: e.target.value })}
          />
        ) : null}

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
          autoComplete={tab === ETabs.Register ? "new-password" : "current-password"}
          value={authValues.password}
          onChange={(e) => setAuthValues({ ...authValues, password: e.target.value })}
        />

        {tab === ETabs.Register ? (
          <AlternateAction
            text="Already have an account?"
            actionText="Sign In"
            action={() => setTab(ETabs.Login)}
          />
        ) : (
          <AlternateAction
            text="Don't have an account?"
            actionText="Register"
            action={() => setTab(ETabs.Register)}
          />
        )}

        <FormModalSubmitButton
          btnText="Submit"
          submitting={submitting}
          disabled={
            (tab === ETabs.Register && !authValues.name) ||
            !authValues.email ||
            !authValues.password
          }
        />
      </div>
    </FormModalWrapper>
  );
}

interface AlternateActionProps {
  text: string;
  actionText: string;
  action: () => void;
}

function AlternateAction({ text, actionText, action }: AlternateActionProps) {
  return (
    <div className="text-blue-900/90 text-[15px] flex justify-end">
      {text}

      <button
        type="button"
        onClick={action}
        className="ml-0.5 font-medium cursor-pointer inline-block text-blue-600 hover:text-blue-700"
      >
        {actionText}
      </button>
    </div>
  );
}

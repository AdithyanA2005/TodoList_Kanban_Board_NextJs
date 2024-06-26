"use client";

import Avatar from "react-avatar";
import { CheckCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "@/lib/store/auth.store";
import { useModalStore } from "@/lib/store/modal.store";
import { useFormStore } from "@/lib/store/form.store";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center py-2.5 px-5 bg-white/5 filter backdrop-blur-3xl rounded-b-2xl">
        <Logo />

        <div className="flex space-x-4 flex-1 justify-end w-full">
          <SearchBox />
          {user ? <UserDropdown /> : <AuthButton />}
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <h1 className="transition hover:scale-105 px-2 space-x-2 rounded-md filter backdrop-blur-3xl flex items-center font-bold font-mono text-primary text-2xl">
      <CheckCircleIcon className="size-8 text-primary" />
      <span>AdisTodo</span>
    </h1>
  );
}

function SearchBox() {
  const { searchValue, setSearchValue } = useFormStore();

  return (
    <form className="flex-1 md:flex-initial flex items-center space-x-2 rounded-md p-2.5 shadow-md bg-white">
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />

      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1 outline-none"
      />

      <button type="submit" hidden>
        Search
      </button>
    </form>
  );
}

function UserDropdown() {
  return (
    <div>
      {/*TODO: Implement a dropdown menu*/}
      <Avatar name="Adithyan A" round color="var(--primary)" size="50" />
    </div>
  );
}

function AuthButton() {
  const { openAuthModal } = useModalStore();

  return (
    <button
      onClick={openAuthModal}
      className="py-2 px-4 rounded-md shadow-md text-white bg-gradient-to-bl from-blue-400 hover:from-blue-500 to-pink-400 hover:to-pink-500"
    >
      Login
    </button>
  );
}

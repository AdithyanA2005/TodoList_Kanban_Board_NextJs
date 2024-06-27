"use client";

import Avatar from "react-avatar";
import { useState } from "react";
import { CheckCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "@/lib/store/auth.store";
import { useModalStore } from "@/lib/store/modal.store";
import { useFormStore } from "@/lib/store/form.store";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header>
      <div className="flex z-50 flex-col md:flex-row items-center py-2.5 px-5 bg-white/5 filter backdrop-blur-3xl rounded-b-2xl">
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
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuthStore();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open user menu</span>
          <Avatar name="Adithyan A" round color="var(--primary)" size="44" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <button
            className="block w-full px-4 py-2 rounded-sm text-sm text-gray-700 hover:bg-black/10"
            onClick={signOut}
            role="menuitem"
            id="user-menu-item-2"
          >
            Sign out
          </button>
        </div>
      )}
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

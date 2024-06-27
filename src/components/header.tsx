"use client";

import { CheckCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/lib/store/auth.store";
import { useModalStore } from "@/lib/store/modal.store";
import { useFormStore } from "@/lib/store/form.store";
import cn from "@/lib/utils/cn";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header>
      <div className="flex flex-col sm:flex-row items-center gap-2 py-2.5 px-5 bg-white/5 filter backdrop-blur-3xl rounded-b-2xl">
        <Logo />

        <div className="w-full h-11 space-x-3 flex justify-center sm:justify-end">
          <SearchBox />
          {user ? <SignOutButton /> : <AuthButton />}
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
    <form className="flex-1 max-w-md sm:max-w-xs flex items-center space-x-2 rounded-md p-2.5 shadow-md bg-white">
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

function SignOutButton() {
  const { signOut } = useAuthStore();

  return (
    <button
      onClick={signOut}
      title="Sign Out"
      className={cn(
        "h-[inherit] aspect-square",
        "grid place-items-center",
        "rounded-full text-sm",
        "shadow-md filter backdrop-blur-3xl bg-white hover:bg-white/80 text-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800",
      )}
    >
      <ArrowLeftStartOnRectangleIcon className="h-6 w-6 " />
    </button>
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

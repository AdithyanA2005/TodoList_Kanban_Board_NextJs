"use client";

import Avatar from "react-avatar";
import { CheckCircleIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/board-store";
import { ChangeEventHandler } from "react";

export default function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center py-3 px-5 bg-white/5 filter backdrop-blur-3xl rounded-b-2xl">
        <Logo />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <SearchBox />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <h1 className="hover:scale-105 transition rounded-md filter backdrop-blur-3xl py-1 px-2 flex items-center space-x-2 text-2xl font-bold font-mono text-primary">
      <CheckCircleIcon className="h-10 w-10 text-primary" />
      <span>AdisTodo</span>
    </h1>
  );
}

function SearchBox() {
  const { searchString, setSearchString } = useBoardStore();

  return (
    <form className="flex items-center space-x-2 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />

      <input
        type="text"
        placeholder="Search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="flex-1 outline-none p-1"
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

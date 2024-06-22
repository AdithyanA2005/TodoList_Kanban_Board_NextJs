"use client";

import Avatar from "react-avatar";
import { CheckCircleIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-muted rounded-b-2xl">
        <Logo />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <SearchBox />
          <UserDropdown />
        </div>
      </div>

      <div className="flex items-center justify-center px-5 md:py-5">
        <AiSuggestion />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <h1 className="flex items-center space-x-2 text-2xl font-bold font-mono text-primary">
      <CheckCircleIcon className="h-10 w-10 text-primary" />
      <span>Kanban Todo</span>
    </h1>
  );
}

function SearchBox() {
  return (
    <form className="flex items-center space-x-2 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
      <input type="text" placeholder="Search" className="flex-1 outline-none p-1" />
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

function AiSuggestion() {
  return (
    <p className=" flex items-center text-sm font-light p-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-primary">
      <UserCircleIcon className="inline-block h-10 w-10 text-[inherit] mr-1 " />
      {/*TODO: Get AI to do the work*/}
      AI is summarizing your tasks please wait. This may take a few seconds. 🤖
    </p>
  );
}

"use client";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function LeftSidebar() {
  const { push } = useRouter();
  const close = () => {
    document.getElementById("left-sidebar-drawer")?.click();
  };
  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    await response.json();
    return push("/");
  };
  return (
    <div className="lg:sticky lg:pointer-events-auto drawer-side">
      <label
        htmlFor="left-sidebar-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu pt-2 w-64 bg-base-100 text-base-content h-full lg:!translate-x-0	">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>
        <li className="mb-2 font-semibold text-xl h-14 lg:flex lg:items-center">
          <span>Financial Dashboard</span>
        </li>

        <li className="mb-2 font-semibold text-xl">
          <Link href="/">Home</Link>
        </li>
        <li className="mb-2 font-semibold text-xl">
          <Link href="/404">404</Link>
        </li>
        <li className="mb-2 font-semibold text-xl">
          <button onClick={() => logout()}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;

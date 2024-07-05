"use client";

import Link from "next/link";
import React, { useState } from "react";

export function Header({ fixed }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mx-auto max-w-7xl px-6 lg:px-8">
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/about"
              className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              UNISTED
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" + (isOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col md:space-x-4 lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  href="/about"
                  className="py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className="py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                >
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/blog"
                  className="py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className="py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

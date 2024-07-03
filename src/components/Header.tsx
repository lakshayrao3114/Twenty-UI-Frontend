"use client";

import * as React from "react";

export default function Header({ isOpen, toggleSidebar }: any) {
  return (
    <div className="head part" id="header" data-theme="light">
      <div className="flex justify-center items-center py-4 px-2 bg-[lightgray] text-white shadow-lg">
        {isOpen && (
          <button onClick={() => toggleSidebar(!open)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-dark"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
        <div className="ml-auto py-2"></div>
      </div>
    </div>
  );
}

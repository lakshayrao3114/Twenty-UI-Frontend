"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const isActive = (path: any) => path === pathname;
  console.log(pathname);

  React.useEffect(() => {}, [pathname]);

  return (
    <div className="flex lakshay" id="sidebar" data-theme="light">
      <div
        className={` ${
          isOpen ? "w-0 p-0 hidden" : "w-60 "
        } flex flex-col h-screen p-3 shadow duration-300`}
      >
        <div className="space-y-3">
          {" "}
          {/* Default theme */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ">Dashboard</h2>
            <button onClick={() => toggleSidebar(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li
                className={
                  isActive("/") ? "rounded-sm bg-[gray]" : "rounded-sm"
                }
              >
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    fill="#000000"
                    width={20}
                    height={20}
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>{" "}
                    </g>
                  </svg>
                  <span>People</span>
                </Link>
              </li>
              <li
                className={
                  isActive("/settings") ? "rounded-sm bg-[gray]" : "rounded-sm"
                }
              >
                <Link
                  href="/settings"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    width={20}
                    height={20}
                    fill="#000000"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="m1739.34 1293.414-105.827 180.818-240.225-80.188-24.509 22.25c-69.91 63.586-150.211 109.666-238.644 136.771l-32.076 9.94-49.468 244.065H835.584l-49.468-244.179-32.076-9.939c-88.432-27.105-168.734-73.185-238.644-136.771l-24.508-22.25-240.226 80.189-105.826-180.82 189.74-164.442-7.453-32.978c-10.39-45.742-15.586-91.483-15.586-135.869 0-44.386 5.195-90.127 15.586-135.868l7.454-32.979-189.741-164.442 105.826-180.819 240.226 80.075 24.508-22.25c69.91-63.585 150.212-109.665 238.644-136.884l32.076-9.826 49.468-244.066h213.007l49.468 244.18 32.076 9.825c88.433 27.219 168.734 73.186 238.644 136.885l24.509 22.25 240.225-80.189 105.826 180.819-189.74 164.442 7.453 32.98c10.39 45.74 15.586 91.481 15.586 135.867 0 44.386-5.195 90.127-15.586 135.869l-7.454 32.978 189.741 164.556Zm-53.76-333.403c0-41.788-3.84-84.48-11.634-127.284l210.184-182.062-199.454-340.856-265.186 88.433c-66.974-55.567-143.322-99.388-223.85-128.414L1140.977.01H743.198l-54.663 269.704c-81.431 29.139-156.424 72.282-223.963 128.414L199.5 309.809.045 650.665l210.07 182.062c-7.68 42.804-11.52 85.496-11.52 127.284 0 41.789 3.84 84.48 11.52 127.172L.046 1269.357 199.5 1610.214l265.186-88.546c66.974 55.68 143.323 99.388 223.85 128.527l54.663 269.816h397.779l54.663-269.703c81.318-29.252 156.424-72.283 223.85-128.527l265.186 88.546 199.454-340.857-210.184-182.174c7.793-42.805 11.633-85.496 11.633-127.285ZM942.075 564.706C724.1 564.706 546.782 742.024 546.782 960c0 217.976 177.318 395.294 395.294 395.294 217.977 0 395.294-177.318 395.294-395.294 0-217.976-177.317-395.294-395.294-395.294m0 677.647c-155.633 0-282.353-126.72-282.353-282.353s126.72-282.353 282.353-282.353S1224.43 804.367 1224.43 960s-126.72 282.353-282.353 282.353"
                        fill-rule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span className="">Settings</span>
                </Link>
              </li>
              <li
                className={
                  isActive("/tasks") ? "rounded-sm bg-[gray]" : "rounded-sm"
                }
              >
                <Link
                  href="/tasks"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    width={20}
                    height={20}
                    fill="#000000"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M2,11H8a1,1,0,0,0,1-1V4A1,1,0,0,0,8,3H2A1,1,0,0,0,1,4v6A1,1,0,0,0,2,11ZM3,5H7V9H3ZM23,7a1,1,0,0,1-1,1H12a1,1,0,0,1,0-2H22A1,1,0,0,1,23,7Zm0,10a1,1,0,0,1-1,1H12a1,1,0,0,1,0-2H22A1,1,0,0,1,23,17ZM3.235,19.7,1.281,17.673a1,1,0,0,1,1.438-1.391l1.252,1.3L7.3,14.289A1,1,0,1,1,8.7,15.711l-4.046,4a1,1,0,0,1-.7.289H3.942A1,1,0,0,1,3.235,19.7Z"></path>
                    </g>
                  </svg>
                  <span className="">Tasks</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Content */}
    </div>
  );
}

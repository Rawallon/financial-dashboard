"use client";


import LeftSidebar from "@/component/LeftSidebar";


function Dashboard() {

  return (
    <div className="drawer ">
      <input
        id="left-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        <div className="w-full sticky top-0 left-0 z-[1] navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="left-sidebar-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="ml-auto">

          </div>
        </div>
        <main className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200">

        </main>
      </div>
      <LeftSidebar />
    </div>
  );
}

export default Dashboard;

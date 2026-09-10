import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Logo, LogoutbBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <Container>
        <nav className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]"
          >
            <Logo width="130px" />
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(
              (item) =>
                item.active && (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    end={item.slug === "/"}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ),
            )}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {authStatus ? (
              <>
                <LogoutbBtn />

                <Link
                  to="/add-post"
                  className="hidden rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md sm:block"
                >
                  + New Post
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-indigo-600"
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 py-3 md:hidden">
          {navItems.map(
            (item) =>
              item.active && (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  end={item.slug === "/"}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-500 hover:bg-slate-50"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ),
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;

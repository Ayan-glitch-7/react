import React from "react";
import { Link } from "react-router-dom";

import { Container, Logo } from "../index";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <div className="rounded-xl bg-white px-4 py-2">
                <Logo width="120px" />
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              A simple and modern space to share your thoughts, ideas, and
              stories with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="w-fit text-sm text-slate-400 transition-colors hover:text-indigo-400"
              >
                Home
              </Link>

              <Link
                to="/all-posts"
                className="w-fit text-sm text-slate-400 transition-colors hover:text-indigo-400"
              >
                All Posts
              </Link>

              <Link
                to="/add-post"
                className="w-fit text-sm text-slate-400 transition-colors hover:text-indigo-400"
              >
                Create Post
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              BlogSpace
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Write. Share. Inspire.
              <br />
              Your ideas deserve to be heard.
            </p>

            <Link
              to="/signup"
              className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-950/40"
            >
              Start Writing →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BlogSpace. All rights reserved.</p>

          <p>
            Built with{" "}
            <span className="font-semibold text-indigo-400">React</span> &
            Appwrite
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

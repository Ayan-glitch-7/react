import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import Service from "../appwrite/configs";
import { Button } from "./index";

function PostCard({ $id, title, featuredImage, content, status }) {
  if (status === "inactive") {
    return null;
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-200/60">
      {/* Image */}
      <Link to={`/post/${$id}`} className="block overflow-hidden">
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <img
            src={Service.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badge */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm backdrop-blur">
              Article
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/post/${$id}`}>
          <h2 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-indigo-600">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        {content && (
          <div className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
            {parse(content)}
          </div>
        )}

        {/* Bottom */}
        <div className="mt-auto pt-6">
          <Link to={`/post/${$id}`}>
            <Button className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-indigo-600">
              Read Article →
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;

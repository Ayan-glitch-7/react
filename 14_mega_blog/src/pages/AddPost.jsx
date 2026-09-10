import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-xl">
              ✍️
            </div>

            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">
              Create
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Create New Post
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Share your thoughts, ideas, and stories with the BlogSpace
              community.
            </p>
          </div>

          {/* Form Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-linear-to-r from-indigo-50 to-white px-6 py-5 md:px-8">
              <h2 className="font-bold text-slate-900">Post details</h2>
              <p className="mt-1 text-sm text-slate-500">
                Add the information below to publish your article.
              </p>
            </div>

            <div className="p-6 md:p-8">
              <PostForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddPost;

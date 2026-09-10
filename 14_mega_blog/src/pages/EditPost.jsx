import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import Service from "../appwrite/configs";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    Service.getPost(slug).then((postData) => {
      if (postData) {
        setPost(postData);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="font-medium text-slate-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
              ✏️
            </div>

            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-600">
              Manage
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Edit Post
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Update your article, change its featured image, or modify its
              publishing status.
            </p>
          </div>

          {/* Form Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-linear-to-r from-emerald-50 to-white px-6 py-5 md:px-8">
              <h2 className="font-bold text-slate-900">Post settings</h2>

              <p className="mt-1 text-sm text-slate-500">
                Make your changes and save the updated article.
              </p>
            </div>

            <div className="p-6 md:p-8">
              <PostForm post={post} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EditPost;

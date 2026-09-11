import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import Service from "../appwrite/configs";
import { Button, Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

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

  const deletePost = async () => {
    if (!post || deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const status = await Service.deletePost(post.$id);

      if (status) {
        if (post.featuredImage) {
          await Service.deleteFile(post.featuredImage);
        }

        navigate("/");
      }
    } catch (error) {
      console.error("Post :: deletePost :: error", error);
      setDeleting(false);
    }
  };

  if (!post) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="font-medium text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 md:py-14">
      <Container>
        <article className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-75 w-full overflow-hidden md:h-120">
              <img
                src={Service.getFileView(post.featuredImage)}
                alt={post.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent" />

              {/* Author Actions */}
              {isAuthor && (
                <div className="absolute right-5 top-5 flex gap-3">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button
                      bgColour="bg-white hover:bg-slate-100"
                      textColour="text-slate-800"
                      className="shadow-lg"
                    >
                      ✏️ Edit
                    </Button>
                  </Link>

                  <Button
                    bgColour="bg-red-500 hover:bg-red-600"
                    className="shadow-lg"
                    onClick={deletePost}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "🗑️ Delete"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Article Content */}
          <div className="px-6 py-10 md:px-12 md:py-14">
            <div className="mb-6">
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                Article
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>

            <div className="my-8 h-px w-full bg-slate-100" />

            <div className="browser-css max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
              {parse(post.content)}
            </div>
          </div>
        </article>

        {/* Back Button */}
        <div className="mx-auto mt-6 max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-1 hover:border-indigo-200 hover:text-indigo-600"
          >
            ← Back to home
          </Link>
        </div>
      </Container>
    </div>
  );
}

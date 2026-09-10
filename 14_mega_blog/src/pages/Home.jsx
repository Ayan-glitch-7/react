import React, { useEffect, useState } from "react";
import Service from "../appwrite/configs";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Service.getPosts()
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-slate-900">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl" />

        <Container>
          <div className="relative py-20 text-center md:py-28">
            <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-100 backdrop-blur-sm">
              Welcome to BlogSpace
            </span>

            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
              Ideas worth reading.
              <span className="block text-indigo-200">
                Stories worth sharing.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-indigo-100 md:text-lg">
              Discover thoughtful articles, inspiring stories, and fresh ideas
              from our growing community of writers.
            </p>
          </div>
        </Container>
      </section>

      {/* Posts Section */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">
                Latest articles
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Explore our posts
              </h2>

              <p className="mt-2 max-w-xl text-slate-500">
                Find something interesting to read and discover new
                perspectives.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="h-52 animate-pulse bg-slate-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-6 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="h-8 w-24 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                ✍️
              </div>

              <h3 className="text-xl font-bold text-slate-900">No posts yet</h3>

              <p className="mt-2 max-w-md text-slate-500">
                There are no published posts at the moment. Check back soon for
                something new.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import Service from "../appwrite/configs";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Service.getPosts([])
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
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <Container>
        {/* Page Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">
            Discover
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            All Posts
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Explore all the stories, ideas, and articles published by our
            community.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-52 animate-pulse bg-slate-200" />

                <div className="space-y-4 p-5">
                  <div className="h-6 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              📝
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              No posts available
            </h2>

            <p className="mt-2 max-w-md text-slate-500">
              There are currently no posts to display. New articles will appear
              here once they are published.
            </p>
          </div>
        ) : (
          /* Posts */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;

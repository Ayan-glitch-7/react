import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Input, Select, RTE } from "../index";
import Service from "../../appwrite/configs";

function PostForm({ post }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setError("");
    setLoading(true);

    try {
      if (!userData && !post) {
        setError("You must be logged in to create a post.");
        return;
      }

      if (post) {
        let featuredImage = post.featuredImage;

        if (data.image?.[0]) {
          const file = await Service.uploadFile(data.image[0]);

          if (!file) {
            setError("Failed to upload the new image.");
            return;
          }

          featuredImage = file.$id;

          if (post.featuredImage) {
            await Service.deleteFile(post.featuredImage);
          }
        }

        const dbPost = await Service.updatePost(post.$id, {
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage,
          status: data.status,
        });

        if (!dbPost) {
          setError("Failed to update the post.");
          return;
        }

        navigate(`/post/${dbPost.$id}`);
        return;
      }

      if (!data.image?.[0]) {
        setError("Please select a featured image.");
        return;
      }

      const file = await Service.uploadFile(data.image[0]);

      if (!file) {
        setError("Failed to upload the image.");
        return;
      }

      const dbPost = await Service.createPost({
        title: data.title,
        slug: data.slug,
        content: data.content,
        featuredImage: file.$id,
        status: data.status,
        userId: userData.$id,
      });

      if (!dbPost) {
        await Service.deleteFile(file.$id);
        setError("Failed to create the post.");
        return;
      }

      navigate(`/post/${dbPost.$id}`);
    } catch (error) {
      console.error("PostForm :: submit :: error", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (!value || typeof value !== "string") {
      return "";
    }

    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && !post) {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue, post]);

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-8 lg:grid-cols-3">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <div className="space-y-6">
          <div>
            <Input
              label="Title"
              placeholder="Enter your post title"
              {...register("title", {
                required: "Title is required",
              })}
            />

            {errors.title && (
              <p className="mt-1.5 pl-1 text-xs font-medium text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Slug"
              placeholder="your-post-slug"
              {...register("slug", {
                required: "Slug is required",
              })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />

            {errors.slug && (
              <p className="mt-1.5 pl-1 text-xs font-medium text-red-500">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Post settings</h3>

            <p className="mt-1 text-sm text-slate-500">
              Configure your article before publishing.
            </p>
          </div>

          <div className="space-y-6">
            {/* Featured Image */}
            <div>
              <Input
                label="Featured Image"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {
                  required: !post ? "Featured image is required" : false,
                })}
              />

              <p className="mt-2 text-xs text-slate-400">
                PNG, JPG, JPEG or GIF
              </p>

              {errors.image && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Current Image */}
            {post?.featuredImage && (
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Current Image
                </p>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <img
                    src={Service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Status */}
            <Select
              options={["active", "inactive"]}
              label="Status"
              {...register("status", {
                required: true,
              })}
            />

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              bgColour={post ? "bg-emerald-600" : "bg-indigo-600"}
              className="w-full rounded-xl py-3.5 font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {loading
                ? post
                  ? "Updating..."
                  : "Publishing..."
                : post
                  ? "Update Post"
                  : "Publish Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostForm;

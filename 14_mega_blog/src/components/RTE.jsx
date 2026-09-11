import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block pl-1 text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={value || ""}
              onEditorChange={onChange}
              init={{
                height: 450,
                menubar: false,
                branding: false,
                resize: false,

                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],

                toolbar:
                  "undo redo | blocks | " +
                  "bold italic underline | " +
                  "alignleft aligncenter alignright | " +
                  "bullist numlist | " +
                  "link image | " +
                  "removeformat | code fullscreen",

                content_style: `
                  body {
                    font-family:
                      Inter,
                      ui-sans-serif,
                      system-ui,
                      -apple-system,
                      BlinkMacSystemFont,
                      "Segoe UI",
                      sans-serif;
                    font-size: 16px;
                    line-height: 1.8;
                    color: #334155;
                    padding: 12px;
                    background: #ffffff;
                  }

                  h1,
                  h2,
                  h3 {
                    color: #0f172a;
                  }

                  a {
                    color: #4f46e5;
                  }
                `,
              }}
            />
          )}
        />
      </div>

      <p className="mt-2 pl-1 text-xs text-slate-400">
        Write your article content here. You can format text, add links, images,
        lists and more.
      </p>
    </div>
  );
}

export default RTE;

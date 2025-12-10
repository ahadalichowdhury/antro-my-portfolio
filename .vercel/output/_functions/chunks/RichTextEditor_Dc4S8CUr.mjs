import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

function RichTextEditor({
  initialValue = ""
}) {
  const [ReactQuill, setReactQuill] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const quillRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && !ReactQuill) {
      import('./index_BHQoosBu.mjs').then(n => n.i).then((module) => {
        setReactQuill(() => module.default);
        Promise.resolve({                   });
        setIsLoaded(true);
      });
    }
  }, []);
  useEffect(() => {
    if (isLoaded && quillRef.current && initialValue) {
      quillRef.current.getEditor().root.innerHTML = initialValue;
    }
  }, [initialValue, isLoaded]);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block"],
      ["clean"]
    ]
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "code-block"
  ];
  if (!ReactQuill) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          marginBottom: "20px",
          minHeight: "300px",
          padding: "20px",
          border: "1px solid var(--border-color)",
          borderRadius: "6px"
        },
        children: /* @__PURE__ */ jsx("p", { children: "Loading editor..." })
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { style: { marginBottom: "20px" }, children: [
    /* @__PURE__ */ jsx(
      ReactQuill,
      {
        ref: quillRef,
        theme: "snow",
        modules,
        formats,
        placeholder: "Write your blog post content here...",
        defaultValue: initialValue,
        style: {
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)"
        }
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        .ql-container {
          font-family: var(--font-family);
          font-size: 16px;
          min-height: 300px;
        }
        .ql-editor {
          min-height: 300px;
        }
        .ql-toolbar {
          border-top: 1px solid var(--border-color);
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          border-bottom: none;
        }
        .ql-container {
          border-bottom: 1px solid var(--border-color);
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          border-top: none;
        }
        .ql-editor.ql-blank::before {
          color: var(--text-tertiary);
        }
      ` })
  ] });
}

export { RichTextEditor as R };

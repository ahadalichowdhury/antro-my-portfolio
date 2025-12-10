import { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
  initialValue?: string;
}

export default function RichTextEditor({
  initialValue = "",
}: RichTextEditorProps) {
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    // Only load react-quill on the client side
    if (typeof window !== "undefined" && !ReactQuill) {
      import("react-quill").then((module) => {
        setReactQuill(() => module.default);
        // Load CSS
        import("react-quill/dist/quill.snow.css");
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
      ["clean"],
    ],
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
    "code-block",
  ];

  if (!ReactQuill) {
    return (
      <div
        style={{
          marginBottom: "20px",
          minHeight: "300px",
          padding: "20px",
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
        }}
      >
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Write your blog post content here..."
        defaultValue={initialValue}
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      />
      <style>{`
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
      `}</style>
    </div>
  );
}

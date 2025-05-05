import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, EditorState } from "lexical";

interface LexicalEditorProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

export function LexicalEditor({ onChange, placeholder }: LexicalEditorProps) {
  const initialConfig = {
    namespace: "ChronologEditor",
    onError(error: Error) {
      console.error("LexicalEditorError", error);
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="outline-none w-full h-48 font-mono" spellCheck={false} />}
        placeholder={<div className="text-gray-400">{placeholder}</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState: EditorState) => {
          console.log("onChange", editorState, editorState.toJSON());
          editorState.read(() => {
            const text = $getRoot().getTextContent();
            console.log(text);
            onChange(text);
          });
        }}
      />
    </LexicalComposer>
  );
}

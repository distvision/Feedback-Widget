import { useState } from "react";

// components
import { CloseButton } from "../CloseButton";
import { FeedbackTypeSteps } from "./Steps/FeedbackTypeStep";
import { FeedbackContentSteps } from "./Steps/FeedbackContentSteps";

// Images
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoghtImageUrl from "../../assets/thought.svg";
import { FeedbackSuccessSteps } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto"
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lampada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoghtImageUrl,
      alt: "Imagem de um balão de pensamento"
    }
  }
};

// definir as chaves que são os parametros do objeto
// > feedbackTypes{BUG,IDEA,OTHER} para o serem os tipos do FeedBackTypes
// para serem usados com States no onClick

export type FeedBackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedBackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessSteps
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeSteps onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentSteps
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{" "}
        <a
          className="underline underline-offset-2"
          href="https://www.rocketseat.com.br/"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}

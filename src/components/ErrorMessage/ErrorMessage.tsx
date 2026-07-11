import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  type: "empty" | "error";
}

export default function ErrorMessage({ type }: ErrorMessageProps) {
  return (
    <p className={css.text}>
      {type === "empty" ?
        "Please enter your search query."
      : "No movies found for your request."}
    </p>
  );
}

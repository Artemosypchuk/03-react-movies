import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (rawValue: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSearchAction = (formData: FormData): void => {
    const rawValue = formData.get("query");

    if (typeof rawValue !== "string" || !rawValue.trim()) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(rawValue.trim());
  };
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSearchAction} className={css.form}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;

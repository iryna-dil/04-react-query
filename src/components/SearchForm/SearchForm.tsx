import { type ChangeEvent, type FormEvent, useState } from "react";

import css from "./SearchForm.module.css";

interface SearchFormProps {
  query: string;
  isLoading: boolean;
  onSubmit: (query: string) => void;
}

const SearchForm = ({ query, isLoading, onSubmit }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState(query);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    onSubmit(trimmedValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search movies..."
        aria-label="Search movies"
      />
      <button className={css.button} type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;

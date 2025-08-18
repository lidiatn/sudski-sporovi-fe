interface UrlInputPros {
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UrlInput = ({ value, onChange, className } : UrlInputPros) => (
    <input
        type="text"
        placeholder="https://www.zakon.hr/..."
        value={value}
        onChange={onChange}
        className={`bg-gray-50 border border-black-200 text-black-400
                   text-sm rounded-lg focus:ring-blue-900 focus:border-blue-500
                   block w-full p-2.5 bg-[var(--button-base)] dark:border-black
                   dark:placeholder-gray-30 dark:text-black-400
                   dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className || ""}`}
    />
);

export default UrlInput;
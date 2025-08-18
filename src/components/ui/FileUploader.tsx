interface FileUploaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader = ({ onChange }: FileUploaderProps) =>
    (
    <>
      <label htmlFor="fileInput"
          className="cursor-pointer inline-block bg-[var(--button-base)] rounded-lg
                     px-4 py-1 text-base text-black font-['Arial', 'sans-serif']
                     hover:bg-[var(--button-hover)] transition-colors
                     border-white-100
                     border-1"
      >
        📄 Odaberi datoteku
      </label>

      <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          onChange={onChange}
          className="hidden"
      />
    </>
);

export default FileUploader;
type LoadingSpinnerProps = {
  text?: string;
};

export const LoadingSpinner = ({ text = "Analiziram" }: LoadingSpinnerProps) => (
    <div className="flex justify-center items-center h-full flex-col space-y-4">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800" />
      <h1>{text}</h1>
    </div>
);
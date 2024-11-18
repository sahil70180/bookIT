"use client"; // Error boundaries must be Client Components
interface CustomError extends Error {
  errorMessage?: string;
  digest?: string;
}

export default function Error({
  error,
  reset,
}: {
  error: CustomError;
  reset?: () => void;
}) {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h2 className="display-bold">
            {error?.errorMessage || "Error Found"}
          </h2>
          <p>
            <span className="text-danger">Oops!</span>
            something went wrong
          </p>
          <p className="lead">Sorry for inconvenience</p>
          <button
            className="btn btn-primary"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset?.()
            }
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

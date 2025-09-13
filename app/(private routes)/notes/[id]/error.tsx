'use client';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error ({ error, reset }: Props) {
  return (
    <div>
      <h2>Error loading data</h2>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again ...</button>
    </div>
  );
};


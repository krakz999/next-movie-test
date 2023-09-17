"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col h-screen gap-6 items-center justify-center">
      <h2>Something went wrong!</h2>
      <button className="font-bold" onClick={() => reset()}>
        Click here to try again
      </button>
    </div>
  );
}

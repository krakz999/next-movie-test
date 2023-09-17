import { useIsMounted } from "@/hooks/useIsMounted";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export default function FavoriteButton({ active, onClick }: Props) {
  const isMounted = useIsMounted();
  const activeStyle = "fill-rating text-rating";

  // As favorites are exclusively stored in the client side
  // prevent rendering this component before it is mounted for better UX
  if (!isMounted) return null;

  return (
    <div className="pointer-events-auto" {...{ onClick }}>
      <svg
        className={twMerge(
          "w-6 h-6 text-white fill-transparent hover:text-rating transition-colors",
          active && activeStyle
        )}
        viewBox="0 0 22 22"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.153 4.408C9.42 2.136 10.053 1 11 1C11.947 1 12.58 2.136 13.847 4.408L14.175 4.996C14.535 5.642 14.715 5.965 14.995 6.178C15.275 6.391 15.625 6.47 16.325 6.628L16.961 6.772C19.421 7.329 20.65 7.607 20.943 8.548C21.235 9.488 20.397 10.469 18.72 12.43L18.286 12.937C17.81 13.494 17.571 13.773 17.464 14.117C17.357 14.462 17.393 14.834 17.465 15.577L17.531 16.254C17.784 18.871 17.911 20.179 17.145 20.76C16.379 21.342 15.227 20.811 12.925 19.751L12.328 19.477C11.674 19.175 11.347 19.025 11 19.025C10.653 19.025 10.326 19.175 9.671 19.477L9.076 19.751C6.773 20.811 5.621 21.341 4.856 20.761C4.089 20.179 4.216 18.871 4.469 16.254L4.535 15.578C4.607 14.834 4.643 14.462 4.535 14.118C4.429 13.773 4.19 13.494 3.714 12.938L3.28 12.43C1.603 10.47 0.765 9.489 1.057 8.548C1.35 7.607 2.58 7.328 5.04 6.772L5.676 6.628C6.375 6.47 6.724 6.391 7.005 6.178C7.285 5.965 7.465 5.642 7.825 4.996L8.153 4.408Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

import clsx from "clsx";
import type { ReactNode } from "react";

export default function PagingButton({
  buttonText,
  hoverText,
  onClick,
}: {
  buttonText: ReactNode;
  hoverText: string;
  onClick: () => void;
}) {
  return (
    <div className="relative group w-max">
      <button
        data-original-title={hoverText}
        className={clsx(
          "cursor-pointer text-xl",
          hoverText !== "Page 0" ? "text-black" : "text-gray-400",
        )}
        onClick={onClick}
        disabled={hoverText == "Page 0"}
      >
        {buttonText}
      </button>

      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded w-17.5 text-center z-50">
        {hoverText}
      </span>
    </div>
  );
}

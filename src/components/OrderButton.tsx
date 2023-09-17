import React from "react";
import Button from "./Button";
import { SortOrder } from "@/lib/tmdb";

type Props = {
  value: SortOrder;
  onChange: (order: SortOrder) => void;
};

export default function OrderButton({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white/50">Order:</span>

      <Button
        onClick={() =>
          onChange(
            value === SortOrder.Descending
              ? SortOrder.Ascending
              : SortOrder.Descending
          )
        }
      >
        {value === SortOrder.Descending ? "Descending" : "Ascending"}
      </Button>
    </div>
  );
}

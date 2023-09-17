"use client";

import { HydrateProps, Hydrate } from "@tanstack/react-query";
import React from "react";

export default function ReactQueryHydrate(props: HydrateProps) {
  return <Hydrate {...props} />;
}

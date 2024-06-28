"use client";
import Link from "next/link";
import { useContext, useEffect , useState } from "react";
import { ChatAppConect } from "./Context/ChatAppContext";
export default  function Page() {
  const { title } = useContext(ChatAppConect);
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
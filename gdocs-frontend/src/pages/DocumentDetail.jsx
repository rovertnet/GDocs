import React from "react";
import { useParams } from "react-router-dom";

export default function DocumentsDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Détail du document</h2>
      <p>ID du document : {id}</p>
    </div>
  );
}

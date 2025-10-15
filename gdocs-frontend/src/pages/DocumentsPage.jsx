import { useState } from "react";
import DocumentUpload from "../component/DocumentUpload";
import DocumentList from "../component/DocumentsList";

export default function DocumentsPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🗂️ Gestion des Documents
      </h1>
      <DocumentUpload onUploaded={() => setRefresh((r) => r + 1)} />
      <DocumentList refreshTrigger={refresh} />
    </div>
  );
}

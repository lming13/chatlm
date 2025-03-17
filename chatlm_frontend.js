import { useState } from "react";
import axios from "axios";

export default function ChatLM() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);

  const handleChat = async () => {
    try {
      const res = await axios.post("http://chatlm-backend-service/chat", { question });
      setResponse(res.data.response);
    } catch (error) {
      setResponse("Erreur de communication avec le serveur");
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      await axios.post("http://chatlm-backend-service/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Fichier ajouté avec succès");
    } catch (error) {
      alert("Erreur lors de l'ajout du fichier");
    }
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">ChatLM - Assistant Maison</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Posez votre question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleChat} className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
          Envoyer
        </button>
        <div className="mt-4 p-2 bg-gray-100 rounded">{response}</div>
      </div>
      <form onSubmit={handleFileUpload} className="mt-6 flex flex-col items-center">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Ajouter un document
        </button>
      </form>
    </div>
  );
}

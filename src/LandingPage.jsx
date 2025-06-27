import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [showRoute, setShowRoute] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileMessage, setFileMessage] = useState("");

  const submitEmail = (e) => {
    e.preventDefault();
    alert(`Merci, ${email} ! Vous serez tenu·e informé·e dès les prochaines nouvelles.`);
    setEmail("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileMessage("Fichier trop volumineux (10 Mo max)");
        return;
      }
      if (!file.type.startsWith("audio/")) {
        setFileMessage("Veuillez déposer un fichier audio seulement.");
        return;
      }
      setFileMessage(`Fichier reçu : ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf8f0] text-gray-900 flex flex-col font-sans">
      {/* Hero */}
      <section className="relative w-full h-[75vh] flex flex-col items-center justify-center px-4 text-center bg-[#fdf8f0]">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1f1f1f] mb-4 uppercase">
          Utopiste par Piste
        </h1>
        <p className="text-lg md:text-xl max-w-xl text-[#333]">
          L'installation sonore nomade qui fait voyager vos histoires et fait vibrer les territoires.
        </p>
      </section>

      {/* About */}
      <section className="py-20 px-6 md:px-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Le projet</h2>
          <p className="mb-4 leading-relaxed text-lg">
            <strong>Utopiste par Piste</strong> est porté par <strong>Cyclaudio</strong>, une association loi 1901. Ce projet questionne notre rapport à la mobilité, au voyage, à l'écologie et au lien social. À travers une installation sonore nomade montée sur un vélo cargo, nous allons à la rencontre des voix et des récits.
          </p>
          <p className="leading-relaxed text-lg">
            Chaque escale est l’occasion d’écouter <em>et</em> de contribuer à une œuvre audio collective. Témoignages, sons de paysages, lectures, rencontres… tout ce qui parle d’itinérance et de déplacement est le bienvenu.
          </p>
        </div>
      </section>

      {/* Drop audio */}
      <section
        className={`py-24 px-6 md:px-20 text-center transition-all duration-200 ${dragActive ? "bg-blue-50" : "bg-gray-100"}`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <div className="text-6xl mb-6">📤</div>
        <h3 className="text-2xl font-semibold mb-2">Déposez ici votre fichier audio</h3>
        <p className="text-gray-600 mb-4">Format mp3 recommandé – max. 10 Mo</p>
        {fileMessage && <p className="text-sm text-blue-700 font-medium">{fileMessage}</p>}
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-20 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Restez connecté·e</h2>
          <p className="mb-6 text-lg">
            Abonnez-vous à la newsletter de Cyclaudio pour suivre la tournée, recevoir les appels à récits, et écouter les dernières histoires.
          </p>
          <form onSubmit={submitEmail} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-[#d9534f] text-white px-6 py-2 rounded-md hover:bg-[#c9302c]"
            >
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

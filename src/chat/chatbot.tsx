import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IoMdSend } from "react-icons/io";

const socket = io("http://localhost:3000"); // Conexión persistente

const Chatbot = () => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState<string[]>([]);

  useEffect(() => {
    socket.on("respuesta", (respuesta: string) => {
      setMensajes((prev) => [...prev, `🤖 ${respuesta}`]);
    });

    return () => {
      socket.off("respuesta");
    };
  }, []);

  const enviarMensaje = () => {
    if (mensaje.trim() !== "") {
      socket.emit("mensaje", mensaje);
      setMensajes((prev) => [...prev, mensaje]); // sin 🤖
      setMensaje("");
    }
  };

  return (
    <div className="bg-white w-[80%] flex flex-col justify-between items-center shadow-md rounded-lg p-5 h-screen">
      <h1 className="text-xl font-semibold">Chatbot</h1>

      <div className="h-full w-full overflow-y-auto p-2 rounded text-sm flex flex-col gap-2 mt-4 mb-4">
        {mensajes.map((msg, idx) => {
          const esBot = msg.startsWith("🤖");
          const texto = esBot ? msg.replace("🤖 ", "") : msg;

          return (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-xl ${
                esBot
                  ? "bg-gray-100 text-gray-800 self-start"
                  : "bg-blue-500 rounded-tl-lg rounded-tr-none px-10 rounded-br-lg text-white self-end ml-auto"
              }`}
            >
              {texto}
            </div>
          );
        })}
      </div>

      <div className="flex w-full">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 rounded-l-2xl border-2 border-[#0E457D] px-3 py-2 focus:outline-none focus:ring-0 focus:border-[#182c3f]"
        />
        <button
          onClick={enviarMensaje}
          className="bg-[#0E457D] text-white px-4 flex items-center justify-center w-[80px] rounded-r-2xl"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

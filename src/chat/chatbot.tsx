import { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

type Inputs = {
  pregunta: string;
  tema: number;
};

const Chatbot = () => {
  const [mensajes, setMensajes] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const temaId = location.state?.temaId;
  const temaTitle = location.state?.temaTitle;
  const archivo = location.state?.archivo;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      pregunta: "",
      tema: temaId,
    },
  });

  // Referencia al contenedor de mensajes
  const mensajesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (temaId) {
      setValue("tema", temaId);
    }
  }, [temaId, setValue]);

  // Efecto para hacer scroll hacia abajo cada vez que se agregan nuevos mensajes
  useEffect(() => {
    if (mensajesContainerRef.current) {
      mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight;
    }
  }, [mensajes]); // Se ejecuta cada vez que los mensajes cambian

  const onSubmit = async (data: Inputs) => {
    if (!data.pregunta || !data.tema) {
      console.error("Faltan campos obligatorios");
      return;
    }

    const url = import.meta.env.VITE_API_URL + "/preguntar/";
    const token = Cookies.get("access_token");

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const respuestaBot = response.data.respuesta;

      const nuevosMensajes = [
        ...mensajes,
        data.pregunta,
        `🤖 ${respuestaBot}`,
      ];
      setMensajes(nuevosMensajes);
      setValue("pregunta", "");
    } catch (error: any) {
      console.error("Error al enviar el mensaje:", error);
      if (error.response?.status === 401) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        navigate("/login");
      } else if (error.response) {
        console.error("Detalles del error del servidor:", error.response.data);
      }
    }
  };
  console.log("Mensajes:", mensajes);
  console.log("Tema ID:", temaId);
  console.log("Tema Title:", temaTitle);
  console.log("Archivo:", archivo);
  
  return (
    <div className="bg-white w-[80%] flex flex-col justify-between items-center shadow-md rounded-lg p-5 h-screen">
      <h1 className="text-xl font-semibold">Chatbot - {temaTitle}</h1>

      <div
        className="h-full w-full overflow-y-auto p-2 rounded text-sm flex flex-col gap-2 mt-4 mb-4"
        ref={mensajesContainerRef} // Asignamos la referencia aquí
      >
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            {...register("pregunta", { required: "Este campo es obligatorio" })}
            className="flex-1 rounded-l-2xl border-2 border-[#0E457D] px-3 py-2 focus:outline-none focus:ring-0 focus:border-[#182c3f]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          {errors.pregunta && (
            <span className="text-red-500 text-xs ml-2">
              {errors.pregunta.message}
            </span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#0E457D] text-white px-4 flex items-center justify-center w-[100px] rounded-r-2xl transition-all duration-200`}
          >
            {isSubmitting ? "Enviando..." : <IoMdSend size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

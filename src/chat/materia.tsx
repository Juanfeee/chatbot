import axios from "axios";
import { InputLabel } from "../componentes/InputLabel";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import quimerito from '/src/assets/quimerito.png';
import '../materia.css';

const Materia = () => {
  const [temas, setTemas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const url2 = import.meta.env.VITE_API_URL + "/temas/";
  const token = Cookies.get("access_token");

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      setError("No se encontró el token de acceso.");
      navigate("/login");
      return;
    }

    axios
      .get(url2, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        timeout: 10000,
      })
      .then((response) => {
        setTemas(response.data);
        setError(null);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          setError("No autorizado. El token ha expirado o no es válido.");
          navigate("/login");
        } else {
          setError("Hubo un error al obtener los temas.");
        }
        console.error("Error:", error);
      });
  }, [token, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const selectedTemaId = Number(formData.get("materia"));
    const selectedTema = temas.find((tema) => tema.id === selectedTemaId);

    if (selectedTema) {
      console.log("Tema seleccionado:", selectedTema.id, selectedTema.titulo, selectedTema.archivo);
      navigate("/chatbot", {
        state: {
          temaId: selectedTema.id,
          temaTitle: selectedTema.titulo,
          archivo: selectedTema.archivo,
        },
      });
    } else {
      setError("No se seleccionó un tema válido.");
      console.error("No se seleccionó un tema válido.");
    }
  };

  return (
    <div className="bg-white w-[800px] flex flex-col justify-center items-center shadow-md rounded-lg p-10 gap-x-10 h-[80vh] gap-y-8">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold">QuimerIA</h1>
        <button
          onClick={handleLogout}
          className="text-end text-white bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out px-3 py-1 rounded-full text-lg shadow-lg"
          title="Cerrar sesión"
        >
          ✕
        </button>
      </div>
      <form className="flex flex-col gap-y-8 w-full h-full px-2" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">Empecemos</h1>
        <div className="text-start">
          <InputLabel htmlFor="materia" value="Seleccione una materia" />
          <select
            defaultValue=""
            name="materia"
            id="materia"
            className="w-full h-11 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition duration-150 ease-in-out"
          >
            <option value="" disabled>
              Seleccione una opción
            </option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.titulo}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          className="bg-blue-500 text-white w-fit p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-150 ease-in-out"
          type="submit"
        >
          Empezar a charlar con QuimerIA
        </button>
      </form>
    </div>
  );
};

export default Materia;

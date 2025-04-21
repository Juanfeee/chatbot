import { Link } from "react-router"
import { InputLabel } from "../componentes/InputLabel"
import TextInput from "../componentes/TextInput"
import { set, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import Cookies from "js-cookie"
import InputErrors from "../componentes/InputErrors"
import { loginSchema } from "../validaciones/loginSchema"

type Inputs = {
  username: string;
  password: string;
}


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const url = import.meta.env.VITE_API_URL + "/token/";

    const loginPromise = axios.post(url, data, {

      //Cabeceras de la peticion
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido
        'Accept': 'application/json' // Aceptar respuesta en formato JSON
      },
      timeout: 10000 // 10 segundos timeout
    })
    toast.promise(loginPromise, {
      pending: "Iniciando sesion...",
      success: {
        render({ data }) {
          // Guardar el token en las cookies
          Cookies.set("access_token", data.data.access, { expires: 1 });
          Cookies.set("refresh_token", data.data.refresh, { expires: 1 });
          setTimeout(() => {
            window.location.href = "/materia"; // Redirigir a la página de materias
          }, 500);
          return "Inicio de sesion exitoso!";
        }, autoClose: 500
      },
      error: {
        render({ data }) {
          const error = data;
          if (axios.isAxiosError(error)) {
            if (error.code === "ECONNABORTED") {
              return "Tiempo de espera agotado. Intente nuevamente";
            } else if (error.response) {
              switch (error.response.status) {
                case 401:
                  return "Credenciales incorrectas";
                case 500:
                  return "Error en el servidor";
                default:
                  return error.response.data?.message || "Error al iniciar sesión";
              }
            } else if (error.request) {
              return "No se recibió respuesta del servidor";
            }
          }
          return "Error al iniciar sesión";
        },
        autoClose: 2000,

      }
    });

  }
  return (
    <>
      <ToastContainer />
      <div className="bg-white w-[500px] flex flex-col justify-center items-center shadow-md rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 w-full p-10 " >
          <h1 className="text-2xl font-bold text-center">Inicio de sesion</h1>
          <div className="text-start">
            <InputLabel
              htmlFor="username"
              value="Usuario"
            />
            <TextInput
              placeholder="usuario"
              type="text"
              id="username"
              {...register("username")}
            />
            <InputErrors errors={errors} name="username" />
          </div>
          <div className="text-start">
            <InputLabel
              htmlFor="password"
              value="Contraseña"
            />
            <TextInput
              placeholder="Contraseña"
              type="text"
              id="password"
              {...register("password")}
            />
            <InputErrors errors={errors} name="password" />
          </div>
          <button className="bg-blue-500 text-white h-11 rounded-lg font-semibold hover:bg-blue-600 transition duration-150 ease-in-out" type="submit">Iniciar sesion</button>
          <p className="text-sm text-gray-500 text-center">¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:text-blue-600">Registrate</Link></p>
        </form>
      </div>
    </>
  )
}
export default Login
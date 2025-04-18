import { InputLabel } from "../componentes/InputLabel"
import TextInput from "../componentes/TextInput"

const Login = () => {
  return (
    <>
      <div className="bg-white w-[500px] flex flex-col justify-center items-center shadow-md rounded-lg">
        <form className="flex flex-col gap-y-5 w-full p-10 " >
          <h1 className="text-2xl font-bold text-center">Inicio de sesion</h1>
          <div className="text-start">
            <InputLabel
              htmlFor="email"
              value="Email"
            />
            <TextInput
              placeholder="Email"
              type="text"
            />
          </div>
          <div className="text-start">
            <InputLabel
              htmlFor="password"
              value="Contraseña"
            />
            <TextInput
              placeholder="Contraseña"
              type="text"
            />
          </div>
          <button className="bg-blue-500 text-white h-11 rounded-lg font-semibold hover:bg-blue-600 transition duration-150 ease-in-out" type="submit">Iniciar sesion</button>
          <p className="text-sm text-gray-500 text-center">¿No tienes una cuenta? <a href="/register" className="text-blue-500 hover:text-blue-600">Registrate</a></p>
        </form>
      </div>
    </>
  )
}
export default Login
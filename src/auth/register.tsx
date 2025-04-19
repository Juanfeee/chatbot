import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { InputLabel } from '../componentes/InputLabel';
import TextInput from '../componentes/TextInput';
import InputErrors from '../componentes/InputErrors';
import { registerSchema } from '../validaciones/registerSchema';

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  is_profesor: boolean;
  is_estudiante: boolean;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      is_profesor: false,
      is_estudiante: true,
    },
  });

  // Manejar cambio de rol
  const handleRoleChange = (role: 'profesor' | 'estudiante') => {
    setValue('is_profesor', role === 'profesor');
    setValue('is_estudiante', role === 'estudiante');
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const url = import.meta.env.VITE_API_URL + "/registro/";
      
      // Preparamos los datos para enviar
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        is_profesor: data.is_profesor,
        is_estudiante: data.is_estudiante
      };


      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });
      //toast duracion 5s

      toast.success("Registro exitoso", {
        autoClose: 1000,
      });

      // Redirigir a la página de inicio de sesión con delay
      setTimeout(() => {
      window.location.href = "/login"; // Redirigir a la página de inicio de sesión
      
      }, 1500); // 2 segundos
    } catch (error) {
      let errorMessage = "Error al registrar";

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          errorMessage = "Tiempo de espera agotado. Intente nuevamente";
        } else if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = error.response.data?.message || "Email ya existe";
              break;
            case 500:
              errorMessage = "Error en el servidor";
              break;
            default:
              errorMessage = error.response.data?.message || "Error desconocido";
          }
        }
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000
      });
    }
  };

  // Observamos los valores actuales de los roles
  const currentRole = watch("is_profesor") ? 'profesor' : 'estudiante';

  return (
    <>
      <ToastContainer />
      <div className="bg-white w-[500px] flex flex-col justify-center items-center shadow-md rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 w-full p-10"
        >
          <h1 className="text-2xl font-bold text-center">Registro</h1>

          <div className="text-start">
            <InputLabel htmlFor="username" value="Nombre" />
            <TextInput
              placeholder="Nombre"
              type="text"
              id="username"
              {...register("username")}
            />
            <InputErrors errors={errors} name="username" />
          </div>

          <div className="text-start">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              placeholder="Email"
              type="email"
              id="email"
              {...register("email")}
            />
            <InputErrors errors={errors} name="email" />
          </div>

          <div className="text-start">
            <InputLabel htmlFor="password" value="Contraseña" />
            <TextInput
              placeholder="Contraseña"
              type="password"
              id="password"
              {...register("password")}
            />
            <InputErrors errors={errors} name="password" />
          </div>

          <div className="text-start">
            <InputLabel htmlFor="confirm-password" value="Confirmar contraseña" />
            <TextInput
              placeholder="Confirmar contraseña"
              type="password"
              id="confirm-password"
              {...register("confirmPassword")}
            />
            <InputErrors errors={errors} name="confirmPassword" />
          </div>

          <div>
            <InputLabel value="¿Eres profesor o estudiante?" />
            <div className="flex gap-x-5">
              <label className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  checked={currentRole === 'profesor'}
                  onChange={() => handleRoleChange('profesor')}
                />
                <span>Profesor</span>
              </label>
              <label className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  checked={currentRole === 'estudiante'}
                  onChange={() => handleRoleChange('estudiante')}
                />
                <span>Estudiante</span>
              </label>
            </div>
            {(errors.is_profesor || errors.is_estudiante) && (
              <p className="mt-1 text-sm text-red-600">Debes seleccionar un rol</p>
            )}
          </div>

          <button
            className="bg-blue-500 text-white h-11 rounded-lg font-semibold hover:bg-blue-600 transition duration-150 ease-in-out disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>

          <p className="text-sm text-gray-500 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
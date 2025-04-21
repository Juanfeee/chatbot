import { mappeoCarrera } from "../validaciones/materiaSchema";

type Props = {
  className?: string;
  register?: any;
  name?: string;
  id: string;
  options?: { id: string; name: string }[]; // Nuevas opciones pasadas como props
};

export const SelectForm = ({ id, name, className = "", register, options }: Props) => {
  const optionsToDisplay = options?.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ));

  return (
    <div className="flex flex-col">
      <select
        defaultValue=""
        {...register}
        name={name || id} // Usa name si está, si no id
        id={id}
        className={` 
          ${className}
          w-full h-11 px-3 py-2
          rounded-lg border border-gray-300
          bg-white text-sm text-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500
          transition duration-150 ease-in-out
        `}
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {optionsToDisplay}
      </select>
    </div>
  );
};

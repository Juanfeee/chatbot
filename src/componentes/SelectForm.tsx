import { mappeoCarrera, mappeoMateria } from "../validaciones/materiaSchema";

type Props = {
  className?: string;
  register?: any;
  id: string;
};

export const SelectForm = ({ id, className = "", register }: Props) => {
  const optionsMap = {
    carrera: mappeoCarrera,
    materia: mappeoMateria
  };

  const options = Object.entries(optionsMap[id as keyof typeof optionsMap] || {}).map(
    ([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    )
  );

  return (
    <div className="flex flex-col">
      <select
        defaultValue=""
        {...register}
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
        {options}
      </select>
    </div>
  );
};

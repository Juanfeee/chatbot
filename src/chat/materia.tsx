import { InputLabel } from "../componentes/InputLabel"
import { SelectForm } from "../componentes/SelectForm"
import TextInput from "../componentes/TextInput"

const Materia = () => {
  return (
    <>
      <div className="bg-white w-full flex flex-col justify-center items-center shadow-md rounded-lg">
        <form className="flex flex-col gap-y-5 w-full p-10 " >
          <h1 className="text-2xl font-bold">Dame contexto asdas asd</h1>
          <div className="text-start">
            <InputLabel
              htmlFor="carrera"
              value="Seleccine una carrera"
            />
            <SelectForm
              id="carrera"
            />
          </div>
          <div className="text-start">
            <InputLabel
              htmlFor="materia"
              value="Seleccine una materia"
            />
            <SelectForm
              id="materia"
            />
          </div>
          <button className="bg-blue-500 text-white w-fit p-4  rounded-lg font-semibold hover:bg-blue-600 transition duration-150 ease-in-out" type="submit">Empezar a charlar con QuimerIA</button>
        </form>
      </div>
    </>
  )
}
export default Materia
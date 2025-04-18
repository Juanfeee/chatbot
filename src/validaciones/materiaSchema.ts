import {z} from "zod";

// definimos los tipos que vamos a usar
const tipoCarrera = ["ingeniería_de_software"] as const;
const tipoMateria = ["base_de_datos", "programacion_uno","programacion_dos", "fisica_dos" ] as const;

// exportamos los tipos de datos
export type Carrera = (typeof tipoCarrera)[number];
export type Materia = (typeof tipoMateria)[number];

//definimos el mappeo de los datos
export const mappeoCarrera : { [key in Carrera]: string }= {
  ingeniería_de_software: "Ingeniería de software",
};
export const mappeoMateria : { [key in Materia]: string }= {
  base_de_datos: "Base de datos",
  programacion_uno: "Programación uno",
  programacion_dos: "Programación dos",
  fisica_dos: "Física dos",
};

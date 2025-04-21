import axios from "axios";


// Definimos los tipos que vamos a usar
const tipoCarrera = ["ingeniería_de_software"] as const;

// Exportamos los tipos de datos
export type Carrera = (typeof tipoCarrera)[number];

// Definimos el mapeo de los datos
export const mappeoCarrera: { [key in Carrera]: string } = {
  ingeniería_de_software: "Ingeniería de software",
};

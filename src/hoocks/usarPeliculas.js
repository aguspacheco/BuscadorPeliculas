//Importa hooks de React
import { useState, useRef, useMemo } from "react";
//Importa la funcion para buscar peliculas
import { buscarPeliculas } from "../services/peliculas";

//Hook que maneja la logica de busqueda y el orden de las peliculas
export function usePeliculas({ buscador, sort }) {
  //Estado para almacenar las peliculas que se obtuvieron
  const [peliculas, setPeliculas] = useState([]);
  //Estado para manejar el estado de carga
  const [loading, setLoading] = useState(false);
  //Estado para manejar errores
  const [error, setError] = useState(null);
  //Referencia para almacenar la bsuqueda previa y evitar busquedas innesarias
  const busquedaPrevia = useRef(buscador);

  //Funcion para obtener peliculas,
  const obtenerPeliculas = useMemo(() => {
    return async () => {
      //Si la busqueda actual es igual a la anterior no hace nada
      if (buscador === busquedaPrevia.current) return;

      try {
        //Inicia el estado de carga
        setLoading(true);
        //Resetea el estado de error
        setError(null);
        //Actualiza la busqueda previa
        busquedaPrevia.current = buscador;
        //Llama a la funcion para buscar una pelicula
        const nuevaPelicula = await buscarPeliculas({ buscador });
        //Actualiza el estado con las nuevas peliculas
        setPeliculas(nuevaPelicula);
        //Captura y establece el mensaje de error
      } catch (e) {
        setError(e.message);
      } finally {
        //Finaliza el estado de carga
        setLoading(false);
      }
    };
    //Si cambia el buscador, se recrea la funcion
  }, [buscador]);

  //Ordena las peliculas si se hace click en el checkbox
  const ordenarPeliculas = sort
    ? //Ordena alfabeticamente
      [...peliculas].sort((a, b) => a.title.localeCompare(b.title))
    : peliculas;

  //Devuelve las peliculas ordenada o no
  return { peliculas: ordenarPeliculas, obtenerPeliculas, loading };
}

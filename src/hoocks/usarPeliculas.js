import { useState, useRef, useMemo } from "react";
import { buscarPeliculas } from "../services/peliculas";

export function usePeliculas({ buscador, sort }) {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const busquedaPrevia = useRef(buscador);

  const obtenerPeliculas = useMemo(() => {
    return async () => {
      if (buscador === busquedaPrevia.current) return;

      try {
        setLoading(true);
        setError(null);
        busquedaPrevia.current = buscador;
        const nuevaPelicula = await buscarPeliculas({ buscador });
        setPeliculas(nuevaPelicula);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
  }, [buscador]);

  const ordenarPeliculas = sort
    ? [...peliculas].sort((a, b) => a.title.localeCompare(b.title))
    : peliculas;

  return { peliculas: ordenarPeliculas, obtenerPeliculas, loading };
}

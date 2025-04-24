import { useState } from "react";
import { buscarPeliculas } from "../services/peliculas";

export function usePeliculas({ buscador }) {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const busquedaPrevia = useRef(buscador);

  const obtenerPeliculas = async () => {
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
  return { peliculas, obtenerPeliculas, loading };
}

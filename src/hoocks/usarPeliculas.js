import { useState } from "react";

export function usePeliculas({ buscador }) {
  const [responsePeliculas, setResponsePeliculas] = useState([]);
  const peliculas = responsePeliculas.Search;

  const mapeoPeliculas = peliculas?.map((pelicula) => ({
    id: pelicula.imdb.ID,
    title: pelicula.Title,
    year: pelicula.Year,
    image: pelicula.Poster,
  }));

  const obtenerPeliculas = () => {
    if (buscador) {
      fetch(`https://www.omdapi.com/?apikey=4287ad07&s=${buscador}`)
        .then((res) => res.json())
        .then((json) => {
          setResponsePeliculas(json);
        });
    } else {
      setResponsePeliculas(withoutResults);
    }
  };

  return { peliculas: mapeoPeliculas, obtenerPeliculas };
}

import responsePeliculas from "../mocks/with-results.json";

export function usarPeliculas() {
  const peliculas = responsePeliculas.Search;

  const mapPeliculas = peliculas?.map((pelicula) => ({
    id: pelicula.imdbID,
    title: pelicula.Title,
    year: pelicula.Year,
    poster: pelicula.Poster,
  }));

  return { peliculas: mapPeliculas };
}

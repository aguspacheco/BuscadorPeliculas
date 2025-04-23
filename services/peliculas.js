const API_KEY = "4287ad07";
export const buscarPeliculas = async ({ buscador }) => {
  if (buscador === "") return null;
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${buscador}`);
    const json = await response.json();

    const peliculas = json.Search;

    return peliculas?.map((pelicula) => ({
      id: pelicula.imdbID,
      title: pelicula.Title,
      year: pelicula.Year,
      image: pelicula.Poster,
    }));
  } catch (e) {
    throw new Error("Error al busca la pelicula");
  }
};

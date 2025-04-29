//Clave de API para acceder a la OMDB
const API_KEY = "4287ad07";

//Funcion asincrona para buscar peliculas en la OMDB
export const buscarPeliculas = async ({ buscador }) => {
  //Si el buscador esta vacio, no hace ninguna busqueda y devuelve null
  if (buscador === "") return null;
  try {
    //Hace una solicitud a la OMDB con la clave de API y el termino de busqueda
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${buscador}`);
    //Convierte la respuesta en formato JSON
    const json = await response.json();
    //Extrae la lista de peliculas de la respuesta
    const peliculas = json.Search;

    //Mapea la lista de peliculas para devolver un formato que se maneje mejor
    return peliculas?.map((pelicula) => ({
      id: pelicula.imdbID,
      title: pelicula.Title,
      year: pelicula.Year,
      poster: pelicula.Poster,
    }));
  } catch (e) {
    //Sino ocurre un error en la busqueda, lanza un nuevo error
    throw new Error("Error al busca la pelicula");
  }
};

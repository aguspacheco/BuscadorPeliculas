//Componente que recibe una lista de peliculas y las renderiza en una lista desordenada
function ListaPeliculas({ Peliculas }) {
  return (
    <ul className="peliculas">
      {Peliculas.map((pelicula) => (
        <li className="pelicula" key={pelicula.id}>
          <h3>{pelicula.title}</h3>
          <p>{pelicula.year}</p>
          <img src={pelicula.poster} alt={pelicula.Title} />
        </li>
      ))}
    </ul>
  );
}

//Componente que se muestra solo cuando no se encuentran las peliculas
function NoTienePeliculas() {
  return <p>No se encontro la pelicula buscada</p>;
}

//Componente principal que recibe una lista de peliculas y decide que mostrar
export function Peliculas({ peliculas }) {
  //Controla si hay peliculas en la lista
  const tienePeliculas = peliculas?.length > 0;
  //Si hay peliculas, renderiza la lista sino muestra el mensaje que no encontro nada
  return tienePeliculas ? <ListaPeliculas Peliculas={peliculas} /> : <NoTienePeliculas />;
}

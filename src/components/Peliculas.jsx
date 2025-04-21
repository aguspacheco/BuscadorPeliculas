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

function NoTienePeliculas() {
  return <p>No se encontro la pelicula buscada</p>;
}

export function Peliculas({ peliculas }) {
  const tienePeliculas = peliculas?.length > 0;

  return tienePeliculas ? <ListaPeliculas Peliculas={peliculas} /> : <NoTienePeliculas />;
}

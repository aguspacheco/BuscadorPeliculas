import "./App.css";
import { usarPeliculas } from "./hoocks/usarPeliculas";
import { Peliculas } from "./components/Peliculas";
import { useState, useEffect, useRef } from "react";

function usarBuscador() {
  const [buscador, updateBuscador] = useState("");
  const [error, setError] = useState(null);
  const esPrimerInput = useRef(true);

  useEffect(() => {
    if (esPrimerInput.current) {
      esPrimerInput.current = buscador === "";
      return;
    }

    if (buscador === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (buscador.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un número");
      return;
    }

    if (buscador.length < 3) {
      setError("La busqueda tiene que tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [buscador]);

  return { buscador, updateBuscador, error };
}

function App() {
  const { peliculas } = usarPeliculas();
  const { buscador, updateBuscador, error } = usarBuscador();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ buscador });
  };

  const handleChange = (event) => {
    updateBuscador(event.target.value);
  };

  return (
    <div className="pagina">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={buscador}
            name="query"
            placeholder="harry potter, chico malo..."
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Peliculas peliculas={peliculas} />
      </main>
    </div>
  );
}

export default App;

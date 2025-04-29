//Importa los estilos de la aplicacion
import "./App.css";
//Importa el hook para manejar peliculas
import { usePeliculas } from "./hoocks/usarPeliculas";
//Importa el componente que muestra la lista de peliculas
import { Peliculas } from "./components/Peliculas";
//Importa hooks de React
import { useState, useEffect, useRef, useCallback } from "react";
//Importa la funcion debounce para optimizar las busquedas
import debounce from "just-debounce-it";

//Hook para manejar la logica del buscador
function useBuscador() {
  //Almacena el termino de la busqueda
  const [buscador, updateBuscador] = useState("");
  //Estado para errores de busqueda
  const [error, setError] = useState(null);
  //Referencia para saber si es la primera entrada
  const esPrimerInput = useRef(true);

  useEffect(() => {
    //Verifica si es la primera entrada
    if (esPrimerInput.current) {
      //Actualiza la referencia si el buscador esta vacio
      esPrimerInput.current = buscador === "";
      return;
    }

    //Validacion del termino de busqueda
    if (buscador === "") {
      //Error si el buscador esta vacio
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (buscador.match(/^\d+$/)) {
      //Error si el buscador contiene solo numeros
      setError("No se puede buscar una pelicula con un número");
      return;
    }

    if (buscador.length < 3) {
      //Error si el buscador tiene menos de 3 caracteres
      setError("La busqueda tiene que tener al menos 3 caracteres");
      return;
    }

    //Resetea el error si todas validaciones son correctos
    setError(null);
    //Se ejecuta cada vez que cambia el buscador
  }, [buscador]);

  //Retorna el buscador, la funcion para actualizarlo y el error
  return { buscador, updateBuscador, error };
}

//Componente principal
function App() {
  //Maneja como se van a ordenar las peliculas
  const [sort, setSort] = useState(false);
  //Usa el hook de buscar
  const { buscador, updateBuscador, error } = useBuscador();
  //Usa el el hook de peliculas
  const { peliculas, loading, obtenerPeliculas } = usePeliculas({ buscador, sort });

  //Obtiene peliculas, se ejecuta 300 milisegundos despues de que el usuario deje de escribir
  const debounceObtenerPeliculas = useCallback(
    debounce((buscador) => {
      obtenerPeliculas({ buscador });
    }, 300),
    //Se recrea si cambia la funcion obtenerPeliculas
    [obtenerPeliculas]
  );

  //Maneja el evento de envio del formulario
  const handleSubmit = (event) => {
    //Previene el compartamiento del formulario
    event.preventDefault();
    //Llama a la funcion para obtener peliculas con el termino de busqueda actual
    obtenerPeliculas(buscador);
  };

  //Maneja el cambio de orden
  const handleSort = () => {
    //Cambia el estado de ordanamiento al valor opuesto
    setSort(!sort);
  };

  //Maneja el cambio en el campo de entrada del buscador
  const handleChange = (event) => {
    //Obtiene el nuevo valor del buscador
    const nuevoBuscador = event.target.value;
    //Actualiza el estado del buscador
    updateBuscador(nuevoBuscador);
    //Llama a la funcion para obtener las peliculas
    debounceObtenerPeliculas(nuevoBuscador);
  };

  return (
    <div className="pagina">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            //Maneja el cambio en el input
            onChange={handleChange}
            value={buscador}
            name="query"
            placeholder="harry potter, chico malo..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Buscando...</p> : <Peliculas peliculas={peliculas} />}</main>
    </div>
  );
}

export default App;

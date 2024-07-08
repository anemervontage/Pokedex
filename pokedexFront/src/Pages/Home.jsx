import './Home.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: '',
    img: '',
    desc: ''
  });
  
  const [selectedIndex, setSelectedIndex] = useState(-1); // Start with no dropdown selection

  // Fetch data from API to render to home page.
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokedex-ofqq.onrender.com/api/pokemon');
        setPokemons(response.data);
      } catch (error) {
        console.log('Failed to get pokemon', error);
      }
    };

    // Call function to fetch data
    fetchPokemon();
  }, []);

  // Update selected Pokemon when dropdown changes
  const onDropdownSelect = (event) => {
    const selectedId = event.target.value;
      const pokemon = pokemons.find((pokemon) => pokemon._id === selectedId);
      setSelectedPokemon({
        name: pokemon.name,
        img: pokemon.img,
        desc: pokemon.desc
      });
      setSelectedIndex(pokemons.findIndex((pokemon) => pokemon._id === selectedId));
    
  };

  // Navigate to next Pokemon
  const next = () => {
    if (selectedIndex === -1){
      //spin up server if down
      const response =  axios.get('https://pokedex-ofqq.onrender.com/api/pokemon');
      console.log(response.data);
    }
    setSelectedIndex(function(prevIndex) {
      return (prevIndex + 1) % pokemons.length;
    });
  };

  // Navigate to previous Pokemon
  const prev = () => {
    setSelectedIndex(function(prevIndex) {
      if (selectedIndex === -1){
      //spin up server if down
      const response =  axios.get('https://pokedex-ofqq.onrender.com/api/pokemon');
      console.log(response.data);

      return selectedIndex
      }
      else if (prevIndex === 0) {
        return pokemons.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  useEffect(() => {
    // Update selectedPokemon whenever selectedIndex changes
    if (selectedIndex !== -1 && pokemons.length > 0) {
      setSelectedPokemon({
        name: pokemons[selectedIndex].name,
        img: pokemons[selectedIndex].img,
        desc: pokemons[selectedIndex].desc
      });
    } 
  }, [selectedIndex, pokemons]);

  return (
    <>
      <head>
      </head>
      <body>
        <main>
          <div>
            <select
            /* Makes sure document is blank when index is -1 */
              value={selectedIndex !== -1 ? pokemons[selectedIndex]._id : ''}

              id="dropdown"
              className="dropdown"
              onChange={onDropdownSelect}
            >
              <option value="" disabled={selectedIndex !== -1}>
                Choose Pokemon
              </option>
              {pokemons.map((pokemon) => (
                <option key={pokemon._id} value={pokemon._id}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>

          {selectedPokemon.img && (
            <img
              src={selectedPokemon.img}
              alt="pokemon"
              className="pokemon_image"
              id="imgs"
            />
          )}

          <h1 className="pokemon_data">
            <span className="pokemon_name" id="names">
              {selectedPokemon.name}
            </span>
          </h1>

          <form>
            <p className="input_search" id="descs">
              {selectedPokemon.desc}
            </p>
          </form>

          <div className="buttons">
            <button className="button btn-prev" onClick={prev}>
              Prev &lt;
            </button>
            <button className="button btn-next" onClick={next}>
              Next &gt;
            </button>
          </div>

          <img
            src="https://pokedex-conrado.vercel.app/images/pokedex.png"
            alt="pokedex"
            className="pokedex"
          />
        </main>
      </body>
    </>
  );
}


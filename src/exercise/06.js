// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null)
    fetchPokemon(pokemonName)
      .then(data => setPokemon(data))
      .catch(err => setError(err))
  }, [pokemonName]) // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemon name: 'Submit a pokemon'
  //   2. pokemon name but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  if (error) {
    return (
      <div role="alert">
        {' '}
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>{' '}
      </div>
    )
  }
  return (
    <div>
      {!pokemonName ? (
        'Submit a pokemon'
      ) : !pokemon ? (
        <PokemonInfoFallback name={pokemonName} />
      ) : (
        <PokemonDataView pokemon={pokemon} />
      )}
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

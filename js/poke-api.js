// Objeto pokeApi para lidar com chamadas à PokeAPI
const pokeApi = {}

// Função para converter detalhes da PokeAPI em objetos Pokémon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    // Define o número do Pokémon
    pokemon.number = pokeDetail.id

    // Define o nome do Pokémon
    pokemon.name = pokeDetail.name

    // Obtém os tipos do Pokémon e define o tipo principal
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    // Define a URL da foto do Pokémon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Função para obter detalhes de um Pokémon da PokeAPI
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// Função para obter uma lista de Pokémon da PokeAPI com base no deslocamento e limite
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

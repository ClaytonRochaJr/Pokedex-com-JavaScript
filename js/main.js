// Obtém elementos da página
const pokemonList = document.getElementById('pokemonList'); // Obtém a lista de Pokémon
const loadMoreButton = document.getElementById('loadMoreButton'); // Obtém o botão "Carregar Mais"

// Configurações para carregar Pokémon
const maxRecords = 151; // Define o número máximo de registros (Pokémon) a serem carregados
const limit = 10; // Define o número de registros a serem carregados de cada vez
let offset = 0; // Define o deslocamento inicial dos registros a serem carregados

// Função para converter informações de Pokémon em elementos de lista HTML
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

// Função para carregar Pokémon com base no deslocamento e limite
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Converte os dados dos Pokémon em HTML e os adiciona à lista existente
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

// Carrega Pokémon inicialmente
loadPokemonItens(offset, limit);

// Adiciona um ouvinte de evento de clique ao botão "Carregar Mais"
loadMoreButton.addEventListener('click', () => {
    // Incrementa o deslocamento para carregar mais Pokémon
    offset += limit;

    // Calcula a quantidade de registros na próxima página
    const qtdRecordsWithNextPage = offset + limit;

    // Verifica se atingiu ou excedeu o número máximo de registros
    if (qtdRecordsWithNextPage >= maxRecords) {
        // Calcula um novo limite para a última página
        const newLimit = maxRecords - offset;

        // Carrega os Pokémon restantes com o novo limite
        loadPokemonItens(offset, newLimit);

        // Remove o botão "Carregar Mais" quando todos os Pokémon foram carregados
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        // Carrega mais Pokémon com base no limite padrão
        loadPokemonItens(offset, limit);
    }
});

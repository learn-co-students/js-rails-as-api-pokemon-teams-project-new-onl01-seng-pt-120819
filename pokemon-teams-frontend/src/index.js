const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const mainBody = document.getElementById('main');

fetch(`${TRAINERS_URL}`)
  .then((res) => res.json())
  .then((res) => createTrainers(res))
  .catch((err) => console.log(err));

function createTrainers(trainers) {
  trainers.forEach((trainer) => {
    let div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = trainer.id;
    let namePara = document.createElement('p');
    namePara.innerText = trainer.name;
    let addPkmnBtn = document.createElement('button');
    addPkmnBtn.classList.add('addPkmn');
    addPkmnBtn.dataset.trainerId = trainer.id;
    addPkmnBtn.innerText = 'Add Pokemon';
    addPkmnBtn.addEventListener('click', (e) => {
      addPokemon(e);
    });
    let pkmnList = document.createElement('ul');
    trainer.pokemons.forEach((pokemon) => {
      let li = document.createElement('li');
      li.innerText = `${pokemon.nickname} (${pokemon.species})`;
      let releaseBtn = document.createElement('button');
      releaseBtn.classList.add('release');
      releaseBtn.dataset.pokemonId = pokemon.id;
      releaseBtn.innerText = 'Release';
      releaseBtn.addEventListener('click', (e) => {
        releasePokemon(releaseBtn.dataset.pokemonId, e);
      });
      li.appendChild(releaseBtn);
      pkmnList.appendChild(li);
    });
    div.appendChild(namePara);
    div.appendChild(addPkmnBtn);
    div.appendChild(pkmnList);
    mainBody.appendChild(div);
  });
}

const addPokemon = (e) => {
  fetch(`${POKEMONS_URL}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      trainer_id: parseInt(e.target.dataset.trainerId),
    }),
  })
    .then((res) => res.json())
    .then((json) => addPokemonToTeam(json))
    .catch((err) => console.log(err));
};

function addPokemonToTeam(pokemon) {
  const cards = document.querySelectorAll('.card');
  let li = document.createElement('li');
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;
  let releaseBtn = document.createElement('button');
  releaseBtn.classList.add('release');
  releaseBtn.dataset.pokemonId = pokemon.id;
  releaseBtn.innerText = 'Release';
  releaseBtn.addEventListener('click', (e) => {
    releasePokemon(releaseBtn.dataset.pokemonId, e);
  });
  li.appendChild(releaseBtn);
  cards.forEach((card) => {
    if (card.dataset.id == pokemon.trainer_id) {
      const div = card;
      const ul = div.childNodes[2];
      ul.appendChild(li);
    }
  });
}

function releasePokemon(id, e) {
  fetch(`${POKEMONS_URL}/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then(() => e.target.parentElement.remove())
    .catch((err) => console.log(err));
}

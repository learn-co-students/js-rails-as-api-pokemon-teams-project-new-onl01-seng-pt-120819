class PokemonsController < ApplicationController

  def create
    name = Faker::Name.first_name 
    species = Faker::Games::Pokemon.name 
    trainer_id = params[:trainer_id]
    trainer = Trainer.find(params[:trainer_id])
    if trainer.pokemons.size < 6
      p = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
      render json: p
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon
  end
end

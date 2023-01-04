import { Pokemon } from "src/app/modules/pokemons/models/pokemon";

export function getPokemon(name:string, image:string = `https://imgpoke.mon/${name}.png`) : Pokemon {
    return {
        id: 0,
        image,
        name,
        attack: Math.round(Math.random() * 100),
        defense: Math.round(Math.random() * 100),
    };
}

export function getPokemons(names:string[] = ['Charizard', 'Mew', 'Metapod']) : Pokemon[] {
    return names.map(x => getPokemon(x));
}

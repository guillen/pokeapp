import { Pokemon } from 'src/app/modules/pokemons/models/pokemon';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  const pipe = new SearchPipe();

  function getRamdomPokemon(name:string, image:string = `https://imgpoke.mon/${name}.png`) : Pokemon {
    return {
      id: 0,
      image,
      name,
      attack: Math.round(Math.random() * 100),
      defense: Math.round(Math.random() * 100),
    };
  }

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Filter data correctly using an array of pokemons', () => {
    let bulbasaur = getRamdomPokemon('Bulbasaur');
    let ivysaur = getRamdomPokemon('Ivysaur');
    let venasaur = getRamdomPokemon('Venasaur');
    let mewtwo = getRamdomPokemon('Mewtwo');

    let pokemons:Pokemon[] = [
      bulbasaur, ivysaur, venasaur, mewtwo,
    ];
    let resultName = pipe.transform(pokemons, 'saur', 'name');
    let resultImg = pipe.transform(pokemons, 'TWO', 'image');

    expect(resultName).toEqual([bulbasaur, ivysaur, venasaur]);
    expect(resultImg).toEqual([mewtwo]);
  });

  it('Filter data correctly using an array of any object', () => {
    //let result = pipe.transform();
  });

  it('Empty array when data length is 0', () => {
    //let result = pipe.transform();
  });

  it('Empty array when value or field are empty', () => {
    //let result = pipe.transform();
  });
});

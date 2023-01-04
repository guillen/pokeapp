import { Pokemon } from 'src/app/modules/pokemons/models/pokemon';
import { SearchPipe } from './search.pipe';

interface RandomArray {
  age:number, 
  otherField: string,
}

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

  function getRandomArray() : RandomArray[] {
    return [
      {age: 10, otherField: 'Other1'},
      {age: 11, otherField: 'Other2'},
      {age: 12, otherField: 'Different'},
    ];
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
    let data:RandomArray[] = getRandomArray();
    let resultOther = pipe.transform(data, 'other', 'otherField');

    expect(resultOther).toEqual([
      {age: 10, otherField: 'Other1'},
      {age: 11, otherField: 'Other2'},
    ]);
  });

  it('Empty array when data length is 0', () => {
    let result = pipe.transform([], 'x', 'y');

    expect(result).toEqual([]);
  });

  it('Can filter with field type different than a string', () => {
    let data = getRandomArray();
    let result = pipe.transform(data, '1', 'age');

    expect(result).toEqual(data);
  });

  it('Return original array when value or field are empty', () => {
    let nullable:string;
    let data = getRandomArray();
    let resultEmptyField = pipe.transform(data, 'value', nullable!);
    let resultEmptyValue = pipe.transform(data, nullable!, 'field');
    let resultEmptyBoth = pipe.transform(data, nullable!, nullable!);

    expect(resultEmptyField).toBe(data);
    expect(resultEmptyValue).toBe(data);
    expect(resultEmptyBoth).toBe(data);
  });
});

import { Pokemon } from 'src/app/modules/pokemons/models/pokemon';
import { getPokemon } from 'src/app/testing/helpers/utl';
import { SearchPipe } from './search.pipe';

interface RandomArray {
  age:number, 
  otherField: string,
}

describe('SearchPipe', () => {
  const pipe = new SearchPipe();

  function getRandomArray() : RandomArray[] {
    return [
      {age: 10, otherField: 'Other1'},
      {age: 11, otherField: 'Other2'},
      {age: 12, otherField: 'Different'},
    ];
  }

  it('Should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should filter data correctly using an array of pokemons', () => {
    let bulbasaur = getPokemon('Bulbasaur');
    let ivysaur = getPokemon('Ivysaur');
    let venasaur = getPokemon('Venasaur');
    let mewtwo = getPokemon('Mewtwo');

    let pokemons:Pokemon[] = [
      bulbasaur, ivysaur, venasaur, mewtwo,
    ];
    let resultName = pipe.transform(pokemons, 'saur', 'name');
    let resultImg = pipe.transform(pokemons, 'TWO', 'image');

    expect(resultName).toEqual([bulbasaur, ivysaur, venasaur]);
    expect(resultImg).toEqual([mewtwo]);
  });

  it('Should filter data correctly using an array of any object', () => {
    let data:RandomArray[] = getRandomArray();
    let resultOther = pipe.transform(data, 'other', 'otherField');

    expect(resultOther).toEqual([
      {age: 10, otherField: 'Other1'},
      {age: 11, otherField: 'Other2'},
    ]);
  });

  it('Should return empty array when data length is 0', () => {
    let result = pipe.transform([], 'x', 'y');

    expect(result).toEqual([]);
  });

  it('Should filter with field type different than a string', () => {
    let data = getRandomArray();
    let result = pipe.transform(data, '1', 'age');

    expect(result).toEqual(data);
  });

  it('Should return original array when value or field are empty', () => {
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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(pokemons: any[], value:string, field:string): any[] {
    if (!pokemons) {
      return [];
    }

    if (!value || !field) {
      return pokemons;
    }

    return pokemons.filter(pokemon => pokemon[field].toLowerCase().includes(value.toLowerCase()));
  }

}

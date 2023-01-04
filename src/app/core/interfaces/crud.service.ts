import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_NAMES } from "../constants/url-names";
import { USER_DATA } from "../constants/user-data";

@Injectable({
  providedIn: 'root'
})
export class CrudService<DTO, T> {
  idAuthor:number = USER_DATA.idAuthor;
  url:string = URL_NAMES.POKEMON;

  constructor(private _http:HttpClient) { }

  get():Observable<T[]> {
    return this._http.get<T[]>(this.url, {params: {idAuthor: this.idAuthor}});
  }

  getOne(id:number):Observable<T> {
    return this._http.get<T>(`${this.url}/${id}`, {params: {idAuthor: this.idAuthor}});
  }

  post(dto:DTO):Observable<T> {
    return this._http.post<T>(this.url, dto, {params: {idAuthor: this.idAuthor}});
  };

  put(dto:DTO, id:number):Observable<T> {
    return this._http.put<T>(`${this.url}/${id}`, dto, {params: {idAuthor: this.idAuthor}});
  };

  delete(id:number):Observable<void> {
    return this._http.delete<void>(`${this.url}/${id}`, {params: {idAuthor: this.idAuthor}});
  };
}

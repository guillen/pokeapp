import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_NAMES } from "../constants/url-names";
import { USER_DATA } from "../constants/user-data";

@Injectable({
  providedIn: 'root'
})
export class CrudClass<DTO, T> {
  idAuthor:number = USER_DATA.idAuthor;
  url:string = URL_NAMES.POKEMON;

  constructor(private http:HttpClient) { }

  get():Observable<T[]> {
    return this.http.get<T[]>(this.url, {params: {idAuthor: this.idAuthor}});
  }

  getOne(id:number):Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`, {params: {idUsuario: this.idAuthor}});
  }

  post(dto:DTO):Observable<T> {
    return this.http.post<T>(this.url, dto);
  };

  put(dto:DTO, id:number):Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, dto);
  };

  delete(id:number):Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  };
}

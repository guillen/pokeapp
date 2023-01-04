import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { URL_NAMES } from '../constants/url-names';
import { USER_DATA } from '../constants/user-data';
import { CrudService } from './crud.service';

interface FakeModel {
  name:string,
  age:number,
  active:boolean,
  date:string,
}

interface FakeModelDTO {
  name:string,
  age:number,
}

describe('CrudService', () => {
  let service: CrudService<FakeModelDTO, FakeModel>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(CrudService<FakeModelDTO, FakeModel>);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('HttpClient should call get method (all values)', () => {
    service.get().subscribe(_resp => {});

    const req = httpController.expectOne(`${URL_NAMES.POKEMON}?idAuthor=${USER_DATA.idAuthor}`);
    expect(req.request.method).toEqual('GET');
  });

  it('HttpClient should get post method (one value)', () => {
    let value = 1;

    service.getOne(value).subscribe(_resp => {});

    const req = httpController.expectOne(`${URL_NAMES.POKEMON}/${value}?idAuthor=${USER_DATA.idAuthor}`);
    expect(req.request.method).toEqual('GET');
  });

  it('HttpClient should call post method', () => {
    let dto:FakeModelDTO = {
      age: 10, name: 'Joe Mama',
    };

    service.post(dto).subscribe(_resp => {});

    const req = httpController.expectOne(`${URL_NAMES.POKEMON}?idAuthor=${USER_DATA.idAuthor}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toBe(dto);
  });

  it('HttpClient should call put method', () => {
    let value = 1;
    let dto:FakeModelDTO = {
      age: 10, name: 'Joe Mama',
    };

    service.put(dto, value).subscribe(_resp => {});

    const req = httpController.expectOne(`${URL_NAMES.POKEMON}/${value}?idAuthor=${USER_DATA.idAuthor}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toBe(dto);
  });

  it('HttpClient should call put method', () => {
    let value = 1;

    service.delete(value).subscribe(_resp => {});

    const req = httpController.expectOne(`${URL_NAMES.POKEMON}/${value}?idAuthor=${USER_DATA.idAuthor}`);
    expect(req.request.method).toEqual('DELETE');
  });
});

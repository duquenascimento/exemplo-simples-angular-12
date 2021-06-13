import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  constructor( private http: HttpClient) { }

  //Pra efeito de teste não foi adicionado em um .env
  URL = 'http://localhost:3000';

  releaseControlList(): Observable<any> {
      return this.http.get(`${this.URL}/listaControleLancamento`);
  }

  fullControlRelease(): Observable<any> {
    return this.http.get(`${this.URL}/totalControleLancamento`);
}
}

import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OptativeService {
  private urlOptative: string = environment.apiUrl + '/optative'

  constructor(protected httpClient: HttpClient) {
  }

  public getAllOptatives(query?: any): Observable<any> {
    return this.httpClient.get<any>(this.urlOptative);
  }

  public getOptative(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlOptative + '/' + id);
  }

  public createOptative(body: any): Observable<any> {
    return this.httpClient.post<any>(this.urlOptative, body);
  }

  public updateOptative(body: any): Observable<any> {
    return this.httpClient.put<any>(this.urlOptative + '/' + body?.id, body);
  }

  public removeOptative(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlOptative + '/' + id);
  }
}

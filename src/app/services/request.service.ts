import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private urlRequest: string = environment.apiUrl + '/request'
  private urlMineRequest: string = environment.apiUrl + '/request/mine'

  constructor(protected httpClient: HttpClient) {
  }

  public getAllRequest(query?: any): Observable<any> {
    return this.httpClient.get<any>(this.urlRequest);
  }

  public getAllMineRequest(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlMineRequest + '/' + id);
  }

  public getRequest(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlRequest + '/' + id);
  }

  public createRequest(body: any): Observable<any> {
    return this.httpClient.post<any>(this.urlRequest, body);
  }

  public updateRequest(body: any): Observable<any> {
    return this.httpClient.put<any>(this.urlRequest + '/' + body?.id, body);
  }

  public removeRequest(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlRequest + '/' + id);
  }
}

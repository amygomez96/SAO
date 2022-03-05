import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUser: string = environment.apiUrl + '/user'
  private urlProfessor: string = environment.apiUrl + '/user/professors'
  private urlStudents: string = environment.apiUrl + '/user/students'
  private urlLogin: string = environment.apiUrl + '/user/login'
  private urlRegister: string = environment.apiUrl + '/user/register'

  constructor(protected httpClient: HttpClient) {
  }

  public login(body: any): Observable<any> {
    return this.httpClient.post<any>(this.urlLogin, body);
  }

  public getAllUsers(query?: any): Observable<any> {
    return this.httpClient.get<any>(this.urlUser);
  }

  public getProfessors(query?: any): Observable<any> {
    return this.httpClient.get<any>(this.urlProfessor);
  }

  public getStudents(query?: any): Observable<any> {
    return this.httpClient.get<any>(this.urlStudents);
  }

  public getLoggedUser(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlUser + '/' + id);
  }

  public createUser(body: any): Observable<any> {
    return this.httpClient.post<any>(this.urlRegister, body);
  }

  public updateUser(body: any): Observable<any> {
    return this.httpClient.put<any>(this.urlUser + '/' + body?.id, body);
  }

  public removeUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlUser + '/' + id);
  }
}

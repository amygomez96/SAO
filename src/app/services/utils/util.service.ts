import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public keyPressNumbers(key: any): boolean {
    return key?.charCode === 8 || key?.charCode === 0 ? false : key?.charCode >= 48 && key?.charCode <= 57;
  }
}

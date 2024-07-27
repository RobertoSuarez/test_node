import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurnTotal } from './turn.types';
import { environment } from 'assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getTotalTurns() {
    return this._httpClient.get<TurnTotal>(`${environment.domain}/turn/total-turns`);
  }
}

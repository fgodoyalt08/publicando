import {Injectable} from "@angular/core";
import {TRIPS} from "./mock-trips";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TripService {
  private trips: any;

  constructor(public httpClient: HttpClient) {
    this.trips = TRIPS;
  }

  getAll() {
    return this.trips;
  }

  getItem(id) {
    return this.httpClient.get('https://clasificados.integralwebhost.com/api/posts/' + id);
  }

  remove(item) {
    this.trips.splice(this.trips.indexOf(item), 1);
  }
}

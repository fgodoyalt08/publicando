import {Component} from "@angular/core";
import {NavController, MenuController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;

  constructor(public nav: NavController, public tripService: TripService,public httpClient: HttpClient) {
    // set sample data
    this.trips = this.httpClient.get('https://clasificados.integralwebhost.com/api/posts');
  }

  // view trip detail
  viewDetail(id) {
    this.nav.push(TripDetailPage, {id: id});
  }

  openDetails(id) {
    this.nav.push(TripDetailPage, {id: id});
  }
}

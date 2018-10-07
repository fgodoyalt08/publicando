import {Component, ViewChild } from "@angular/core";
import {NavController, PopoverController, Slides } from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {TripDetailPage} from "../trip-detail/trip-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  features: Observable<any>;
  publicaciones: Observable<any>;

  // search condition
  public search = {
    name: "Todas",
    date: new Date().toISOString(),
    key: "",
  }

  public isDisabled = false;

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController, public httpClient: HttpClient) {
    this.features = this.httpClient.get('https://clasificados.integralwebhost.com/api/posts/features');
    this.publicaciones = this.httpClient.get('https://clasificados.integralwebhost.com/api/posts');
  }

  openDetails(id) {
    this.nav.push(TripDetailPage, {id: id});
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";


    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Todas"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // open filter form
  relink() {
    this.isDisabled = !this.isDisabled;
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//

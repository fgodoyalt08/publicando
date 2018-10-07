import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ToastController, Platform, PopoverController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  public tripes: any;
  public html: any;
  public isDisabled = true;
  map: GoogleMap;
  lat:any; lang:any;

  // number of adult
  public adults = 2;
  // number of children
  public children = 0;

  constructor(private geolocation: Geolocation, public nav: NavController, public tripService: TripService, public navParams: NavParams, public httpClient: HttpClient,private socialSharing: SocialSharing , private callNumber: CallNumber,private iab: InAppBrowser, public toastCtrl: ToastController, public platform:Platform, public popoverCtrl: PopoverController) {
    // set sample data
    this.tripes = this.httpClient.get('https://clasificados.integralwebhost.com/api/posts/' + navParams.get('id'));
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }


  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // open filter form
  relink(category) {
    this.isDisabled = !this.isDisabled;
  }

  whatsapp(num){
    this.socialSharing.shareViaWhatsApp('¡Discover this  great', null, "https://integralwebhost.com").then(() => {
        console.log('Shared');
      }).catch(() => {
      setTimeout(() => {
          let toast = this.toastCtrl.create({
              message: 'Error en whatsapp che',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
      }, 1500);
    });
  }

  verWebsite(website)
  {
    const browser = this.iab.create(website);
    browser.show()
  }

  shareTwitter(){
    var msg  = "Publicando";
    this.socialSharing.shareViaTwitter(msg, null, null).then(() => {
        console.log('Shared');
      }).catch(() => {
      setTimeout(() => {
          let toast = this.toastCtrl.create({
              message: 'Error en twitter che',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
      }, 1500);
    });
  }


  callToNumber(num){
    this.callNumber.callNumber(num, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err)).then(() => {
        console.log('Shared');
      }).catch(() => {
      setTimeout(() => {
          let toast = this.toastCtrl.create({
              message: 'Error en call tu number che',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
      }, 1500);
    });
  }

  sendMail(email){
    this.socialSharing.shareViaEmail('Body', 'Subject', [email]).then(() => {
        console.log('Shared');
      }).catch(() => {
      setTimeout(() => {
          let toast = this.toastCtrl.create({
              message: 'Error en mail che',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
      }, 1500);
    });
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    this.nav.push(CheckoutTripPage);
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);    
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                  
              });
          });

      });
  }


  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
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

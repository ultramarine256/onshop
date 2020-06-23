import { AfterContentInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GOOGLE_MAP_CONSTANTS } from '@domain/constants/app.constants';
import { InfoService } from '@domain/services/info.service';

@Component({
  selector: 'app-contact-us',
  styleUrls: ['./contact-us.component.scss'],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent implements AfterContentInit {
  /// fields
  private _googleMap: any;

  /// predicates
  public googleMapDidLoaded = false;

  /// constructor
  constructor(public infoService: InfoService) {}

  ngAfterContentInit(): void {
    this.appendGoogleMapsScriptToHeader(() => {
      this.googleMapDidLoaded = true;

      // initialize google map
      const mapOptions = {
        center: new (window as any).google.maps.LatLng(45, -122),
        zoom: 15,
        mapTypeId: (window as any).google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        mapTypeControl: false,
        clickableIcons: true,
        streetViewControl: false,
      };
      this._googleMap = new (window as any).google.maps.Map(window.document.getElementById('map'), mapOptions);

      // set default position
      this.getLocation(this.infoService.appInfo.address, (lat, lng) => {
        const coordinates = new (window as any).google.maps.LatLng(lat, lng);
        const dealerLocationMarker = new (window as any).google.maps.Marker({
          map: this._googleMap,
          anchorPoint: new (window as any).google.maps.Point(0, -29),
        });
        dealerLocationMarker.setPosition(coordinates);
        dealerLocationMarker.setVisible(true);

        this._googleMap.setCenter(coordinates);
      });
    });
  }

  /// helpers
  private appendGoogleMapsScriptToHeader(callback: () => void) {
    if (!window.document.querySelector(`.${GOOGLE_MAP_CONSTANTS.SCRIPT_CLASS}`)) {
      const script = window.document.createElement('script');
      script.classList.add(GOOGLE_MAP_CONSTANTS.SCRIPT_CLASS);
      script.setAttribute(
        'src',
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_CONSTANTS.API_KEY}&libraries=places,geometry&callback=initialize`
      );
      window.document.head.appendChild(script);
      (window as any).initialize = () => {
        callback();
      };
    } else {
      callback();
    }
  }

  private getLocation(address: string, callback: (lat: any, lng: any) => void) {
    const geocoder = new (window as any).google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === (window as any).google.maps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        callback(lat, lng);
      }
    });
  }

  public getFormProperties(formValue: FormGroup) {}
}

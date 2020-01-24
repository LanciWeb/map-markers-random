export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent: () => string;
}

class Map {
  private googleMap: google.maps.Map;
  private mapOptions = { zoom: 1, center: { lat: 0, lng: 0 } };

  constructor(elementId: string) {
    this.googleMap = new google.maps.Map(
      document.querySelector(elementId),
      this.mapOptions
    );
  }

  /**
   * creates a marker and its popup
   */
  public addMarker = (mappable: Mappable) => {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: { lat: mappable.location.lat, lng: mappable.location.lng }
    });
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });
      infoWindow.open(this.googleMap, marker);
    });
  };
}

export default Map;

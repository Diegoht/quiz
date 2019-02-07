import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  casas=[];

  constructor(public navCtrl: NavController, public http: HttpClient) {
      this.http.get('/v1/api/pin-data?url=/s-renta-inmuebles/guadalajara-y-zona-metro/v1c1098l10567p1&geo=(21.10631012145462,-102.42214381725364),(20.21712862656199,-104.32387728274637)')
      .subscribe(data=>{
        console.log(JSON.stringify(data));
        if(data.hasOwnProperty('ads')){
          this.casas=data['ads'];
        }
      }, error => {
        console.log(JSON.stringify(error))
      });
  }

}

//Los inmuebles no tienen un título. Lo que se usa como título es la ubicación
//La ubicación se encunetra en geo. Después de validar que tenga geo, se accdede por c.geo.displayName
//El precio se encuentra en price. Para acceder a él, se valida que exista price y luego está bajo el nombre de formattedAmount (c.price.formattedAmount)
//La imagen se encuentra dentro del arreglo pictures, en el espacio 0, bajo la propiedad de url. Por eso se accede por c.pictures[0].url

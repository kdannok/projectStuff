/**
 * This file contains all the functions needed to actually
 * have the angular app talk to the server
 **/

import { Component, Injectable } from '@angular/core';
//import http modules and rxjs
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs';

@Injectable()
export class APIMiddleWare {

    constructor(
        private http: Http,
        private router: Router
    ) { }

    //function to get all facilities from the db
    getFacilities(): Promise<Array<Object>> {
        return this.http.get('http://localhost:8100/api/courses').toPromise().then((resp) => {
            let facilities = resp.json();
            console.log('facilities: ',facilities);
            return facilities;
        });
    }

    //get all reservations from a facility
    getReservations(facilityId): Promise<Array<Object>> {
        return this.http.get('http://localhost:8100/api/courses/'+facilityId).toPromise().then((resp) => {
            let reservations = resp.json();
            console.log('reservations: ', reservations['reservations']);
            return reservations['reservations'];
        });
    }
    
    //add a new reservation into a facility
    addNewReservation(facilityId, dataObj){
        this.http.post('http://localhost:8100/api/courses/'+facilityId, dataObj).toPromise().then((resp) => {
            console.log(resp);
            
            //this part should be removed from the middleware and into
            //the componnent, but I'm not sure how
            if (resp['_body'] == 1 ) {
                console.log("saved new reservation");
                this.router.navigate(['/facilities/'+facilityId]);
            }else{
                console.log("could not save new reservation");
            }
        });
    }
    
    //delete a reservation from a facility
    deleteReservation(facilityId, reservationId) {
        this.http.delete('http://localhost:8100/api/courses/'+facilityId+'/'+reservationId).toPromise().then((resp) => {
            let deleted = resp.json();
            console.log(deleted);
            
            //this part should be removed from the middleware and into
            //the componnent, but I'm not sure how
            if (deleted) {
                console.log("deleted reservation");
                window.location.reload();
            }else{
                console.log("could not delete reservation");
            }
        });
    };

}

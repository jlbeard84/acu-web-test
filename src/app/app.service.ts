import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Results } from '../models';

const AppUri = 'https://acu-test.herokuapp.com/';

@Injectable()
export class AppService {
    constructor(
        private http: HttpClient) {
    }

    public getLocations(): Observable<Results> {

        return this.http
            .get(AppUri)
            .map((locationResult: Results) => {
                return locationResult;
            });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GENERAL } from './../../app-config';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const path = GENERAL.ENTORNO.PAGO_SERVICE;

@Injectable()
export class PagoService {

  constructor(private http: HttpClient) {
  }

  get(endpoint) {
    return this.http.get(path + endpoint).pipe(
      catchError(this.handleError),
    );
  }

  post(endpoint, element) {
    return this.http.post(path + endpoint, element).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error)}`);
    }
    // return an observable with a user-facing error message
    return throwError({
      status: error.status,
      message: 'Something bad happened; please try again later.',
    });
  };
}

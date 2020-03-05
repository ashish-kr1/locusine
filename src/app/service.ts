import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Services {
    constructor(private http: HttpClient) { }
    header() {
        return new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }
    addUser(data): Observable<any> {
        return this.http.post(`${environment.API}/addUser`, data, { headers: this.header() });
    }
    getUsers(): Observable<any> {
        return this.http.get(`${environment.API}/getUsers`, { headers: this.header() });
    }
    updateUser(data): Observable<any> {
        return this.http.put(`${environment.API}/updateUser`, data, { headers: this.header() });
    }
    deleteUser(id): Observable<any> {
        return this.http.delete(`${environment.API}/deleteUser/${id}`, { headers: this.header() });
    }
}
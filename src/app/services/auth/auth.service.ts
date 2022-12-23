import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/User';

import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public userLogged = new EventEmitter<boolean>();
    public isUserLogged: boolean = localStorage.getItem('userLogged') ? true : false;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('userLogged') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentUser.subscribe((value) => value ? this.userLogged.next(true): this.userLogged.next(false));
    }

    login(username: string, password: string) {
      const user = {username, password};
        return this.http.post(`${environment.genericBEURL}/users/login`, { username, password })
            .pipe(map((user: any) => {
                localStorage.setItem('userLogged', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.userLogged.next(true);
                this.isUserLogged = true;
                return user;
            }, (err: any) => console.error('error ::: ', err)));
        }
        
        logout() {
            localStorage.removeItem('userLogged');
            this.currentUserSubject.next({username: '', email: ''});
            this.userLogged.next(false);
            this.isUserLogged = false;
    }
}
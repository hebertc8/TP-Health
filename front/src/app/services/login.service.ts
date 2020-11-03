import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface UserInfo {
  idccms: number;
  nombre: string;
  refreshToken: string;
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: any;

  constructor(private http: HttpClient) { }


  login(user) {
    const path = environment.apiUrl + '/api/ccmslogin';
    const info = btoa(JSON.stringify(user));
    return this.http.post(path, { body: 's' + info });
  }


  setUser(info) {
    localStorage.setItem('info', JSON.stringify(info));
  }

  getUser(): UserInfo {
    return JSON.parse(localStorage.getItem('info'));
  }

  logout() {
    localStorage.clear();
  }

  relogin(user) {
    localStorage.removeItem('info');
    localStorage.setItem('info', JSON.stringify(user));
    return true;
  }
}

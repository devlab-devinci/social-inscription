import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.fireAuth.authState.pipe(
        map((auth) =>  {
        if(auth == null) {

          return true;
        } 
        this.router.navigate(['/projects']);
        return false;
      }));
  }
}
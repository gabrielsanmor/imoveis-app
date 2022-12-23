import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):
    |   boolean| UrlTree| Observable<boolean | UrlTree>| Promise<boolean | UrlTree> {
            this.authService.getAccessToken();

            var user = this.authService.user.getValue();

            if (user?.nome) {
                if (route.data['requiredAuth'] == false) {
                    this.router.navigate(['/dashboard']);
                    return false;
                }
                return true;
            } else {
                if (route.data['requiredAuth'] == true) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            }
        }
}

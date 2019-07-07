import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

/* The auth guard is used to prevent unauthenticated users from accessing restricted routes,
 * in this example it's used in app.routing.ts to protect the home page route.
 *
 *
 *
 * NOTE: While technically it's possible to bypass this client side authentication check by
 * manually adding a 'currentUser' object to local storage using browser dev tools, this would
 * only give access to the client side routes/components. This bypass will not work with real
 * backend system, because a valid authentication token (JWT) is required.
 */

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
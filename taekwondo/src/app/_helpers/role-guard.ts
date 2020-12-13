import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { LoginService } from '../_services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: LoginService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let jwtHelper = new JwtHelperService();
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = jwtHelper.decodeToken(token);
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.sub !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
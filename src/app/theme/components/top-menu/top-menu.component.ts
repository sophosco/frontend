import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {

  public profile: any = [];
  public userSession: string = 'anonimo';
  public currencies = ['USD', 'EUR'];
  public currency: any;
  public flags = [
    { name: 'Español', image: 'assets/images/flags/tr.svg' },
    { name: 'English', image: 'assets/images/flags/gb.svg' }
  ]
  public flag: any;

  constructor(public appService: AppService,
    public cartService: CartService,
    public authService: AuthService,
    public router: Router,
    public securityService: SecurityService) {
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }

  public changeCurrency(currency) {
    this.currency = currency;
  }

  public changeLang(flag) {
    this.flag = flag;
  }

  public changeValidateUser() {
    if (this.authService.isAuthenticated()) {
      if (this.authService.userProfile) {
        this.profile = this.authService.userProfile;
      } else {
        this.authService.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }
  }

  public login() {
    this.securityService.getTokenAuthentication("1").subscribe(tokenData => { });
    this.authService.login();
  }

  public logout() {
    this.securityService.logOutSession();
    this.securityService.getTokenAuthentication("1").subscribe(tokenData => { });
    this.authService.logout();
  }

}

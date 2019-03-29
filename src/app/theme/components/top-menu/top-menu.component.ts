import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { CartService } from '../../../services/cart.services';
import { SecurityService } from '../../../services/security.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public userSession: string = 'hola';
  public currencies = ['USD', 'EUR'];
  public currency: any;
  public flags = [
    { name: 'Español', image: 'assets/images/flags/tr.svg' },
    { name: 'English', image: 'assets/images/flags/gb.svg' }
  ]
  public flag: any;

  constructor(public appService: AppService,
    public router: Router,
    public securityService: SecurityService) { }

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

  public logOutSession() {
    
    this.securityService.logOutSession();
    this.securityService.getTokenAuthentication("1").subscribe(tokenData => {

    });

    this.router.navigate(['/sign-in']);

  }


}

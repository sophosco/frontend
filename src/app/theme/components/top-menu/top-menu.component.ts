import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'Colombia', image: 'assets/images/flags/gb.svg' },
    { name:'English', image: 'assets/images/flags/de.svg' }
  ]
  public flag:any;

  constructor(public appService:AppService) { }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];    
  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

  

}

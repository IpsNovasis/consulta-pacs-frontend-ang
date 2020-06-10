import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'mockup-app';
  disableMenuLateral = false;

  ngOnInit() {
  }

  menuLateral() {
    console.log(this.disableMenuLateral);
    if (this.disableMenuLateral) {
      this.disableMenuLateral = false;
    } else {
      this.disableMenuLateral = true;
    }
  }
}

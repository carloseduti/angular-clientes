import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cliente',
  templateUrl: 'cliente.component.html',
  styleUrls: ['cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(translate: TranslateService) {

  }

  ngOnInit() {
  }

}

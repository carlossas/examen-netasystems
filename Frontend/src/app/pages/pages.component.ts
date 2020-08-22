import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { UtilidadesService } from '../services/utilidades/utilidades.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})



export class PagesComponent implements OnInit {
  constructor(
    public router: Router,
    public utilidadesS: UtilidadesService,
  ) { }

  ngOnInit() {
    // this.preloaderS.show();
  }




}

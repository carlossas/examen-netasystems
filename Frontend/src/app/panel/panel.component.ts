import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilidadesService } from '../services/utilidades/utilidades.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(
    public router: Router,
    public utilidadesS: UtilidadesService
  ) { }

  ngOnInit(): void {
  }

}

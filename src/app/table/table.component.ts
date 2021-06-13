import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../../service/releases.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor( private releasesService: ReleasesService) { }

  release: any;
  ngOnInit(): void {
    this.fullControlRelease();
  }

  fullControlRelease(){
    this.releasesService.fullControlRelease().subscribe( release => {
    this.release = release;
    }, err => {
      console.log('erro ao listar')
    });
  }

}

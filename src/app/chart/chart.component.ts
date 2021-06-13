import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReleasesService } from '../../service/releases.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private releasesService: ReleasesService) { }
  release: Array<any> = new Array();
  dataEfetiva: Array<any> = new Array();
  dataQuantidaeRemessa: Array<any> = new Array();
  dataValorRemessa: Array<any> = new Array();
  canvasChart: any;
  canvas: any;
  ctx: any;
  arr: any;

  ngOnInit() {
    this.releaseControlList();
  }

  @ViewChild('quantidadeLancamentoRemessa') quantidadeLancamentoRemessa: any;
  @ViewChild('valorRemessa') valorRemessa: any;

  async releaseControlList() {
    this.releasesService.releaseControlList().subscribe(async release => {
      this.release = release;
      this.arr = release.map((obj: any) => {
        this.dataEfetiva.push(obj.dataEfetivaLancamento);
        this.dataQuantidaeRemessa.push(obj.quantidadeLancamentoRemessa);
        this.dataValorRemessa.push(obj.valorLancamentoRemessa);

        //pode ser dividido para outro componente
        this.canvasChart = (data: [], remessa: [], label: string) => {
          let response = {
            type: 'bar',
            data: {
              labels: data,
              datasets: [{
                data: remessa,
                label: label,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
              },
              ]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          }
          return response

        };

      });

      this.canvas = this.quantidadeLancamentoRemessa.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      new Chart(
        this.ctx,
        this.canvasChart(this.dataEfetiva, this.dataQuantidaeRemessa,  'Quantidade Remessa')
      )

      this.canvas = this.valorRemessa.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      new Chart(
        this.ctx,
        this.canvasChart(this.dataEfetiva, this.dataValorRemessa, 'Valor Remessa')
      )


    }, err => {
      console.log('erro ao listar')
    });
  }
}

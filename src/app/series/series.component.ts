import { Component, OnInit } from '@angular/core';
import { Serie } from './serie';
import { dataSeries } from './dataSeries';
import { SeriesService } from './service.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  
  series: Array<Serie> = [];
  promedioTemporadas: number = 0;
  
  constructor(private serieService: SeriesService) { }
  
  getSeries() {
    console.log("estas usando getSeries");
    this.serieService.getSeries().subscribe(series=>{this.series = series;});

    
  }

  getPromedio(){
    let total_temporadas : number = 0;
    for (let s of this.series) {
      if (typeof s.seasons === 'number') {
        total_temporadas += s.seasons;
      } else {
        console.error('Non-numeric season count detected:', s.seasons);
      }
    }
    this.promedioTemporadas = this.series.length > 0 ? total_temporadas / this.series.length: 69;
  }



//esta función usa el archivo data
  getSeriesList(): Array<Serie> {
    console.log("estas usando getSeriesList");
    return dataSeries;
  }

  ngOnInit():void {
    this.series = this.getSeriesList();
    console.log(this.series)
    this.getPromedio();
    
  }




}
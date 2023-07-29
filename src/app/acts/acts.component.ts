import { Component,OnInit} from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Chart, ChartType, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';
interface CrimeRateData {
  year: string;
  crimeRate: number;
}
interface LiteracyRateData {
  state: string;
  womenRate: number;
  literacyRate: number;
}

@Component({
  selector: 'app-acts',
  templateUrl: './acts.component.html',
  styleUrls: ['./acts.component.css']
})
export class ActsComponent implements OnInit{
  isDropdownOpen: boolean = false;
  username:string="";
  pieChart: Chart | undefined;
  barChart: Chart | undefined;
  crimeRateData: CrimeRateData[] = [
    { year: '2015', crimeRate: 54.23 },
    { year: '2016', crimeRate: 55.19 },
    { year: '2017', crimeRate: 57.93},
    { year: '2018', crimeRate: 58.78 },
    { year: '2019', crimeRate: 62.39 },
  ];

  literacyData: any;

  constructor(private authService: AuthserviceService,private http:HttpClient) {}
  ngOnInit() {
    this.authService.username$.subscribe(username => {
      this.username = username; 
    });
    Chart.register(...registerables);
   
   
    this.renderBarChart();
    this.literacyData = {
      state: ['Andhra Pradesh', 'Arunachal Pradesh', 'Bihar','Chattisgarh','Goa','Himachal Pradesh','Jharkhand','Kerala','Manipur','Nagaland','Odisha','Punjab','Sikkim','TamilNadu','Uttarakhand','West Bengal'],
      totalWomen: [5000000, 9000000, 4000000,5000000,6000000,4000000,3000000,5000000,70000000],
      maleLiteracyRate: [75.56,73.69,73.39,81.45,92.81,90.83,78.45,96.02,86.49,83.29,82.57,80.49,92.43,80.08,88.33,79.24],
      femaleLiteracyRate: [59.74, 59.57, 53.33,60.57,81.84,76.6,56.21,91.98,73.17,76.69,64.36,71.34,52.66,76.43,73.86,70.7]
    };

    this.renderPieChart();
  
  }
 
  isReadClicked: boolean = false;
  isComplaintDropdownOpen:boolean=false;
  isInspirationsDropdownOpen:boolean=false;
  readData: any;
  openDropdown(event: MouseEvent, dropdownType: string) {
    if (dropdownType === 'complaint') {
      this.isComplaintDropdownOpen = true;
    } else if (dropdownType === 'ins') {
      this.isInspirationsDropdownOpen = true;
    }
  }
  
  closeDropdown(event: MouseEvent, dropdownType: string) {
    if (dropdownType === 'complaint') {
      this.isComplaintDropdownOpen = false;
    } else if (dropdownType === 'ins') {
      this.isInspirationsDropdownOpen = false;
    }
  }



  renderBarChart() {
    const years = this.crimeRateData.map((item) => item.year);
    const crimeRates = this.crimeRateData.map((item) => item.crimeRate);
    const colors = ['#007bff', '#dc3545', '#ffc107','green','pink','orange','aqua','gray','maroon','brown','yellow'];

    const ctx = document.getElementById('crime-rate-bar-chart') as HTMLCanvasElement;
  
    if (!ctx) {
      console.error("Canvas context not available.");
      return;
    }
  
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Crime Rate for Women in India',
            data: crimeRates,
            backgroundColor: colors,
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50,
              precision: 0,
            },
          },
        },
      },
    });
  }




  renderPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const labels = this.literacyData.state;
    const dataPoints = this.literacyData.femaleLiteracyRate;
    const colors = ['#007bff', '#dc3545', '#ffc107','green','pink','orange','aqua','gray','maroon','brown','yellow'];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: dataPoints,
          backgroundColor: colors,
          hoverOffset: 4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      }
    });
  }

}


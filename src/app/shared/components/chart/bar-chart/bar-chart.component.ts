import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component( {
	selector: 'app-bar-chart',
	templateUrl: './bar-chart.component.html',
	styleUrls: [ './bar-chart.component.scss' ]
} )
export class BarChartComponent implements OnChanges {

	@Input() dataParent;
	@ViewChild( BaseChartDirective, { static: false } ) public chart: BaseChartDirective;
	@Input() height = '400px';
	dataForChart: any = {};

	constructor() {
	}

	public barChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				display: false
			},
		},
		animation: {
			duration: 2000,
			easing: 'easeOutExpo'
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}
		},
		scales: {
			yAxes: [ {
				gridLines: {
					drawBorder: false,
					display: true,
					color: '#F5F5F5',
					zeroLineColor: '#9B9B9B',
					zeroLineWidth: 2
				},
				ticks: {
					display: true,
					beginAtZero: true,
					fontColor: '#CCCCCC',
					fontSize: 10,
					padding: 10
				},
			} ],
			xAxes: [ {
				gridLines: {
					drawBorder: false,
					display: true,
					color: '#f5f5f5',
					zeroLineColor: '#9B9B9B',
					zeroLineWidth: 2,
				},
				ticks: {
					display: true,
					beginAtZero: true,
					fontColor: '#CCCCCC',
					fontSize: 10,
					padding: 10
				}
			} ]
		},
		tooltips: {
			xPadding: 10,
			yPadding: 10,
			titleFontSize: 12,
			bodyFontSize: 10,
			bodyFontStyle: '300',
			bodySpacing: 8
		},
		legend: {
			fullWidth: true,
			labels: {
				fontSize: 12,
				fontFamily: 'Ubuntu',
				usePointStyle: true,
			}
		},
	};
	public barChartLabels: Label[];
	public barChartType: ChartType = 'bar';
	public barChartLegend = false;
	public barChartPlugins = [];
	public barChartData: ChartDataSets[];
	public barChartColorScheme: Color[] = [
		/*{
			backgroundColor: [ '#FFB7B3', '#B5E3D0', '#F2A6D4',
				'#FFCA99', '#CCCCCC', '#A0D8F8' ],
			// borderColor: [ 'rgba(88,153,218,0)', 'rgba(232,116,59,0)', 'rgba(25,169,121,0)',
			// 	'rgba(82,93,244,0)', 'rgba(148,94,207,0)', 'rgba(19,164,180,0)' ]
		}*/
	];


	ngOnChanges( data: SimpleChanges ) {
		if ( data.dataParent.currentValue !== undefined ) {

			this.dataForChart.label = this.dataParent.label.map( val => {
				if ( val === null ) {
					return [ '' ];
				}
				return val.match( /\b[\w']+(?:[^\w\n]+[\w']+){0,1}\b/g );
			} );
			this.dataForChart.data = this.dataParent.data;

		}
		if ( window.innerWidth < 768 ) {
			this.barChartOptions.scales.yAxes = [ {
				stacked: true,
				gridLines: {
					display: false,
				},
				ticks: {
					display: true,
					beginAtZero: true,
					fontColor: '#9F9F9F',
					fontSize: 12,
					padding: 10
				}
			} ];
			this.barChartOptions.layout.padding = {
				left: 10,
				right: 10,
				top: 30,
				bottom: 30
			};
		}

	}


}

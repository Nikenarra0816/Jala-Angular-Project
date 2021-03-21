import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective, Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component( {
	selector: 'app-line-chart',
	templateUrl: './line-chart.component.html',
	styleUrls: [ './line-chart.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class LineChartComponent implements OnChanges {
	@Input() data;
	@Input() label;
	public lineChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		/*animation: {
			duration: 300,
			easing: 'ease'
		},*/
		plugins: {
			datalabels: {
				display: false
			}
		},
		tooltips: {
			mode: 'x-axis',
			intersect: false,
			cornerRadius: 5,
			xPadding: 10,
			yPadding: 10,
			titleFontSize: 12,
			bodyFontSize: 10,
			bodyFontStyle: '300',
			bodySpacing: 8
		},
		elements: {
			line: {
				tension: 0
			},
			point: {
				radius: 0,
			}
		},
		scales: {
			// We use this empty structure as a placeholder for dynamic theming.
			xAxes: [ {
				display: true,
				ticks: {
					display: true,
					maxTicksLimit: 10,
					beginAtZero: true,
					fontColor: '#9B9B9B',
					fontSize: 12,
					padding: 10
				},
				gridLines: {
					display: true,
					color: '#f5f5f5',
					zeroLineColor: '#9B9B9B',
					zeroLineWidth: 2,
				}
			} ],
			yAxes: [ {
				display: true,
				ticks: {
					maxTicksLimit: 12,
					stepSize: 1,
					display: true,
					fontColor: '#9B9B9B',
					fontSize: 13,
					padding: 10
				},
				gridLines: {
					display: true,
					color: '#f5f5f5',
					zeroLineColor: '#9B9B9B',
					zeroLineWidth: 2,
				},
			} ]
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
	public lineChartColors: Color[] = [
		/*{
			backgroundColor: 'rgba(255,183,179,.5)',
		},
		{
			backgroundColor: 'rgba(181,227,208,.5)',
		},
		{
			backgroundColor: 'rgba(242,166,212,.5)',
		},
		{
			backgroundColor: 'rgba(255,202,153,.5)',
		},
		{
			backgroundColor: 'rgba(204,204,204,.5)',
		},
		{
			backgroundColor: 'rgba(160,216,248,.5)',
		}*/
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];

	@ViewChild( BaseChartDirective, { static: false } ) chart: BaseChartDirective;

	constructor() {
	}

	ngOnChanges( data: SimpleChanges ) {
		if ( data.data.currentValue.length === 0 ) {
			this.data = [ {
				data: [ 0 ],
				label: ''
			} ];
		}
		if ( data.label.currentValue.length < 2 ) {
			this.label = [ 'Begin', ...this.label ];
			this.data.forEach( val => {
				val.data = [ 0, ...val.data ];
			} );
		}
	}

}

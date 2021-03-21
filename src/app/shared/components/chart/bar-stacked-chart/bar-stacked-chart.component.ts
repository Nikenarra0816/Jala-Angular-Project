import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import cloneDeep from 'lodash-es/cloneDeep';

@Component( {
	selector: 'app-bar-stacked-chart',
	templateUrl: './bar-stacked-chart.component.html',
	styleUrls: [ './bar-stacked-chart.component.scss' ]
} )
export class BarStackedChartComponent implements OnChanges, OnInit {

	@Input() dataParent;
	@Input() autoHeight = true;
	@Input() limit = 5;
	@Input() showMore = false;
	@ViewChild( BaseChartDirective, { static: false } ) public chart: BaseChartDirective;
	height = '400px';
	dataForChart: any = {};
	// tslint:disable-next-line:variable-name
	_limit;

	constructor() {
		this._limit = this.limit;
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
			/*xAxes: [{
				stacked: true,
				scaleLabel: {
					display: true
				},
				ticks: {
					fontSize: 20,
					fontFamily: 'Poppins'
				},
				gridLines: {
					borderDash: [3, 4]
				}
			}],*/
			yAxes: [ {
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
				},
			} ],
			/*yAxes: [{
				stacked: true,
				scaleLabel: {
					display: true
				},
				ticks: {
					fontSize: 20,
					fontFamily: 'Poppins'
				},
				gridLines: {
					display: false
				},
				// barPercentage: 1.0,
				// categoryPercentage: 0.5,
				barThickness: 30,
				// maxBarThickness: 35,
			}]*/
			xAxes: [ {
				stacked: true,
				gridLines: {
					color: '#E8E8E8',
					offsetGridLines: false,
					drawBorder: false,
					drawTicks: false,
				},
				ticks: {
					display: true,
					beginAtZero: true,
					fontColor: '#9F9F9F',
					fontSize: 12,
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
			bodySpacing: 8,
			callbacks: {
				footer( item: Chart.ChartTooltipItem[], data: Chart.ChartData ): string | string[] {
					let all = 0;
					item.forEach( ( value, index ) => {
						all = all + Number( value.value );
					} );
					return `Total All: ${ all }`;
				}
			}
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
	public barChartType: ChartType = 'horizontalBar';
	public barChartLegend = true;
	public barChartPlugins = [];
	public barChartData: ChartDataSets[];
	public barChartColorScheme: Color[] = [];
	defaultColor = [
		{
			backgroundColor: '#FFB7B3',
		},
		{
			backgroundColor: '#B5E3D0',
		},
		{
			backgroundColor: '#F2A6D4',
		},
		{
			backgroundColor: '#FFCA99',
		},
		{
			backgroundColor: '#CCCCCC',
		},
		{
			backgroundColor: '#A0D8F8',
		}
	];

	showMoreData() {
		if ( this.dataParent.data[0].data.length >= this._limit ) {
			this.dataForChart = this.sliceData( this.dataParent, 0, ( this._limit + this.limit ) );
			this._limit = this._limit + this.limit;
		}
		this.checkHeight();
	}

	showLessData() {
		this.dataForChart = this.sliceData( this.dataParent, 0, this._limit - this.limit );
		this._limit = this._limit - this.limit;
		this.checkHeight();
	}

	private sliceData( value, from, to ) {
		const slicedData = cloneDeep( value );
		slicedData.data = slicedData.data.map( val => {
			const x = val;
			x.data = val.data.slice( from, to );
			return x;
		} );
		slicedData.label = slicedData.label.slice( from, to );
		return slicedData;
	}

	checkHeight() {
		if ( this.autoHeight ) {
			const length = this.dataForChart.label.length;
			if ( length === 1 ) {
				this.height = `${ length * 200 }px`;
				this.barChartOptions.tooltips.custom = ( tooltip ) => {
					tooltip.x = 500;
					tooltip.y = 10;
				};
				this.barChartOptions.tooltips.caretSize = 0;
			} else if ( length <= 3 ) {
				this.height = `${ ( length * 130 ) }px`;
			} else if ( length <= 5 ) {
				this.height = `${ ( length * 75 ) }px`;
			} else {
				this.height = `${ ( length * 60 ) }px`;
			}
		}
		this.dataForChart.label = this.dataForChart.label.map( val => {
			if ( val === null ) {
				return [ '' ];
			}
			return val.match( /\b[\w']+(?:[^\w\n]+[\w']+){0,1}\b/g );
		} );
		if ( this.chart !== undefined ) {
			this.chart.ngOnDestroy();
			setTimeout( () => {
				this.chart.chart = this.chart.getChartBuilder( this.chart.ctx );
			}, 300 );
		}
	}

	ngOnChanges( data: SimpleChanges ) {
		if ( data.dataParent.currentValue !== undefined ) {
			/// FOR DEFAULT COLOR, check if arr valid
			if ( this.dataParent.data.length ) {
				// check if have property backgroundColor
				if ( !this.dataParent.data[0].hasOwnProperty( 'backgroundColor' ) ) {
					this.barChartColorScheme = this.defaultColor;
				}
			}
			if ( this.showMore ) {
				this.dataForChart = this.sliceData( this.dataParent, 0, this.limit );
			} else {
				this.dataForChart = this.sliceData( this.dataParent, 0, this.limit );
			}
			this.checkHeight();
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
					fontColor: '#646c9a',
					fontSize: 13,
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

	ngOnInit(): void {
	}
}

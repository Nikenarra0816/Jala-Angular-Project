import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import { darkenColor } from '@shared/function/colorFunction';


@Component( {
	selector: 'app-report-dashboard',
	templateUrl: './report-dashboard.component.html',
	styleUrls: [ './report-dashboard.component.scss' ]
} )
export class ReportDashboardComponent implements OnInit {
	constructor() {
	}

	data: DAG = {
		nodes: [ {
			node: 0,
			name: 'New Leads',
			color: '#B5E3D0'
		}, {
			node: 1,
			name: 'Interested',
			color: '#FFCA99'
		}, {
			node: 2,
			name: 'Booking',
			color: '#FFB7B3'
		}, {
			node: 3,
			name: 'Closing',
			color: '#F2A6D4'
		}, {
			node: 4,
			name: 'Unqualified',
			color: '#CCCCCC'
		}, {
			node: 5,
			name: 'Invalid',
			color: '#5158cc'
		} ],
		links: [ {
			source: 0,
			target: 1,
			value: 5
		}, {
			source: 0,
			target: 5,
			value: 3,
		}, {
			source: 0,
			target: 4,
			value: 2,
		}, {
			source: 1,
			target: 2,
			value: 4,
		}, {
			source: 1,
			target: 4,
			value: 1,
		}, {
			source: 2,
			target: 3,
			value: 2,
		}, {
			source: 2,
			target: 4,
			value: 2,
		} ]
	};

	ngOnInit(): void {
		this.DrawChart( this.data );
	}

	private DrawChart( data ) {

		const svg = d3.select( '#sankey' )
			.attr( 'preserveAspectRatio', 'xMinYMin meet' )
			.attr( 'viewBox', '0 0 700 300' );

		const width = 700;
		const height = 300;

		const formatNumber = d3.format( ',.0f' );
		const format = ( d: number ) => {
			return formatNumber( d ) + ' Leads';
		};

		const sankey = d3Sankey.sankey()
			.nodeWidth( 60 )
			.nodePadding( 10 )
			.extent( [ [ 1, 1 ], [ width - 1, height - 6 ] ] );

		let link = svg.append( 'g' )
			.attr( 'class', 'links' )
			.attr( 'fill', 'none' )
			.selectAll( 'path' );

		let node = svg.append( 'g' )
			.attr( 'class', 'nodes' )
			.attr( 'font-family', 'sans-serif' )
			.attr( 'font-size', 10 )
			.selectAll( 'g' );


		sankey( data );

		link = link
			.data( data.links )
			.enter().append( 'path' )
			.attr( 'd', d3Sankey.sankeyLinkHorizontal() )
			.attr( 'class', 'links-item' )
			.attr( 'stroke', '#000' )
			.attr( 'stroke-opacity', 0.3 )
			.attr( 'stroke-width', ( d: any ) => Math.max( 1, d.width ) );

		link.append( 'title' )
			.text( ( d: any ) => d.source.name + ' → ' + d.target.name + '\n' + format( d.value ) );

		node = node
			.data( data.nodes )
			.enter().append( 'g' );

		node.append( 'rect' )
			.attr( 'x', ( d: any ) => d.x0 )
			.attr( 'y', ( d: any ) => d.y0 )
			.attr( 'height', ( d: any ) => d.y1 - d.y0 )
			.attr( 'width', ( d: any ) => d.x1 - d.x0 )
			.attr( 'fill', ( d: any ) => d.color );

		/*node.append( 'text' )
			.attr( 'x', ( d: any ) => d.x0 - 6 )
			.attr( 'y', ( d: any ) => ( d.y1 + d.y0 ) / 2 )
			.attr( 'dy', '0.35em' )
			.attr( 'text-anchor', 'end' )
			.text( ( d: any ) => d.name )
			.filter( ( d: any ) => d.x0 < width / 2 )
			.attr( 'x', ( d: any ) => d.x1 + 6 )
			.attr( 'text-anchor', 'start' );
		*/
		node.append( 'text' )
			.attr( 'class', 'node-text' )
			.attr( 'x', ( d: any ) => ( d.x0 + d.x1 ) / 2 )
			.attr( 'y', ( d: any ) => ( d.y1 + d.y0 ) / 2 )
			.attr( 'dy', '0.35em' )
			.attr( 'text-anchor', 'middle' )
			.attr( 'fill', ( d: any ) => darkenColor( d.color, .5 ) )
			.text( ( d: any ) => d.name );

		node.append( 'title' )
			.text( ( d: any ) => d.name + '\n' + format( d.value ) );
	}

}

interface SNodeExtra {
	node: number;
	name: string;
	color: string;
}

interface SLinkExtra {
	source: number;
	target: number;
	value: number;
}

type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;

interface DAG {
	nodes: SNode[];
	links: SLink[];
}

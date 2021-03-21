import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { darkenColor, shadowColored } from '@shared/function/colorFunction';
import { expandedRightAnimation, inAndOutOpacity } from '@shared/animations/expandedAnimation';
import { IPipeline } from '@shared/models/pipeline.model';


@Component( {
	selector: 'app-pipeline-list-card',
	templateUrl: './pipeline-list-card.component.html',
	styleUrls: [ './pipeline-list-card.component.scss' ],
	animations: [ expandedRightAnimation( .2 ), inAndOutOpacity( .2 ) ]
} )
export class PipelineListCardComponent implements OnInit {

	@Input() dataParent: IPipeline;
	@Output() changeTitle = new EventEmitter<Partial<IPipeline>>();
	@Output() clicked = new EventEmitter<IPipeline>();
	@Output() deleteClicked = new EventEmitter<IPipeline>();
	/////////////////////////////
	// tslint:disable-next-line:variable-name
	private _backdropShow = false;
	isSettingOpen = false;
	isEditOpen = false;
	////////////////////////////////
	title = new FormControl( { value: '', disabled: true } );

	constructor() {
	}

	//////////////////////////////////////
	set backdropShow( val ) {
		this._backdropShow = val;
	}

	get backdropShow() {
		return this._backdropShow;
	}

	//////////////////////////////////////
	settingClick() {
		this.isSettingOpen = !this.isSettingOpen;
		this.backdropShow = !this.backdropShow;
	}

	changeColor( val, num ) {
		return darkenColor( val, num );
	}

	fadeColor( val, num ) {
		const x = shadowColored( val, num );
		return `0 0 9px 5px ${ x }`;
	}

	///////////////////////////////////////

	deleteClick() {
		this.deleteClicked.emit( this.dataParent );
	}

	openEdit() {
		this.isEditOpen = true;
		this.title.enable();
	}

	saveEdit() {
		const data: Partial<IPipeline> = {
			name: this.title.value,
			id: this.dataParent.id
		};
		this.changeTitle.emit( data );
		this.closeEdit();
	}

	closeEdit( reset?: boolean ) {
		this.isEditOpen = false;
		this.title.disable();
		this.isSettingOpen = !this.isSettingOpen;
		this.backdropShow = !this.backdropShow;
		if ( reset ) {
			this.title.reset( this.dataParent.name );
		}
	}

	backdropClick() {
		this.backdropShow = !this.backdropShow;
		this.isSettingOpen = false;
	}

	jumpToDetail() {
		if ( this.isEditOpen ) {
			return;
		}
		if ( this.isSettingOpen ) {
			return;
		}
		this.clicked.emit( this.dataParent );
	}

	ngOnInit(): void {
		this.title.setValue( this.dataParent.name );
	}


}

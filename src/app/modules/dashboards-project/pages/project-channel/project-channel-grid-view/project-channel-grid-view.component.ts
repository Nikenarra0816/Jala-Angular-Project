import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges
} from '@angular/core';
import { Channel } from '@shared/models/channel.model';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component( {
	selector: 'app-project-channel-grid-view',
	templateUrl: './project-channel-grid-view.component.html',
	styleUrls: [ './project-channel-grid-view.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ProjectChannelGridViewComponent implements OnChanges, OnDestroy {
	@Input() dataChannel: Channel[];
	@Output() editClicked = new EventEmitter<Channel>();

	// tslint:disable-next-line:variable-name
	private readonly _dataShow = new BehaviorSubject<Channel[]>( undefined );

	constructor( private filterLead: CustomStateService, private router: Router, private route: ActivatedRoute ) {
	}

	private slice = 10;

	get dataShow() {
		return this._dataShow.asObservable();
	}

	test() {
		this.slice += 10;
		this._dataShow.next( this.dataChannel.slice( 0, this.slice ) );
	}

	edit( value: Channel ) {
		this.editClicked.emit( value );
	}

	jumpToLead( value ) {
		this.filterLead.setFilter = { getChannel: value };
		this.router.navigate( [ '../', 'lead' ], { relativeTo: this.route } );
	}

	ngOnChanges( changes: SimpleChanges ): void {
		this._dataShow.next( this.dataChannel.slice( 0, this.slice ) );
	}

	ngOnDestroy(): void {
		this._dataShow.unsubscribe();
	}

}

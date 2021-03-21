import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Project} from '@shared/models/project.model';
import {DashboardProjectService} from '@core/services/dashboard-project/dashboard-project.service';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';


@Component({
	selector: 'app-project-list',
	template: `
		<div class="wrapper">
			<app-breadcrumb title="Project" subtitle="List"></app-breadcrumb>
			<div class="button-action">
				<button (click)="tabs = 2" class="button-jala-icon button-jala-icon-gray"
						[ngClass]="{'button-jala-icon-gray--active' : tabs === 1}">
					<svg class="button-jala-icon-svg">
						<use xlink:href="assets/symbol-defs.svg#icon-grid"></use>
					</svg>
				</button>
				<button (click)="tabs = 1" class="button-jala-icon button-jala-icon-gray"
						[ngClass]="{'button-jala-icon-gray--active' : tabs === 2}">
					<svg class="button-jala-icon-svg">
						<use xlink:href="assets/symbol-defs.svg#icon-list"></use>
					</svg>
				</button>
				<button appJalaButton color="dark" routerLink="../product">ALL PRODUCT</button>
				<button appJalaButton color="gray" routerLink="../all-lead">ALL LEAD</button>
				<button appJalaButton color="green" routerLink="../form">FORM</button>
				<ng-template [appPermission]="{page: 'project', feature: 'add'}">
					<button appJalaButtonInlineIcon color="primary" icon="plus-thick" routerLink="../new">ADD</button>
				</ng-template>
			</div>
		</div>
		<div *ngIf="dataParent | async as data">
			<app-project-list-grid-view *ngIf="tabs === 2" [dataProject]="data"></app-project-list-grid-view>
			<app-project-list-view *ngIf="tabs === 1" [dataProject]="data"></app-project-list-view>
		</div>
	`,
	styles: [`
		.wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.button-action {
			display: flex;
			align-items: center;
			margin-left: auto;
		}

		.button-action > button {
			position: relative;
			margin: 0 1rem;
		}

		.button-action > button:nth-child(3) {
			width: 16.5rem;
			margin-right: 0;
			margin-left: 3rem;
		}

		.button-action > button:nth-child(n+4) {
			width: 16.5rem;
			margin-right: 0;
		}
	`]
})
export class ProjectListComponent implements OnInit, AfterViewInit {
	public tabs = 2;
	public dataParent: Observable<Project[]>;

	constructor(private http: DashboardProjectService) {
	}

	ngOnInit(): void {
		this.dataParent = this.http.getAllProjects()
			.pipe(
				switchMap(value => {
					return this.http.getAllProjectsSummary()
						.pipe(
							map(value1 => {
								value1.forEach(value2 => {
									const index = value.findIndex(value3 => value3.data.id === value2.id);
									if (index !== -1) {
										value[index].summary = value2;
									}
								});
								return value;
							})
						);
				})
			);
	}

	ngAfterViewInit(): void {
	}

}

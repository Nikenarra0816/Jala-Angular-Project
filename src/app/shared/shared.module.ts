import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { JalaButtonDirective } from './directives/button/jala-button.directive';
import { JalaButtonIconDirective } from './directives/button/jala-button-icon.directive';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormFieldErrorComponent } from './components/form-field/form-field-error/form-field-error.component';
import { FormFieldInputDirective } from './components/form-field/form-field-input.directive';
import { CheckboxDirective } from './directives/checkbox/checkbox.directive';
import { ImageLoaderDirective } from './directives/image-loader/image-loader.directive';
import { SelectComponent } from './components/select/select.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { OnlyDigitDirective } from './directives/only-digit/only-digit.directive';
import { CheckEmailValidatorDirective, CheckPhoneValidatorDirective } from './validators/asyncValidator';
import { PortalModule } from '@angular/cdk/portal';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JalaButtonInlineIconDirective } from './directives/button/jala-button-inline-icon.directive';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CardListSummaryComponent } from '@shared/components/card-list-summary/card-list-summary.component';
import { SmoothHeightDirective } from './directives/smooth-height/smooth-height.directive';
import { FormFieldGreenComponent } from './components/form-field-green/form-field-green.component';
import { FormFieldInputGreenDirective } from './components/form-field-green/form-field-input-green.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ButtonToggleGroupComponent } from './components/button-toggle-group/button-toggle-group.component';
import { ButtonToggleComponent } from './components/button-toggle-group/button-toggle/button-toggle.component';
import { ChartsModule } from 'ng2-charts';
import { BarStackedChartComponent } from './components/chart/bar-stacked-chart/bar-stacked-chart.component';
import { LineChartComponent } from './components/chart/line-chart/line-chart.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImageUploadComponent } from '@shared/components/image-upload/image-upload.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CopyClipboardDirective } from './directives/copy-clipboard/copy-clipboard.directive';
import { TruncatePipe } from './pipe/truncate.pipe';
import { TruncateWordPipe } from './pipe/truncate-word.pipe';
import { BarChartComponent } from './components/chart/bar-chart/bar-chart.component';
import { MatSortModule } from '@angular/material';
import { NumberShortPipe } from './pipe/number-short.pipe';
import { MatSelectModule } from '@angular/material/select';
import { StartCasePipe } from './pipe/start-case.pipe';
import { PermissionDirective } from '@shared/directives/permission/permission.directive';
import { DateFormatDistancePipe } from './pipe/date-format-distance.pipe';
import { DialogConfirmationComponent } from '@shared/components/dialog-confirmation/dialog-confirmation.component';
import { LoaderSpinnerV2Component } from './components/loader-spinner-v2/loader-spinner-v2.component';
import { LoaderSpinnerDirective } from './components/loader-spinner-v2/loader-spinner.directive';
import { IntersectionDirective } from './directives/intersection/intersection.directive';
import { CurrencyShortPipe } from './pipe/currency-short.pipe';


@NgModule( {
	declarations: [
		StepperComponent,
		CheckboxComponent,
		JalaButtonDirective,
		JalaButtonIconDirective,
		FormFieldComponent,
		FormFieldErrorComponent,
		FormFieldInputDirective,
		CheckboxDirective,
		ImageLoaderDirective,
		SelectComponent,
		OnlyDigitDirective,
		CheckEmailValidatorDirective,
		CheckPhoneValidatorDirective,
		JalaButtonInlineIconDirective,
		BreadcrumbComponent,
		CardListSummaryComponent,
		SmoothHeightDirective,
		FormFieldGreenComponent,
		FormFieldInputGreenDirective,
		ExpansionPanelComponent,
		ButtonToggleGroupComponent,
		ButtonToggleComponent,
		BarStackedChartComponent,
		LineChartComponent,
		BarChartComponent,
		ImageUploadComponent,
		LoaderSpinnerComponent,
		CopyClipboardDirective,
		TruncatePipe,
		TruncateWordPipe,
		NumberShortPipe,
		StartCasePipe,
		PermissionDirective,
		DateFormatDistancePipe,
		DialogConfirmationComponent,
		LoaderSpinnerV2Component,
		LoaderSpinnerDirective,
		IntersectionDirective,
		CurrencyShortPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PortalModule,
		/// Spinner MODULE
		NgxSpinnerModule,
		/// Material
		CdkTableModule,
		CdkStepperModule,
		MatPaginatorModule,
		MatDialogModule,
		MatTooltipModule,
		MatSortModule,
		MatProgressBarModule,
		MatSelectModule,
		// NGX BOOTSTRAP
		BsDatepickerModule.forRoot(),
		// ProgressbarModule.forRoot(),
		// Toastr
		ToastrModule.forRoot(),
		// NG2 Chart.js
		ChartsModule,
		// NG-SELECT
		NgSelectModule,
	],
	exports: [
		CdkStepperModule,
		StepperComponent,
		CheckboxComponent,
		FormFieldComponent,
		FormFieldErrorComponent,
		FormFieldInputDirective,
		JalaButtonDirective,
		JalaButtonIconDirective,
		CheckboxDirective,
		ImageLoaderDirective,
		SelectComponent,
		NgxSpinnerModule,
		FormsModule,
		ReactiveFormsModule,
		CdkTableModule,
		OnlyDigitDirective,
		PortalModule,
		ExpansionPanelComponent,
		ImageUploadComponent,
		LoaderSpinnerComponent,
		JalaButtonInlineIconDirective,
		BreadcrumbComponent,
		CardListSummaryComponent,
		SmoothHeightDirective,
		FormFieldGreenComponent,
		FormFieldInputGreenDirective,
		ToastrModule,
		ButtonToggleGroupComponent,
		ButtonToggleComponent,
		CopyClipboardDirective,
		PermissionDirective,
		LoaderSpinnerV2Component,
		LoaderSpinnerDirective,
		IntersectionDirective,
		// Material
		MatPaginatorModule,
		MatDialogModule,
		MatSortModule,
		MatTooltipModule,
		MatProgressBarModule,
		MatSelectModule,
		// NGX BOOTSTRAP
		BsDatepickerModule,
		// ProgressbarModule,
		// NG2 Chart.js
		ChartsModule,
		BarStackedChartComponent,
		LineChartComponent,
		BarChartComponent,
		// NG-SELECT
		NgSelectModule,
		TruncatePipe,
		TruncateWordPipe,
		NumberShortPipe,
		StartCasePipe,
		DateFormatDistancePipe,
		DialogConfirmationComponent,
		CurrencyShortPipe,
	],
	entryComponents: [ LoaderSpinnerV2Component ],
	providers: [
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { panelClass: 'jala-dialog', hasBackdrop: true } }
	]
} )
export class SharedModule {
}

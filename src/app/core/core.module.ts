import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthenticationStoreService } from './store/authentication/authentication-store.service';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { DashboardProfileService } from './services/dashboard-profile/dashboard-profile.service';
import { UserProfileStoreService } from './store/user-profile/user-profile-store.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { ChangePasswordGuardService } from './guards/change-password-guard.service';
import { DashboardProjectService } from './services/dashboard-project/dashboard-project.service';
import { ApiUploadService } from './services/api-upload.service';
import { LoginGuardService } from './guards/login-guard.service';
import { DashboardReportService } from '@core/services/dashboard-report/dashboard-report.service';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { EmptyTeamGuard } from '@core/guards/empty-team.guard';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { EmptyProjectGuard } from '@core/guards/empty-project.guard';
import { CacheRequestInterceptor } from '@core/interceptors/cache-request.interceptor';
import { CacheRequestService } from '@core/services/cache-request/cache-request.service';
import { StorageModule } from '@ngx-pwa/local-storage';
import { LeadsStoreService } from '@core/store/leads/leads-store.service';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { PermissionGuard } from '@core/guards/permission.guard';
import { PipelineEmptyGuard } from '@core/guards/pipeline-empty.guard';
import { DashboardPipelineService } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { DashboardSupportService } from '@core/services/dashboard-support/dashboard-support.service';
import { CheckPaymentGuard } from "@core/guards/check-payment.guard";
import { CheckProfileGuard } from '@core/guards/check-profile.guard';


@NgModule( {
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		StorageModule.forRoot( {
			IDBNoWrap: true,
		} )
	],
	providers: [
		ApiService,
		AuthenticationService,
		AuthenticationStoreService,
		DashboardProfileService,
		UserProfileStoreService,
		AuthGuardService,
		EmptyTeamGuard,
		EmptyProjectGuard,
		ChangePasswordGuardService,
		DashboardProjectService,
		ApiUploadService,
		LoginGuardService,
		DashboardReportService,
		DashboardSalesTeamService,
		DashboardSalesOfficerService,
		CacheRequestService,
		LeadsStoreService,
		CustomStateService,
		PermissionGuard,
		PipelineEmptyGuard,
		DashboardPipelineService,
		DashboardSupportService,
		CheckProfileGuard,
		CheckPaymentGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpTokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CacheRequestInterceptor,
			multi: true
		},
		/*{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		},*/
	]
} )
export class CoreModule {
}

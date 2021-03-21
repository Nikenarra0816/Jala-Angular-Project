import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IImageData, ImageData} from '@shared/models/image-data.model';
import {ApiService} from '@core/services/api.service';


@Injectable()
export class ApiUploadService {

	constructor(private http: HttpClient, private apiService: ApiService) {
	}

	url = this.apiService.getBareUrl + 'pictures';
	urlFile = this.apiService.getBareUrl + 'upload/docs';

	uploadImage(file: File) {
		const formData = new FormData();
		formData.append(file.name, file);
		return this.http.post(this.url, formData)
			.pipe(
				map((value: IImageData[]) => new ImageData(value[0]))
			);
	}

	uploadMultipleImages(file: File[]) {
		const formData = new FormData();
		file.forEach(val => formData.append(val.name, val));
		return this.http.post(this.url, formData)
			.pipe(
				map((value: IImageData[]) => value.map(val => new ImageData(val)))
			);
	}

	uploadExcel(file: File) {
		const formData = new FormData();
		formData.append(file.name, file);
		return this.http.post(this.urlFile, formData)
			.pipe(
				map((value: IImageData[]) => new ImageData(value[0]))
			);
	}
}

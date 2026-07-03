import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpclientService } from './httpclient.service';
import { environment } from '../../environments/environment';
import { WeatherApiResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpclientService) {}

  /**
   * 取得鄉鎮天氣預報（F-D0047-065）
   * @param limit 回傳的地區筆數上限
   */
  getTownshipForecast(limit = 100): Observable<WeatherApiResponse> {
    const url =
      `${environment.cwaForecastUrl}` +
      `?Authorization=${environment.cwaApiKey}` +
      `&limit=${limit}`;

    return this.http.getApi<WeatherApiResponse>(url);
  }
}

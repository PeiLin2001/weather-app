import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../@APIservice/weather.service';
import { LocationWeather, WeatherElement } from '../../models/weather.model';

const WEATHER_ICON_RULES: { codes: number[]; icon: string }[] = [
  { codes: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41], icon: '/img/Thunderstorm.png' },
  { codes: [1], icon: '/img/clear.png' },
  { codes: [25, 26, 27, 28], icon: '/img/CloudyFog.png' },
  { codes: [2, 3, 4], icon: '/img/partialclear.png' },
  { codes: [5, 6, 7], icon: '/img/cloudy.png' },
  { codes: [24], icon: '/img/fog.png' },
  { codes: [8, 9, 10, 11, 12, 13, 14], icon: '/img/rain.png' },
  { codes: [23, 37, 42], icon: '/img/snow.png' }
];

const DEFAULT_WEATHER_ICON = '/img/default.png';

const WEATHER_ICON_MAP: Record<number, string> = WEATHER_ICON_RULES.reduce(
  (map, rule) => {
    rule.codes.forEach((code) => (map[code] = rule.icon));
    return map;
  },
  {} as Record<number, string>
);

@Component({
  selector: 'app-weather2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather2.component.html',
  styleUrl: './weather2.component.scss'
})
export class Weather2Component implements OnInit {

  allDistricts: LocationWeather[] = [];
  currentWeather: WeatherElement[] = [];

  areaName = '';
  selectedDistrictName = '';
  nowTime = new Date();

  isLoading = true;
  errorMessage: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchForecast();
  }

  private fetchForecast(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.weatherService.getTownshipForecast().subscribe({
      next: (res) => {
        const firstRegion = res.records.Locations[0];
        this.allDistricts = firstRegion?.Location ?? [];

        if (this.allDistricts.length > 0) {
          this.selectDistrict(this.allDistricts[0]);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('取得氣象資料失敗:', err);
        this.errorMessage = '無法取得氣象資料，請稍後再試一次。';
        this.isLoading = false;
      }
    });
  }

  selectDistrict(district: LocationWeather): void {
    this.areaName = district.LocationName;
    this.currentWeather = district.WeatherElement;
    this.selectedDistrictName = district.LocationName;
  }

  getWeatherIcon(code: number): string {
    return WEATHER_ICON_MAP[code] ?? DEFAULT_WEATHER_ICON;
  }
}

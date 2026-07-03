export class Weather {}

export interface WeatherElementValue {
  Temperature?: string;
  RelativeHumidity?: string;
  WindSpeed?: string;
  ProbabilityOfPrecipitation?: string;
  Weather?: string;
  WeatherCode?: string;
}

export interface WeatherTime {
  StartTime?: string;
  EndTime?: string;
  ElementValue: WeatherElementValue[];
}

export interface WeatherElement {
  ElementName: string;
  Time: WeatherTime[];
}

export interface LocationWeather {
  LocationName: string;
  Geocode?: string;
  Latitude?: string;
  Longitude?: string;
  WeatherElement: WeatherElement[];
}

export interface WeatherApiResponse {
  success: string;
  records: {
    Locations: {
      LocationsName: string;
      Location: LocationWeather[];
    }[];
  };
}

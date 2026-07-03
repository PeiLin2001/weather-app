# Weather App｜台灣鄉鎮天氣預報

使用 Angular 串接中央氣象署開放資料平台（CWA OpenData）API，顯示台灣各鄉鎮即時天氣資訊的練習專案。

## 功能

- 依地區切換查看不同鄉鎮的天氣資訊
- 顯示溫度、相對溼度、風速、降雨機率
- 依天氣代碼顯示對應天氣圖示
- 讀取中 / 讀取失敗的狀態提示
- 語意化 HTML 結構

## 技術棧

| 項目 | 使用技術 |
|---|---|
| 框架 | Angular（Standalone Components） |
| 語言 | TypeScript |
| 樣式 | SCSS |
| HTTP | `@angular/common/http`（HttpClient） |
| 資料來源 | [中央氣象署開放資料平台](https://opendata.cwa.gov.tw/)（F-D0047-065 鄉鎮天氣預報） |

## 專案結構

```
weather-app/
├── src/
│   ├── environments/
│   │   ├── environment.ts          # 開發環境變數（API Key、API URL）
│   │   └── environment.prod.ts     # 正式環境變數
│   ├── app/
│   │   ├── @APIservice/
│   │   │   ├── httpclient.service.ts   # 通用 HTTP 封裝
│   │   │   └── weather.service.ts      # 氣象局 API 專用 service
│   │   ├── @components/
│   │   │   └── weather2/
│   │   │       ├── weather2.component.ts
│   │   │       ├── weather2.component.html
│   │   │       └── weather2.component.scss
│   │   ├── models/
│   │   │   └── weather.model.ts    # API 回傳資料的型別定義
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
└── README.md
```

## 開始使用

### 1. 安裝套件

```bash
npm install
```

### 2. 設定 API Key

到 [中央氣象署開放資料平台](https://opendata.cwa.gov.tw/) 註冊並取得授權碼，填入：

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  cwaApiKey: 'YOUR_CWA_API_KEY',
  cwaForecastUrl: 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065'
};
```

### 3. 啟動開發伺服器

```bash
ng serve
```

開啟瀏覽器進入 `http://localhost:4200/`。

## API 說明

呼叫的是氣象署「鄉鎮天氣預報」資料集：

```
GET https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065
    ?Authorization={API_KEY}
    &limit={筆數}
```

回傳的資料結構定義於 [`src/app/models/weather.model.ts`](./src/app/models/weather.model.ts)。

## 開發紀錄 / 重構筆記

這個專案是較早期的作品，之後回頭做了一輪重構，調整項目包含：

- **移除硬編碼的 API Key**，改用 `environment.ts` 管理
- 補上完整型別定義，取代原本大量使用的 `any`
- 新增 `WeatherService`，把 API 呼叫邏輯從 component 中抽離
- 變數與方法命名統一為 camelCase
- 加入讀取中 / 錯誤狀態的畫面回饋
- 天氣圖示判斷邏輯改用規則表（lookup table），取代冗長的 `if/includes`
- 路由補上預設導向與 404 fallback
- 修正 SCSS 錯誤
- HTML 結構語意化

## License

僅供個人學習與作品集展示使用。

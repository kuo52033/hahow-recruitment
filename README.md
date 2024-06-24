Heroes API server
===


## Least version required
```
node v18+
```

## Quick start
```bash
# Clone repository
git clone https://github.com/kuo52033/hahow-recruitment.git

# Install node modules
cd hahow-recruitment
npm install

# Starting server
npm start

# Testing
npm test
```

## Test cases
* Get heroes list

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/v1/heroes
```
**Response** 200
```jsonc
{
  "heroes": [
    {
      "id": "1",
      "name": "Daredevil",
      "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
    },
    {
      "id": "2",
      "name": "Thor",
      "image": "http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg"
    },
    // ...
  ]
}
```
---
* Get heroes list - with authenticated

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET http://localhost:3000/api/v1/heroes
```
**Response** 200
```jsonc
{
  "heroes": [
    {
      "id": "1",
      "name": "Daredevil",
      "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
      "profile": {
        "str": 2,
        "int": 7,
        "agi": 9,
        "luk": 7
      },
    },
    {
      "id": "2",
      "name": "Thor",
      "image": "http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg"
      "profile": {
        "str": 8,
        "int": 2,
        "agi": 5,
        "luk": 9
      },
    },
    // ...
  ]
}
```
---
* Get heroes list - invalid Name or Password

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rockssss" -X GET http://localhost:3000/api/v1/heroes
```
**Response** 401
```jsonc
{
    "type": "AuthenticationError",
    "message": "authenticated error",
    "code": "002"
}
```
---
* Get single hero

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/v1/heroes/3
```
**Response** 200
```jsonc
{
    "id": "3",
    "name": "Iron Man",
    "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg"
}
```
---
* Get single hero - with authenticated

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET http://localhost:3000/api/v1/heroes/3
```
**Response** 200
```jsonc
{
    "id": "3",
    "name": "Iron Man",
    "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg",
    "profile": {
        "str": 6,
        "int": 9,
        "agi": 6,
        "luk": 9
    }
}
```
---
* Get single hero - invalid Name or Password

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocksss" -X GET http://localhost:3000/api/v1/heroes/3
```
**Response** 401
```jsonc
{
    "type": "AuthenticationError",
    "message": "authenticated error",
    "code": "002"
}
```
---
* Get single hero - not found hero

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/v1/heroes/800
```
**Response** 404
```jsonc
{
    "type": "NotFoundError",
    "message": "hero not exists",
    "code": "004"
}
```
---
* Get single hero - invalid payload

**Request**
```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/v1/heroes/hi
```
**Response** 422
```jsonc
{
    "type": "RequestValidationError",
    "message": "invalid request payload",
    "code": "003"
}
```
## 專案架構
```bash
.
├── config # 環境變數
├── src
│   ├── app.js # server 進入點
│   ├── index.js 
│   ├── lib # 三方API或一些共用元件
│   ├── middlewares # server 共用 middleware，ex: 錯誤處理
│   ├── route-handlers # 負責控制流程及回傳
│   ├── route-hooks # hook 為一個陣列，由多個 middleware 組成，處理 request 前後，ex: 身分驗證、表單驗證
│   ├── routes # 定義路由
│   └── service # 主要執行商業邏輯
└── tests # API 測試
```
## 架構邏輯
request → app.js → routes → routes-hooks → route-handlers → service → response

request 進來會先根據 routes 進到相對應的 hooks，執行身分驗證等前置作業，再進到 handlers 根據 isAuth 進到不同的 service，service 呼叫 hahow API，把資料處理完後回傳。
## 三方 library 
* **express**: Node.JS 環境下的 web 後端框架
* **axios**: 用來處理 http 請求，取得外部資源
* **config**: 能夠設置 config 全域變數，依環境做區分
* **fastest-validator**: 一個快速的驗證輸入 library，可以客製化驗證函式
* **on-finished**: 在 http 完成、錯誤後會觸發監聽的 callback
* **jest**: 一個 javascript 的測試框架，確保程式運行邏輯正確
* **supertest**: 可以測試 http request 的工具
* **cross-env**: 跨作業系統時可以搭配設置環境變數使用
* **eslint**: 檢查 javascript 是否符合規範，維持程式碼風格與品質
* **nodemon**: 可以自動重啟 server，方便開發
## 寫註解原則
我會先思考未來幾個月的我或是別人在看這段程式碼時，能不能快速理解在做什麼以及為什麼會這樣寫，如果認知不到的話就會寫註解。有特別要標註的、讓 reviewer 更容易理解的地方也會加上註解。
## 遇到的困難
主要是在架構上思考得比較久，想要讓程式好維護、易讀，API 盡量都用已寫好的模組，將流程組織起來，並讓邏輯縮小可以更容易測試與除錯，service 保持遵守單一職責原則。


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

  

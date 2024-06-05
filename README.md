/api/crud/players
создать игрока в базе, метод POST(Create):
запрос от клиента к серверу:

```json
{
  "fio": "string",
  "username": "string",
  "date": "string",
  "team": "string"
}
```

ответ от сервера клиенту:

```json
{
  "success": true,
  "message": {
    "id": 1,
    "fio": "string",
    "username": "string",
    "date": "string",
    "team": "string"
  }
}
```

/api/crud/players
запросить всех игроков, метод GET(Read):
запрос от клиента к серверу:

```json
{}
```

ответ от сервера клиенту:

```json
{
  "success": true,
  "message": [
    {
      "id": 1,
      "fio": "string",
      "username": "string",
      "date": "string",
      "team": "string"
    },
    {
      "id": 2,
      "fio": "string",
      "username": "string",
      "date": "string",
      "team": "string"
    },
    {
      "id": 3,
      "fio": "string",
      "username": "string",
      "date": "string",
      "team": "string"
    }
  ]
}
```

/api/crud/players/2
запросить конкретного игрока, метод GET(Read) ожидает id игрока:
запрос от клиента к серверу:

```json
{}
```

ответ от сервера клиенту:

```json
{
  "success": true,
  "message": {
    "id": 2,
    "fio": "string",
    "username": "string",
    "date": "string",
    "team": "string"
  }
}
```

/api/crud/players?username=string123
запрос с квери параметрами, метод GET(Read) ожидает любое ключ-значение содержащееся в объекте игрока:
запрос от клиента к серверу:

```json
{}
```

ответ от сервера клиенту:

```json
{
  "success": true,
  "message": {
    "id": 1,
    "fio": "string",
    "username": "string123",
    "date": "string",
    "team": "string"
  }
}
```

/api/crud/players
запросить конкретного игрока, метод GET(Read) ожидает id(в парамс либо в теле) либо какая либо другая пара ключ-значение объекта игрока:
запрос от клиента к серверу:

```json
{
  "username": "string789"
}
```

ответ от сервера клиенту:

```json
{
  "success": true,
  "message": {
    "id": 2,
    "fio": "string",
    "username": "string789",
    "date": "string",
    "team": "string"
  }
}
```

/api/crud/players либо /api/crud/players/1
запросить конкретного игрока, метод PATCH(Update) ожидает id(в парамс либо в теле) игрока:
запрос от клиента к серверу:

```json
{
  "id": 1,
  "fio": "string",
  "username": "string123",
  "date": "string",
  "team": "string"
}
```

ответ от сервера клиенту:

```json
{
  "success": true,
  "message": {
    "id": 1,
    "fio": "string",
    "username": "string123",
    "date": "string",
    "team": "string"
  }
}
```

/api/crud/players либо /api/crud/players/1
запросить конкретного игрока, метод Delete(Delete) ожидает id(в парамс либо в теле) игрока:
запрос от клиента к серверу:

```json
{
  "id": 3
}
```

ответ от сервера клиенту:

```json
{
  "success": true,
  "message": {
    "id": 3,
    "fio": "string",
    "username": "string",
    "date": "string",
    "team": "string"
  }
}
```

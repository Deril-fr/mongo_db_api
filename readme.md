# Utilisation API MongoDB

## Collections

### Create Collection

POST /:database/:collection

**Optionnal body:**

```json
{
  "capped": true,
  "size": 1000000,
  "max": 1000
}
```
> Le body est optionnel, si il n'est pas présent, la collection créera un document vide.

### Get Collection

GET /:database/:collection

### Delete Collection

DELETE /:database/:collection

## Documents

### Create Document

POST /:database/:collection

Body:

```json
{
  "name": "John Doe",
  "age": 42
}
```

### Get Document

GET /:database/:collection/document/:id

### Update Document

PUT /:database/:collection/document/:id

Body:

```json
{
  "name": "John Doe",
  "age": 42
}
```

### Delete Document

DELETE /:database/:collection/document/:id

### Delete document with body (filter)

DELETE /:database/:collection

**Body:** (filter)

```json
{
  "name": "John Doe"
}
```

```json
{
  "name": "John Doe",
  "age": 42
}
```

### Search Documents

GET /:database/:collection/search

**Query params:**

- `query` (string): Query string

### Find Documents

GET /:database/:collection/find

**Body:** (filter)

```json
{
  "name": "John Doe"
}
``` 



# Formato de Paginação

O frontend espera que todas as listas paginadas usem o formato do **Spring Data Pageable**, com resposta no formato `Page<T>`.

## Request (Query Params)

```
GET /resource?page=0&size=20&sort=name,asc
```

| Param | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| page | integer | 0 | Página atual (zero-based) |
| size | integer | 20 | Itens por página |
| sort | string | - | Campo e direção (ex: `name,asc`, `createdAt,desc`) |

## Response

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 120,
  "totalPages": 6,
  "last": false
}
```

### Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| content | array | Lista de itens da página atual |
| page | integer | Página atual (zero-based) |
| size | integer | Itens por página |
| totalElements | integer | Total de elementos |
| totalPages | integer | Total de páginas |
| last | boolean | Se é a última página |

## Notas

- A paginação é **zero-based** (a primeira página é 0)
- O frontend renderiza botões de paginação com base em `totalPages`
- O frontend exibe "Página X de Y" usando `page + 1` e `totalPages`
- Quando `totalPages <= 1`, a paginação não é exibida

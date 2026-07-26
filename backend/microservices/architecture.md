# Arquitetura de Microserviços — Clinly

## Visão Geral

O sistema Clinly é composto por **8 microserviços** independentes, cada um responsável por um domínio específico do negócio.

```
┌─────────────────────────────────────────────────────────────┐
│                        Gateway                               │
│  (Spring Cloud Gateway — Roteamento, Rate Limiting, CORS)   │
└──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────────┘
       │      │      │      │      │      │      │
       ▼      ▼      ▼      ▼      ▼      ▼      ▼
┌─────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
│Auth │ │Pac.│ │Cons.│ │Equi.│ │Prof.│ │Dash│ │Rel.│
└──┬──┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘
   │       │       │       │       │       │       │
   └───────┴───────┴───────┴───────┴───────┴───────┘
                        │
                   ┌────▼────┐
                   │ RabbitMQ │
                   └─────────┘
```

Now let me create the per-service documentation. I'll start with the root-level consolidated docs and then each service.

<｜DSML｜tool_calls>
<｜DSML｜invoke name="write">
<｜DSML｜parameter name="filePath" string="true">C:\Users\lucas\OneDrive - SENAC DF\clinly\backend\microservices\service-map.md
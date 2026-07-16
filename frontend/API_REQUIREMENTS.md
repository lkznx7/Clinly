# Clinly — Requisitos da API Backend

> Gerado a partir da análise do frontend com todas as 23 telas, formulários, tabelas e fluxos de usuário.

---

## 1. Autenticação

### Login
**POST /auth/login**

Finalidade: Autenticar usuário com e-mail/senha.

Requisição:
```
{ email: string, password: string }
```

Resposta:
```
{ accessToken, refreshToken, user: { id, name, email, role } }
```

Autenticação: Pública

---

### Cadastro
**POST /auth/register**

Finalidade: Criar uma nova conta de usuário.

Requisição:
```
{ firstName, lastName, email, password, clinicName? }
```

Resposta:
```
{ userId, emailVerificationRequired: boolean }
```

Autenticação: Pública

---

### Login Social (OAuth)
**POST /auth/oauth/:provider**

Finalidade: Autenticar via Keycloak/Google/GitHub.

Requisição:
```
{ provider: "keycloak" | "google" | "github", code: string, redirectUri: string }
```

Resposta:
```
{ accessToken, refreshToken, user: { id, name, email, role } }
```

Autenticação: Pública

---

### Esqueci Minha Senha
**POST /auth/forgot-password**

Finalidade: Enviar e-mail de redefinição de senha.

Requisição:
```
{ email: string }
```

Resposta:
```
{ message: "Link de redefinição enviado" }
```

Autenticação: Pública

---

### Redefinir Senha
**POST /auth/reset-password**

Finalidade: Redefinir senha com token.

Requisição:
```
{ token: string, newPassword: string }
```

Resposta:
```
{ message: "Senha atualizada" }
```

Autenticação: Pública (com token válido)

---

### Verificar E-mail
**POST /auth/verify-email**

Finalidade: Verificar e-mail com código OTP de 6 dígitos.

Requisição:
```
{ email: string, code: string }
```

Resposta:
```
{ verified: boolean }
```

Autenticação: Pública

---

### Reenviar Verificação
**POST /auth/resend-verification**

Finalidade: Reenviar código de verificação por e-mail.

Requisição:
```
{ email: string }
```

Resposta:
```
{ message: "Código reenviado", expiresIn: 60 }
```

Autenticação: Pública

---

## 2. Usuários (Usuário Atual)

### Obter Perfil
**GET /users/me**

Finalidade: Obter o perfil do usuário atual.

Resposta:
```
{ id, firstName, lastName, email, phone, title, license, bio, avatar, language, dateFormat }
```

Autenticação: Token Bearer

---

### Atualizar Perfil
**PUT /users/me**

Finalidade: Atualizar o perfil do usuário atual.

Requisição:
```
{ firstName?, lastName?, email?, phone?, title?, license?, bio?, language?, dateFormat? }
```

Resposta:
```
{ user }
```

Autenticação: Token Bearer

---

### Enviar Foto de Perfil
**POST /users/me/avatar**

Finalidade: Enviar foto de perfil.

Requisição: `multipart/form-data` com `file`

Resposta:
```
{ avatarUrl: string }
```

Autenticação: Token Bearer

---

### Alterar Senha
**POST /users/me/change-password**

Finalidade: Alterar a senha do usuário atual.

Requisição:
```
{ currentPassword, newPassword }
```

Resposta:
```
{ message: "Senha atualizada" }
```

Autenticação: Token Bearer

---

### Ativar Autenticação em Duas Etapas
**POST /users/me/2fa/enable**

Finalidade: Ativar autenticação em duas etapas.

Requisição:
```
{ method: "authenticator" | "sms", secret?: string, code?: string }
```

Resposta:
```
{ qrCode?: string, backupCodes?: string[] }
```

Autenticação: Token Bearer

---

### Desativar Autenticação em Duas Etapas
**POST /users/me/2fa/disable**

Finalidade: Desativar autenticação em duas etapas.

Requisição:
```
{ code: string }
```

Resposta:
```
{ message: "2FA desativada" }
```

Autenticação: Token Bearer

---

### Obter Sessões Ativas
**GET /users/me/sessions**

Finalidade: Listar sessões de login ativas.

Resposta:
```
{ sessions: [{ id, device, location, lastActive, current }] }
```

Autenticação: Token Bearer

---

### Revogar Sessão
**DELETE /users/me/sessions/:id**

Finalidade: Revogar uma sessão específica.

Resposta:
```
{ message: "Sessão revogada" }
```

Autenticação: Token Bearer

---

### Revogar Todas as Outras Sessões
**DELETE /users/me/sessions**

Finalidade: Revogar todas as sessões exceto a atual.

Resposta:
```
{ message: "Todas as sessões foram revogadas" }
```

Autenticação: Token Bearer

---

## 3. Configurações da Clínica

### Obter Configurações da Clínica
**GET /clinic/settings**

Finalidade: Obter a configuração da clínica.

Resposta:
```
{ name, email, phone, website, address, timezone, currency, language, logo, workingHours: [{ day, start, end, active }] }
```

Autenticação: Token Bearer (admin)

---

### Atualizar Configurações da Clínica
**PUT /clinic/settings**

Finalidade: Atualizar a configuração da clínica.

Requisição:
```
{ name?, email?, phone?, website?, address?, timezone?, currency?, language? }
```

Resposta:
```
{ settings }
```

Autenticação: Token Bearer (admin)

---

### Enviar Logo da Clínica
**POST /clinic/logo**

Finalidade: Enviar o logo da clínica.

Requisição: `multipart/form-data` com `file`

Resposta:
```
{ logoUrl: string }
```

Autenticação: Token Bearer (admin)

---

### Atualizar Horário de Funcionamento
**PUT /clinic/working-hours**

Finalidade: Definir o horário de funcionamento semanal.

Requisição:
```
{ hours: [{ day, start, end, active }] }
```

Resposta:
```
{ hours }
```

Autenticação: Token Bearer (admin)

---

### Excluir Clínica
**DELETE /clinic**

Finalidade: Excluir permanentemente a clínica e todos os dados.

Requisição:
```
{ password: string }
```

Resposta:
```
{ message: "Clínica excluída" }
```

Autenticação: Token Bearer (admin)

---

## 4. Pacientes

### Listar Pacientes
**GET /patients**

Finalidade: Listar pacientes com filtros, pesquisa e paginação.

Parâmetros de consulta:
```
?search=string&status=active|pending|inactive&professional=id&page=1&limit=20
```

Resposta:
```
{ patients: [{ id, initials, name, age, email, phone, condition, status, lastVisit, nextAppt, professional, sessions }], total, page, totalPages }
```

Autenticação: Token Bearer

---

### Obter Detalhes do Paciente
**GET /patients/:id**

Finalidade: Obter o prontuário completo do paciente.

Resposta:
```
{
  id, initials, name, age, email, phone, address, condition, status,
  lastVisit, nextAppt, professional, sessions,
  personalInfo: { dob, gender, emergencyContact, emergencyPhone },
  clinicalSummary: { primaryDiagnosis, icd10Code, treatmentType, treatmentStart, frequency, insurance },
  treatmentProgress: [{ label, value, color }]
}
```

Autenticação: Token Bearer

---

### Cadastrar Paciente
**POST /patients**

Finalidade: Adicionar um novo paciente.

Requisição:
```
{ firstName, lastName, dob, gender, email, phone, address, zip,
  emergencyContact, emergencyPhone, condition, professionalId, notes }
```

Resposta:
```
{ patient: { id, ... } }
```

Autenticação: Token Bearer

---

### Atualizar Paciente
**PUT /patients/:id**

Finalidade: Atualizar as informações do paciente.

Requisição: Campos parciais do cadastro.

Resposta:
```
{ patient }
```

Autenticação: Token Bearer

---

### Excluir Paciente
**DELETE /patients/:id**

Finalidade: Excluir um paciente (soft-delete).

Resposta:
```
{ message: "Paciente excluído" }
```

Autenticação: Token Bearer (admin)

---

### Obter Consultas do Paciente
**GET /patients/:id/appointments**

Finalidade: Listar todas as consultas de um paciente.

Parâmetros de consulta:
```
?page=1&limit=20
```

Resposta:
```
{ appointments: [{ id, date, time, type, duration, professional, status }], total }
```

Autenticação: Token Bearer

---

### Obter Notas Clínicas do Paciente
**GET /patients/:id/notes**

Finalidade: Listar as notas clínicas de um paciente.

Resposta:
```
{ notes: [{ id, author, authorInitials, date, content }] }
```

Autenticação: Token Bearer

---

### Criar Nota Clínica
**POST /patients/:id/notes**

Finalidade: Adicionar uma nota clínica.

Requisição:
```
{ content: string }
```

Resposta:
```
{ note: { id, author, date, content } }
```

Autenticação: Token Bearer

---

### Atualizar Nota Clínica
**PUT /patients/:id/notes/:noteId**

Finalidade: Editar uma nota clínica.

Requisição:
```
{ content: string }
```

Resposta:
```
{ note }
```

Autenticação: Token Bearer (apenas o autor)

---

### Obter Histórico Médico do Paciente
**GET /patients/:id/history**

Finalidade: Obter diagnósticos, medicamentos, alergias e tratamentos anteriores.

Resposta:
```
{ diagnoses: string[], medications: string[], allergies: string[], previousTreatments: string[] }
```

Autenticação: Token Bearer

---

### Exportar Pacientes
**GET /patients/export**

Finalidade: Exportar a lista de pacientes (CSV/PDF).

Parâmetros de consulta:
```
?format=csv|pdf&status=&professional=
```

Resposta: Download de arquivo

Autenticação: Token Bearer

---

## 5. Profissionais

### Listar Profissionais
**GET /professionals**

Finalidade: Listar todos os membros da equipe.

Parâmetros de consulta:
```
?search=string&status=active|inactive
```

Resposta:
```
{
  professionals: [{ id, initials, name, specialty, patients, appointments, rating, status, email, phone, since }],
  stats: { total, active, totalPatients, avgRating }
}
```

Autenticação: Token Bearer

---

### Obter Perfil do Profissional
**GET /professionals/:id**

Finalidade: Obter o perfil completo do profissional.

Resposta:
```
{
  id, initials, name, specialty, patients, appointments, rating, status,
  email, phone, since, bio, specializations: string[],
  workingHours: [{ day, start, end }],
  performance: { weeklyData: [...] }
}
```

Autenticação: Token Bearer

---

### Cadastrar Profissional
**POST /professionals**

Finalidade: Adicionar um novo membro à equipe.

Requisição:
```
{ firstName, lastName, email, phone, specialty, specializations, bio }
```

Resposta:
```
{ professional: { id, ... } }
```

Autenticação: Token Bearer (admin)

---

### Atualizar Profissional
**PUT /professionals/:id**

Finalidade: Atualizar o perfil do profissional.

Requisição: Campos parciais do cadastro.

Resposta:
```
{ professional }
```

Autenticação: Token Bearer (próprio ou admin)

---

### Obter Pacientes do Profissional
**GET /professionals/:id/patients**

Finalidade: Listar os pacientes atribuídos a este profissional.

Resposta:
```
{ patients: [{ id, initials, name, email, condition, sessions, lastVisit, status }] }
```

Autenticação: Token Bearer

---

### Obter Agenda do Profissional
**GET /professionals/:id/schedule**

Finalidade: Obter a disponibilidade semanal e horários agendados.

Parâmetros de consulta:
```
?week=2024-01-22
```

Resposta:
```
{ availability: [{ day, slots: [{ hour, booked }] }] }
```

Autenticação: Token Bearer

---

## 6. Consultas

### Listar Consultas (Calendário)
**GET /appointments**

Finalidade: Obter consultas para renderização do calendário.

Parâmetros de consulta:
```
?view=month|week|day&date=2024-01-22&professional=id
```

Resposta:
```
{
  appointments: [{ id, patientId, patientName, patientInitials, professionalId, professionalName, type, date, time, duration, status, color }],
  stats: { total, completed, scheduled, cancelled }
}
```

Autenticação: Token Bearer

---

### Obter Detalhes da Consulta
**GET /appointments/:id**

Finalidade: Obter os detalhes completos de uma consulta.

Resposta:
```
{
  id, patient: { id, name }, professional: { id, name },
  type, date, time, duration, status,
  notes, reminders: [{ method, status, time }]
}
```

Autenticação: Token Bearer

---

### Agendar Consulta
**POST /appointments**

Finalidade: Agendar uma nova consulta.

Requisição:
```
{
  patientId, professionalId, type, date, time, duration,
  recurrence: "none"|"weekly"|"biweekly"|"monthly",
  notes?, reminders: { email24h: bool, sms2h: bool, therapistSummary: bool }
}
```

Resposta:
```
{ appointment: { id, ... } }
```

Autenticação: Token Bearer

---

### Atualizar Consulta
**PUT /appointments/:id**

Finalidade: Reagendar ou modificar uma consulta.

Requisição:
```
{ date?, time?, duration?, type?, notes? }
```

Resposta:
```
{ appointment }
```

Autenticação: Token Bearer

---

### Cancelar Consulta
**DELETE /appointments/:id**

Finalidade: Cancelar uma consulta.

Requisição:
```
{ reason?: string }
```

Resposta:
```
{ appointment: { status: "cancelled" } }
```

Autenticação: Token Bearer

---

### Obter Agenda do Dia
**GET /appointments/today**

Finalidade: Obter as consultas de hoje para o painel.

Resposta:
```
{ appointments: [...], count, remaining }
```

Autenticação: Token Bearer

---

### Obter Estatísticas Semanais
**GET /appointments/weekly-stats**

Finalidade: Obter o resumo semanal de consultas (concluídas/agendadas/canceladas por dia).

Parâmetros de consulta:
```
?week=2024-01-15
```

Resposta:
```
{ days: [{ day, completed, scheduled, cancelled }], total }
```

Autenticação: Token Bearer

---

## 7. Notificações

### Listar Notificações
**GET /notifications**

Finalidade: Obter as notificações do usuário.

Parâmetros de consulta:
```
?unreadOnly=false&page=1&limit=20
```

Resposta:
```
{ notifications: [{ id, type, title, message, time, read }], unreadCount }
```

Autenticação: Token Bearer

---

### Marcar Notificação como Lida
**PUT /notifications/:id/read**

Finalidade: Marcar uma notificação individual como lida.

Resposta:
```
{ notification: { read: true } }
```

Autenticação: Token Bearer

---

### Marcar Todas como Lidas
**PUT /notifications/read-all**

Finalidade: Marcar todas as notificações como lidas.

Resposta:
```
{ message: "Todas marcadas como lidas" }
```

Autenticação: Token Bearer

---

### Obter Preferências de Notificação
**GET /notifications/preferences**

Finalidade: Obter as configurações de notificação do usuário.

Resposta:
```
{ preferences: [{ category, email, sms, push }] }
```

Autenticação: Token Bearer

---

### Atualizar Preferências de Notificação
**PUT /notifications/preferences**

Finalidade: Atualizar as configurações de notificação.

Requisição:
```
{ preferences: [{ category, email, sms, push }] }
```

Resposta:
```
{ preferences }
```

Autenticação: Token Bearer

---

## 8. Relatórios e Análises

### Obter Estatísticas do Painel
**GET /reports/dashboard**

Finalidade: KPIs para o painel de controle.

Resposta:
```
{
  totalPatients: { value, delta, deltaType },
  todaySessions: { value, remaining, total },
  monthlyRevenue: { value, delta, deltaType },
  avgSatisfaction: { value, delta, deltaType }
}
```

Autenticação: Token Bearer

---

### Obter Relatório de Receita
**GET /reports/revenue**

Finalidade: Dados de receita para gráficos.

Parâmetros de consulta:
```
?period=1mo|3mo|6mo|12mo|YTD
```

Resposta:
```
{ data: [{ month, revenue, appointments }], total, avg, bestMonth, growthRate }
```

Autenticação: Token Bearer

---

### Obter Tipos de Sessão
**GET /reports/session-types**

Finalidade: Distribuição dos tipos de sessão.

Parâmetros de consulta:
```
?period=1mo|3mo|6mo|12mo|YTD
```

Resposta:
```
{ types: [{ name, value, color }] }
```

Autenticação: Token Bearer

---

### Obter Crescimento de Pacientes
**GET /reports/patient-growth**

Finalidade: Crescimento de pacientes ao longo do tempo.

Parâmetros de consulta:
```
?period=1mo|3mo|6mo|12mo|YTD
```

Resposta:
```
{ data: [{ month, new, total }] }
```

Autenticação: Token Bearer

---

### Obter Resumo de Receita
**GET /reports/revenue/summary**

Finalidade: Estatísticas resumidas de receita.

Parâmetros de consulta:
```
?period=6mo
```

Resposta:
```
{ total, monthlyAvg, bestMonth: { month, value }, growthRate }
```

Autenticação: Token Bearer

---

### Exportar Relatório
**GET /reports/export**

Finalidade: Exportar dados do relatório.

Parâmetros de consulta:
```
?type=revenue|sessions|patients&period=6mo&format=csv|pdf
```

Resposta: Download de arquivo

Autenticação: Token Bearer

---

## 9. Global

### Pesquisa Global
**GET /search**

Finalidade: Pesquisar entre pacientes, profissionais e consultas.

Parâmetros de consulta:
```
?q=string
```

Resposta:
```
{
  patients: [{ id, name, condition }],
  professionals: [{ id, name, specialty }],
  appointments: [{ id, patient, date, type }]
}
```

Autenticação: Token Bearer

---

## Resumo

| Domínio | Endpoints | Observações |
|---------|-----------|-------------|
| Autenticação | 7 | Login, cadastro, OAuth, redefinição de senha, verificação de e-mail |
| Usuários | 8 | Perfil, foto, senha, 2FA, sessões |
| Clínica | 5 | Configurações, logo, horários, exclusão |
| Pacientes | 10 | CRUD, notas, histórico, exportação |
| Profissionais | 6 | CRUD, pacientes, agenda |
| Consultas | 8 | CRUD, visualizações do calendário, estatísticas |
| Notificações | 5 | Listagem, leitura, preferências |
| Relatórios | 6 | Painel, receita, crescimento, exportação |
| Global | 1 | Pesquisa |
| **Total** | **56** | |

---

## Recomendações

### Funcionalidades Backend Ausentes
1. **Controle de acesso baseado em funções (RBAC)** — O frontend exibe ações exclusivas de administrador (excluir paciente, excluir clínica), mas não existe um sistema de funções
2. **Registro de auditoria** — A conformidade com LGPD/HIPAA exige rastreamento de quem acessou/modificou dados de pacientes
3. **Serviço de armazenamento de arquivos** — Uploads de foto de perfil, logos da clínica e anexos de documentos precisam de uma camada de armazenamento
4. **Serviço de e-mail** — Códigos de verificação, redefinições de senha e lembretes de consulta precisam de envio de e-mails
5. **Serviço de SMS** — 2FA via SMS, lembretes de consulta
6. **WebSocket/SSE** — Notificações em tempo real (atualmente usa polling)
7. **Indexação de pesquisa** — Pesquisa global entre entidades precisa de um mecanismo de busca

### Sugestões de Organização da API
- Usar **rotas versionadas** (`/api/v1/...`) para garantir compatibilidade futura
- Implementar **paginação baseada em cursor** em vez de offset para conjuntos de dados grandes
- Adicionar **filtragem de campos** (`?fields=id,name,email`) para reduzir o tamanho do payload
- Padronizar **respostas de erro** `{ error: { code, message, details } }`
- Usar **UUIDs** em vez de IDs sequenciais para identificadores de paciente/consulta
- Adicionar cabeçalhos **ETag/If-None-Match** para cache de dados do painel

### Possíveis Endpoints Duplicados
- `GET /reports/dashboard` se sobrepõe aos endpoints individuais de relatórios — considerar composição no lado do cliente
- `GET /appointments` e `GET /patients/:id/appointments` compartilham lógica de filtragem — usar o mesmo serviço
- `GET /professionals/:id/patients` é uma visualização filtrada de `GET /patients?professional=id`

# Calendário

A página `/calendario` tem dois separadores: **Horário** (grelha semanal de aulas) e
**Eventos** (vista mensal que lê eventos do Google Calendar).

## Calendários

São quatro: `ano1`, `ano2`, `ano3` (aulas de cada ano) e `fisuma` (eventos do núcleo).
O nome, ano e cor estão em `src/lib/calendars.ts`; os IDs ficam no `.env.local`.
Um calendário com a variável vazia é ignorado.

## Ligar um calendário

1. Criar o calendário em [calendar.google.com](https://calendar.google.com).
2. Torná-lo público em *Definições e partilha > Permissões de acesso > Tornar disponível ao público*.
3. Copiar o *ID do calendário* (em *Integrar calendário*) e colocá-lo na variável certa do `.env.local`:

```
GOOGLE_CALENDAR_API_KEY=...
GOOGLE_CALENDAR_ID_ANO1=...
GOOGLE_CALENDAR_ID_ANO2=...
GOOGLE_CALENDAR_ID_ANO3=...
GOOGLE_CALENDAR_ID_FISUMA=...
```

A chave da API obtém-se na [Google Cloud Console](https://console.cloud.google.com)
com a *Google Calendar API* ativada. Há um `.env.example` com todas as variáveis.
Os IDs são públicos; só a chave é que é secreta.

## Introduzir eventos

- Tipo de aula: no título, por exemplo `Cálculo III (T)`
- Sala: no campo *Localização*
- Cor: escolhida no próprio evento, aparece igual no site
- Testes e entregas: cor vermelha (Tomato) para ficarem destacados
- Aula semanal: recorrência semanal com data de fim no fim do semestre
- Ano: o evento vai no calendário do ano respetivo

## Estado

A vista **Eventos** já lê do Google. O **Horário** ainda usa dados fixos e falta
ligá-lo aos calendários de ano.

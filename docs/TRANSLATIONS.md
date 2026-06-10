# Translations

The site supports Portuguese (default) and English. Strings live in JSON files, no code changes needed to update a translation.

```
messages/
  pt.json
  en.json
```

## Adding or editing a string

1. Open `messages/pt.json`
2. Find the key you want to edit, or add a new one
3. Do the same in `messages/en.json`

Example:

`messages/pt.json`
```json
{
  "nav.about": "Sobre",
  "nav.events": "Eventos"
}
```

`messages/en.json`
```json
{
  "nav.about": "About",
  "nav.events": "Events"
}
```

If a key is missing from `en.json`, the site will show the Portuguese text instead. This is fine.

## Rules

- Always update `pt.json` first
- Try to update `en.json` at the same time, but it's not required
- Never delete a key from `pt.json` without checking if it's used in the code

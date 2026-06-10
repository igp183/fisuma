# Translations

The site supports Portuguese (default) and English. All UI strings live in JSON files so no code changes are needed to update a translation.

## Files

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

If a key exists in `pt.json` but not in `en.json`, the site will display the Portuguese version for English users, this is intentional and safe.

## Rules

- Always update `pt.json` first since it is the source of truth
- Try to update `en.json` at the same time, but it's not a blocker
- Never delete a key from `pt.json` without checking if it's used in the code
- Keep keys grouped by section and use dot notation (`section.key`)

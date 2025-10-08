# Creavo

Podstawowa konfiguracja aplikacji Creavo z wykorzystaniem React + TypeScript + Vite oraz integracją Firebase (Authentication, Firestore, Storage).

## Wymagania wstępne

- Node.js 18+
- Konto Firebase z utworzonym projektem

## Konfiguracja środowiska

1. Zainstaluj zależności:

   ```bash
   npm install
   ```

2. Skopiuj plik `.env.example` do `.env.local` i uzupełnij danymi z konsoli Firebase:

   ```bash
   cp .env.example .env.local
   ```

3. Uruchom aplikację w trybie build + preview (bez serwera deweloperskiego Vite):

   ```bash
   npm run build
   npm run preview
   ```

   Polecenie `npm run preview` uruchomi aplikację w trybie testowym na porcie 4173.

## Struktura projektu

- `src/contexts` – kontekst uwierzytelniania użytkownika
- `src/hooks` – hooki aplikacyjne (np. `useProjects` do obsługi Firestore)
- `src/lib/firebase.ts` – inicjalizacja Firebase i helpery do auth/storage/firestore
- `src/pages` – widoki odpowiadające zakładkom z dokumentacji (Home, Settings, Project, itd.)
- `src/styles` – globalne style, tematy kolorystyczne i typowanie styled-components

## Środowisko Firebase

Uzupełnij plik `.env.example` wartościami z konsoli Firebase:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Po skonfigurowaniu środowiska możesz zalogować się przez Google, e-mail/hasło lub jako gość. Aplikacja przygotowana jest do przechowywania ustawień i projektów użytkownika.

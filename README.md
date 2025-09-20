# Plan Implementacji

Poniższy dokument opisuje planowaną architekturę i podejście do implementacji aplikacji, zgodnie z wytycznymi zadania rekrutacyjnego.

## 1. Struktura Katalogów

Projekt będzie zorganizowany w sposób modularny i zorientowany na funkcjonalności, aby zapewnić przejrzystość i skalowalność.

## 2. Lista Komponentów

-   **`App` (root)**: Główny komponent aplikacji, zawiera `router-outlet` i nagłówek.
-   **`Header` (shared)**: Nagłówek z nawigacją.
-   **`Loader` (shared)**: Prosty komponent wyświetlający animację ładowania.
-   **`PostList` (feature)**: Wyświetla listę postów, obsługuje filtrowanie (po tekście, użytkowniku, ulubionych).
-   **`PostItem` (feature)**: Reprezentuje pojedynczy element na liście postów.
-   **`PostDetail` (feature)**: Wyświetla szczegóły posta, dane autora i komentarze.
-   **`PostComments` (feature)**: Komponent do wyświetlania listy komentarzy pod postem.
-   **`FavoritePosts` (feature)**: Osobna strona/komponent do wyświetlania tylko ulubionych postów.

## 3. Serwisy

-   **`ApiService` (`core/services`)**: Odpowiedzialny za całą komunikację z zewnętrznym API `jsonplaceholder.typicode.com`. Będzie zawierał metody do pobierania postów, użytkowników i komentarzy.
-   **`PostStoreService` (`core/store`)**: Singleton działający jako prosty "store" dla aplikacji. Będzie zarządzał stanem postów, ulubionych, statusami ładowania i błędów przy użyciu sygnałów (Signals). Zapewni mechanizm cache'owania danych.

## 4. Podejście do Zarządzania Stanem

Zarządzanie stanem zostanie zrealizowane w oparciu o **Angular Signals** oraz prosty **singleton service** (`PostStoreService`), co jest zgodne z nowoczesnymi praktykami i wymaganiami `zoneless change detection`.

-   **Źródło prawdy**: `PostStoreService` będzie jedynym źródłem prawdy dla danych aplikacji (posty, ulubione).
-   **Stan**: Główny stan będzie przechowywany w prywatnym sygnale `signal<State>`.
-   **Selekcja danych**: Publiczne, tylko do odczytu, `computed` sygnały będą udostępniać fragmenty stanu komponentom (np. `posts()`, `loading()`, `error()`).
-   **Aktualizacje**: Komponenty będą wywoływać publiczne metody serwisu (np. `loadPosts()`, `toggleFavorite(postId)`), które będą modyfikować stan za pomocą metody `.update()`.
-   **Reaktywność**: Komponenty, konsumując sygnały ze store'u, będą automatycznie i wydajnie aktualizować widok, gdy stan się zmieni.
-   **Cache**: Serwis będzie implementował prostą logikę cache'owania, aby unikać zbędnych zapytań do API, jeśli dane zostały już pobrane.

---

## Funkcjonalności

### 1. Lista postów
- Pobranie listy z API:
  `https://jsonplaceholder.typicode.com/posts`
- Wyświetlenie listy tytułów i fragmentów treści.

### 2. Szczegóły posta
Po kliknięciu w post załaduj i wyświetl:
- pełną treść posta,
- dane autora (`/users/:id`),
- komentarze (`/posts/:id/comments`).

### 3. Filtrowanie
- **Po treści posta** – filtracja po stronie frontendu.
- **Po użytkowniku** – filtrowanie przez query param:
  `https://jsonplaceholder.typicode.com/posts?userId=1`
- **Tylko ulubione** – filtrowanie postów oznaczonych jako ulubione (stan w singletonie).

### 4. Ulubione
- Możliwość oznaczania posta jako ulubiony (toggle).
- Lista ulubionych przechowywana w singletonie (stan w serwisie).

### 5. Singleton (cache)
Dane postów muszą być przechowywane w singleton service (signal store).
Dzięki temu posty nie są pobierane ponownie przy każdym wejściu.

Ponowne zapytania do API wykonujemy tylko w przypadku:
- zmiany filtrów,
- odświeżenia strony.


## Podsumowanie
Aplikacja powinna:
- pobierać i wyświetlać posty,
- umożliwiać filtrowanie,
- prezentować szczegóły posta,
- obsługiwać ulubione,
- być responsywna i nowoczesna,
- korzystać z najnowszych funkcjonalności Angulara 20.

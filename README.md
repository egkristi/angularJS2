# TV Show Premieres

AngularJS-app som viser TV-premièrer med filtrering, sortering og genre-valg.

## Features

- **Tekstfilter** – fritekst-søk på tvers av titler, episoder og datoer
- **Genre-filter** – dropdown eller klikk på genre-tags for rask filtrering
- **Sortering** – etter luftdato eller rating, stigende/synkende
- **Ratings** – thumbs up/down og prosentvis score med fargekoding
- **Responsivt** – tilpasser seg mobil, nettbrett og desktop
- **Ingen resultater**-melding ved tomme filter

## Tech Stack

- AngularJS 1.8.3
- Bootstrap 3.4.1
- Custom `isGenre` filter
- Inline dependency injection (minification-safe)

## Kjøre

Åpne `public_html/index.html` direkte i en nettleser.

## Prosjektstruktur

```
public_html/
├── index.html                  # Hovedside
├── css/
│   ├── bootstrap.min.css       # Bootstrap 3.4.1
│   └── main.css                # App-spesifikk styling
└── js/
    ├── angular.min.js           # AngularJS 1.8.3
    └── tv-premieres-app/
        ├── app.js               # Modul-definisjon
        └── controllers/
            ├── mainController.js # Hovedcontroller med sample-data
            └── filters.js        # Custom isGenre-filter
```

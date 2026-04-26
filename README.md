# TV Show Premieres

AngularJS-app som viser ekte TV-premièrer fra TVmaze API med filtrering, sortering og genre-valg.

## Features

- **Live data** – henter dagens + 2 neste dagers TV-premierer fra TVmaze API
- **Tekstfilter** – fritekst-søk på tvers av titler, episoder og datoer
- **Genre-filter** – dropdown eller klikk på genre-tags for rask filtrering
- **Sortering** – etter luftdato eller rating, stigende/synkende
- **Ratings** – TVmaze rating med fargekoding (grønn/gul/rød)
- **Responsivt** – tilpasser seg mobil, nettbrett og desktop
- **Loading/error states** – spinner ved lasting, feilmelding ved problemer

## API

Bruker [TVmaze API](https://www.tvmaze.com/api) (gratis, ingen nøkkel, CORS-støtte):
- `GET /schedule?country=US&date=YYYY-MM-DD`

## Tech Stack

- AngularJS 1.8.3
- Bootstrap 3.4.1
- TVmaze REST API
- Custom `isGenre` filter

## Kjøre

Åpne `public_html/index.html` direkte i en nettleser.

## Prosjektstruktur

```
public_html/
├── index.html
├── css/
│   ├── bootstrap.min.css
│   └── main.css
└── js/
    ├── angular.min.js
    └── tv-premieres-app/
        ├── app.js
        └── controllers/
            ├── mainController.js
            └── filters.js
```

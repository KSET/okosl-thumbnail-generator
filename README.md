OKOSL thumbnail generator
=========================
Requirements:
1. `nodejs` - Runtime
2. `yarn` - Package manager

Howto:
1. `yarn install` (Samo potrebno prvi put/nakon promjena paketa)
2. `yarn gen $NUM_PREDAVANJE $OPIS_PREDAVANJA`

Gdje su:
- `$NUM_PREDAVANJE` - Broj predavanja (eg. 1, 01, 01.5, ...)
- `$OPIS_PREDAVANJA` - Opis predavanja, može se predati i html (npr `<br>` za novi red)


Primjer:
```bash
$ yarn gen 1 Uvodno predavanje
```
ili
```bash
$ yarn gen "2" "Rad s datotekama i direktorijima"
```

Output je png u `out` direktorij


Primjer generiranog thumbnaila (za primjer 2):


![Primjer generiranog thumbnaila](https://github.com/KSET/okosl-thumbnail-generator/blob/main/out/example.png?raw=true)

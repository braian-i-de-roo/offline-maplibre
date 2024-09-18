# React Native offline Maplibre vector maps

1. Place your .mbtiles map in your assets folder
2. Edit your style json file to replace `sources.url` value for `___FILE_URL___` and place it in your assets folder
3. If your map style has fonts defined, you'll need to replace `glyphs` value in your style json for `asset://glyphs/{fontstack}/{range}.pbf`, and place your fonts `android/app/src/main/assets/glyphs`

# v2

## Executar (Docker)

```sh
docker build -t campo_minado_v2 .
docker run --rm -it -p "80":"3000" -v "$(pwd)/v2":"/app" -w "/app" campo_minado_v2 sh

yarn install
yarn start
```

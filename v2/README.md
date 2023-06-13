# V2

[Clique aqui](https://nathanreis.github.io/CampoMinado/v2) para ver a versão publicada.

## Amostras

Ao abrir

![Ao abrir](/amostras/v2/AoAbrir.jpeg)

Vitória

![Vitória](/amostras/v2/Vitoria.jpeg)

Derrota

![Derrota](/amostras/v2/Derrota.jpeg)

## Como executar (Docker)

* Rodar os comandos abaixo.

```sh
docker build -t campo_minado_v2 .
docker run --rm -it -p "80":"3000" -v "$(pwd)/v2":"/app" -w "/app" campo_minado_v2 sh

yarn install
yarn start
```

* Acessar pelo navegador `locahost` e aproveitar.

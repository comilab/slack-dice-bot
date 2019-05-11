# slack-dice-bot

slack用ダイスbot

- `roll 2d6` => ``2d6` -> `5[3,2]` -> *5*`
- `roll 2d6 > 7` => ``2d6 > 7` -> `4[3,1] > 7` -> ＊4＊ ... :ng:`
- `choice[apple,banana]` => ``choice[apple,banana]` -> *banana*`
- `gen color` -> ``color` -> `rgb(94,76,243)` -> *#5e4cf3*`
- `gen color[3]` -> ``color[3]` -> `rgb(108,161,14), rgb(203,13,194), rgb(125,202,40)` -> *#6ca10e*, *#cb0dc2*, *#7dca28*`
- `gen name` -> ``name` -> *ハムウミョ*`
- `gen name[3]` -> ``name[3]` -> *ゾケボ*`
- `D66` -> ``D66` -> `[5,2]` -> *25*`

## 使い方
### インストール

```sh
$ npm install
$ node index.js
```

http://localhost:8006/ でサーバが立ち上がるので、Slackのwebhook outgoingの設定を合わせる

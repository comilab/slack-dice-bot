# slack-dice-bot

slack用ダイスbot

| コマンド | レスポンス例 |
| ---- | ---- |
| `2d6` | `2d6` -> `5[3,2]` -> *5* |
| `2d6 > 7` | `2d6 > 7` -> `4[3,1] > 7` -> *4* ... :ng: |
| `choice[apple,banana]` | `choice[apple,banana]` -> *banana* |
| `color` | `color` -> `rgb(94,76,243)` -> *#5e4cf3* |
| `color[3]` | `color[3]` -> `rgb(108,161,14), rgb(203,13,194), rgb(125,202,40)` -> *#6ca10e*, *#cb0dc2*, *#7dca28* |
| `name` | `name` -> *ハムウミョ* |
| `name[3]` | `name[3]` -> *ゾケボ* |
| `name[2,4]` | `name[2,4]` -> *ゾズボザ* |
| `D66` | `D66` -> `[5,2]` -> *25* |

## 使い方
### インストール

```sh
$ yarn install
$ node index.js
```

http://localhost:8006/ でサーバが立ち上がるので、nginxあたりと連携してアクセスできるようにし、Slackのwebhook outgoingの設定を合わせる
※引き金となる言葉は適当に設定してください

# NewBite

## 日本語

NewBite のローカル開発用サンプルです。React の画面から Go API の接続状態を確認できます。

1. プロジェクトのルートから VS Code で `NewBite Backend` を選び、F5 で起動します。PowerShell では `cd backend` の後に `go run .` でも起動できます。
2. 別の PowerShell をプロジェクトのルートで開き、`cd frontend`、`npm.cmd ci`（初回）、`npm.cmd run dev` を実行します。
3. [http://localhost:5173/](http://localhost:5173/) を開き、「バックエンドの接続を確認」を押すと、`service` に `newbite-api`、`status` に `ok` が表示されます。Go を停止して再度押すとエラーが表示されます。Go を再起動してから、もう一度確認できます。

[Go の API](http://127.0.0.1:8080/api/health) と [Vite 経由の API](http://localhost:5173/api/health) は同じ JSON を返します。`/api` のプロキシは Vite の開発サーバーで利用できます。

## English

This local development sample checks the Go API connection from a React page.

1. Open the project root in VS Code, select `NewBite Backend`, and press F5. In PowerShell, you can also run `cd backend` followed by `go run .`.
2. Open another PowerShell terminal at the project root. Run `cd frontend`, `npm.cmd ci` (first run), and `npm.cmd run dev`.
3. Open [http://localhost:5173/](http://localhost:5173/) and click “バックエンドの接続を確認”. The page should show `newbite-api` for `service` and `ok` for `status`. Stop Go and click again to see the error. Restart Go and click again to verify recovery.

The [direct Go endpoint](http://127.0.0.1:8080/api/health) and the [Vite endpoint](http://localhost:5173/api/health) return the same JSON. The `/api` proxy is available on the Vite development server.

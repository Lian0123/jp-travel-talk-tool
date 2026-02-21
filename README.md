# jp-travel-talk-tool

## 功能優化（2026）

- 更自然的日語語音：預設使用瀏覽器 `ja-JP` 聲音，並支援切換到自訂雲端 TTS API。
- UI/UX 改善：卡片 hover 視覺回饋、播放/停止切換按鈕、更直覺的搜尋輸入。
- 響應與效能：清單搜尋改為延遲值篩選，降低大量卡片時的卡頓。
- PWA 支援：已加入 `manifest.webmanifest`、`sw.js`、App-like 安裝 meta。

## PWA 注意事項

- `manifest.webmanifest` 與 `sw.js` 位於專案根目錄。
- `index.html` 已連結 manifest，並加入 iOS/Android 安裝相關 meta。
- 請使用 HTTPS 網域（或 localhost）啟動，才能正確觸發安裝與 service worker。

## 靜態資源路徑規範（圖片/字典）

- 本專案已統一使用相對路徑（例如 `public/images/page_menu.png`、`public/kuromoji`），避免根目錄路徑在不同環境失效。
- 相對路徑是以目前頁面 `index.html` 位置為基準，不是以 TSX 檔案位置為基準。
- 請確保引用名稱（含副檔名與大小寫）與實體檔案一致。
- 若檔案被移動或更名，請同步更新程式中的引用路徑。

## file:// 與開發建議

- 透過 `file://` 直接開啟時，圖片與 `public/*` 靜態檔案可用相對路徑載入。
- `service worker` 在 `file://` 不會註冊（瀏覽器安全限制），這是預期行為。
- 若要完整驗證 PWA/快取流程，請使用本地伺服器（例如 `npx serve .`）或 `localhost`。

## DevTools 檢查建議

- 在瀏覽器 DevTools 的 Network 分頁，確認 `public/images/*` 與 `public/kuromoji/*` 回應狀態為 `200`。
- 出現 `404` 時，優先檢查：路徑是否正確、檔名/副檔名是否一致、檔案是否被移動。
- 在 Application 分頁檢查 Manifest / Service Workers（僅限 `localhost` 或 HTTPS）。

## 日語語音模式

可於「About」視窗設定：

- `Browser Speech`：直接使用瀏覽器語音合成（免設定）。
- `Cloud / Custom API`：填入 TTS API 端點（例如你自行封裝 Google TTS / Amazon Polly / VOICEVOX）。

當選擇雲端模式時，前端會送出：

```json
{
	"text": "こんにちは",
	"lang": "ja-JP"
}
```

預期回傳為可播放音訊（如 `audio/mpeg` blob）。
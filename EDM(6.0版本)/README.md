# 《幻塔》6.0版本福利快訊 EDM

《幻塔》(Tower of Fantasy, HT) 6.0 版本福利宣傳電子郵件（EDM），通知既有玩家本次版本的限定自選箱福利內容，並導流至官網與遊戲下載頁。

- 郵件主旨：《幻塔》6.0福利快訊

## 遊戲背景

輕科幻開放世界手遊《幻塔》，身為「拓荒者」的你，失去記憶在「艾達星」醒來。原能因意外輻射瀰漫星球，文明瀕臨毀滅，理念不同的「艾達之子」與「海嘉德」不斷對立，艾達星最終的命運如何，等待玩家自行揭曉。

## 信件內容

- **主圖（edm_01.png）**：《幻塔》6.0福利快訊視覺。
- **CTA 按鈕（edm_02.png）**：連結至官網 `https://www.hotta.com.tw/`。
- **CTA 按鈕（edm_03.png）**：連結至下載導流頁 `https://hotta.pse.is/EDM1125`。
- **福利說明圖（edm_04.png）**。
- **文字說明段 1**：永生赤核自選箱 II 全系限定範圍－莎樂迪、萊可西絲、南斗、艾斯特、阿格蕾婭、海倫、拉娜、奈美西斯．裂空。
- **福利說明圖（edm_06.png）**。
- **文字說明段 2**：限定 SSR 自選箱範圍－阿斯拉達、灰狐、克勞迪婭．風暴眼、梅麗爾．鎧（詳細可兌換範圍請以遊戲內為準）。
- **結尾視覺（edm_008.png）**。
- **Footer**：社群連結圖示（Facebook／YouTube／Discord）、服務條款／隱私權政策連結，以及艾玩天地版權宣告。

images 資料夾另保留 edm_05.png、edm_07.png 兩張素材，目前此版 `index.html` 尚未使用到。

## 技術規格 / RWD

- 純 HTML Email（table-based 版面 + inline style），相容 Outlook（MSO 條件註解）、Gmail、Apple Mail 等主流信箱客戶端。
- 正式寄送時圖片改走 CDN：`https://images1.iwplay.com.tw/image/ht/edm/20260519/images/`，本地 `images` 資料夾為對應素材備份。
- `email-container` 最大寬度固定 600px；針對螢幕寬度 680px 以下設有 media query，將雙欄排版改為單欄（`stack-column`）並調整區塊留白（`sm-p` 系列 class）。

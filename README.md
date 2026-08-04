# Kathy Leung Dashboard Hub

## 專案概述
為 Kathy Leung (梁凱菱) CFA 建立統一的儀表板應用程式，整合所有工作及個人專案的金融工具。

## 🌟 特色功能

### 1. 分類管理
- **工作類儀表板**：投資組合最佳化、每日市場情報、ELN 定價工具
- **個人類儀表板**：量化投資組合、YouTube 內容創作、交易記錄管理
- **智能篩選**：頂部導航可快速切換全部/工作/個人儀表板

### 2. 專業品牌設計
- **品牌色調**：恒生銀行綠色 (#007A3D) 為主色專業藍色輔助
- **個人標識**：定制化 "K" 字 logo，反映專業形象
- **統一風格**：所有儀表板採用一致的設計語言

### 3. 響應式設計
- **完美適配**：桌面、平板、手機等所有裝置
- **流暢互動**：卡片懸浮效果、平滑過渡動畫
- **無障礙設計**：符合現代網頁標準

## 📁 專案結構

```
kathy-dashboard-app/
├── index.html              # 主要入口頁面
├── assets/
│   ├── logo.png            # 個人標識
│   ├── branding/           # 品牌設計資源
│   └── icons/              # 專業圖標
├── dashboards/
│   ├── work/               # 工作類儀表板連結
│   │   ├── portfolio-optimizer/
│   │   ├── daily-brief/
│   │   └── eln-dashboard/
│   └── personal/           # 個人類儀表板連結
│       ├── quant_model/
│       ├── youtube-studio/
│       └── trading-log/
└── README.md               # 這個文件
```

## 🚀 部署指南

### 1. GitHub Pages 部署
```bash
cd /Users/leungkathy/kathy-dashboard-app
# 初始化 Git (如果還未做)
git init
git add .
git commit -m "Initial commit: Kathy Dashboard Hub"
git branch -M main
git remote add origin https://github.com/leunghlk/kathy-dashboard-app.git
git push -u origin main
```

### 2. 設置 GitHub Pages
1. 前往 GitHub 倉庫設置
2. 找到 "Pages" 選項
3. Source 選擇 "Deploy from a branch"
4. Branch 選擇 "main"
5. Folder 選擇 "/ (root)"
6. 點擊 "Save"

### 3. 自定義域名 (可選)
- 在 GitHub Pages 設置中添加自定義域名
- 記得配置 DNS 記錄

## 🎨 設計系統

### 顏色規範
```css
/* 主品牌色 */
--primary: #007A3D;       /* 恒生銀行綠色 */
--primary-dark: #005b3f;
--primary-light: #e6f2ec;

/* 輔助色 */
--secondary: #2E86AB;     /* 專業藍色 */
--secondary-light: #e3f2fd;

/* 警示色 */
--accent: #d97706;         /* 警示橙色 */
--accent-light: #fef3c7;

/* 中性色 */
--bg: #f8fafc;
--surface: #ffffff;
--text: #1e293b;
--text-dim: #64748b;
```

### 字體系統
```css
font-family: -apple-system, BlinkMacSystemFont, "PingFang HK", "Microsoft JhengHei", "Helvetica Neue", sans-serif;
```

### 互動規範
- 卡片懸浮：transform: translateY(-2px)
- 過渡動畫：transition: all 0.2s
- 點擊反饋：cursor: pointer

## 🔧 維護說明

### 添加新儀表板
1. 在 `index.html` 中添加新的卡片元素
2. 選擇正確的分類 (work/personal)
3. 設置適當的圖標和標籤
4. 添加對應的連結

### 更新現有儀表板
- 所有現有儀表板保持獨立運作
- 只需更新連結即可
- 保持設計一致性

### 自定義品牌元素
- Logo 替換：更新 `assets/logo.png`
- 顏色調整：修改 CSS 變量
- 字體變更：更新字體族

## 📱 響應式規格

| 裝置類型 | 介面特點 |
|---------|---------|
| 桌面 (> 1024px) | 3-4 欄網格布局 |
| 平板 (768-1024px) | 2-3 欄網格布局 |
| 手機 (< 768px) | 單欄垂直布局 |

## 🔒 安全注意事項

- 所有連結使用 HTTPS
- 定期檢查連結有效性
- 保持依賴項目更新
- 遵循 GitHub Pages 安全最佳實踐

## 📞 技術支持

如有技術問題或功能建議，請：
1. 檢查 GitHub Issues
2. 創建新的 Issue
3. 提供詳細的錯誤訊息

---

**最後更新**: 2026-08-04  
**版本**: v1.0.0  
**開發者**: Kathy Leung 梁凱菱 | CFA
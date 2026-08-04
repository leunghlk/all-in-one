# Kathy Dashboard Hub 部署指南

## 🌐 網站預覽

您的統一儀表板應用程式已準備就緒！主要特色：

### 🎨 設計特色
- **專業品牌設計**：採用恒生銀行綠色 (#007A3D) 為主色
- **個人標識**：定制化 "K" 字 logo
- **響應式設計**：完美適配所有裝置
- **分類管理**：工作/個人儀表板分類顯示

### 📊 整合的儀表板
1. **工作類**：
   - 📈 投資組合最佳化儀表板 (CFA 框架)
   - 📊 每日市場情報 (Bloomberg 整合)
   - 💎 ELN 定價工具

2. **個人類**：
   - 🎯 量化投資組合 (ADBE + DDOG)
   - 🎬 YouTube 內容創作工作室
   - 📋 交易記錄管理系統

## 🚀 部署步驟

### 方法一：GitHub Pages (推薦)

1. **創建 GitHub 倉庫**
   ```bash
   # 上傳代碼到 GitHub
   git remote add origin https://github.com/您的用戶名/kathy-dashboard-app.git
   git push -u origin main
   ```

2. **設置 GitHub Pages**
   - 前往您的 GitHub 倉庫
   - 點擊 "Settings" → "Pages"
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 "main"，目錄選擇 "/ (root)"
   - 點擊 "Save"

3. **獲取網址**
   - 部署完成後，網址將顯示在 Pages 設置頁面
   - 格式：`https://您的用戶名.github.io/kathy-dashboard-app`

### 方法二：本地預覽

```bash
# 直接在瀏覽器中打開
open /Users/leungkathy/kathy-dashboard-app/index.html
```

## 🔧 自定義設置

### 1. 品牌自定義
- **Logo 替換**：將新 logo 放在 `assets/logo.png`
- **顏色調整**：在 `index.html` 中修改 CSS 變量
- **字體更改**：更新字體族設置

### 2. 添加新儀表板
```html
<!-- 複製此模板 -->
<div class="dashboard-card work" data-category="work">
  <div class="card-icon work">🔧</div>
  <h3 class="card-title">新儀表板名稱</h3>
  <p class="card-subtitle">英文副標題</p>
  <div class="card-tags">
    <span class="tag primary">標籤1</span>
    <span class="tag secondary">標籤2</span>
  </div>
  <a href="/儀表板路徑" class="card-action">
    打開儀表板 <span class="arrow">→</span>
  </a>
</div>
```

### 3. 更新連結
- 確保所有連結指向正確的儀表板目錄
- 使用絕對路徑或相對路徑

## 📱 響應式設計

| 裝置 | 布局特點 |
|------|---------|
| 桌面 | 3-4 欄網格，完整功能 |
| 平板 | 2-3 欄網格，優化觸控 |
| 手機 | 單欄垂直，簡化導航 |

## 🔒 安全注意事項

- 使用 HTTPS 連結
- 定期檢查外部連結有效性
- 保持 GitHub 倉庫更新
- 遵循 GitHub Pages 安全最佳實踐

## 📞 技術支援

### 常見問題

**Q: 如何添加新的儀表板？**
A: 按照 `index.html` 中的模板添加新的卡片元素，確保設置正確的分類和連結。

**Q: 如何更改品牌顏色？**
A: 在 `index.html` 的 `<style>` 標籤中修改 CSS 變量。

**Q: 如何自定義域名？**
A: 在 GitHub Pages 設置中添加自定義域名，並配置 DNS 記錄。

### 技術規格
- **前端技術**：原生 HTML/CSS/JavaScript
- **部署平台**：GitHub Pages
- **響應式框架**：CSS Grid + Flexbox
- **兼容性**：現代瀏覽器 (Chrome 80+, Safari 13+, Firefox 75+)

---

**開發者**: Kathy Leung 梁凱菱 | CFA  
**最後更新**: 2026-08-04  
**版本**: v1.0.0
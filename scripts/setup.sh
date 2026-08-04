#!/bin/bash

# Kathy Dashboard Hub - Development Setup Script
# 此腳本設置開發環境並準備部署

echo "🚀 設置 Kathy Dashboard Hub 開發環境..."

# 檢查 Node.js 是否安裝
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安裝，請先安裝 Node.js 18+"
    exit 1
fi

# 檢查 npm 是否安裝
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安裝，請先安裝 npm"
    exit 1
fi

# 安裝全域依賴（如果需要）
echo "📦 檢查全域依賴..."

# 創建必要的目錄結構
echo "📁 創建專案目錄結構..."
mkdir -p assets/branding
mkdir -p assets/icons
mkdir -p dashboards/work
mkdir -p dashboards/personal

# 下載品牌資源（如果需要）
echo "🎨 下載品牌資源..."
if [ ! -f "assets/logo.png" ]; then
    echo "ℹ️  Logo 可在 assets/logo.png 中替換"
fi

# 設置權限
echo "🔐 設置文件權限..."
chmod +x scripts/deploy.sh 2>/dev/null || true

# 檢查 Git 配置
echo "📝 檢查 Git 配置..."
git config user.name > /dev/null 2>&1 || echo "⚠️  請設置 git config user.name"
git config user.email > /dev/null 2>&1 || echo "⚠️  請設置 git config user.email"

echo "✅ 開發環境設置完成！"
echo ""
echo "📋 後續步驟："
echo "1. 添加遠程倉庫: git remote add origin <your-github-repo-url>"
echo "2. 推送到 GitHub: git push -u origin main"
echo "3. 在 GitHub 倉庫設置 Pages 部署"
echo "4. 配置自定義域名（可選）"
echo ""
echo "🎯 部署後的網址: https://<username>.github.io/kathy-dashboard-app"
@echo off
cd /d %~dp0

echo === 删除 node_modules 和 .next 目录 ===
if exist node_modules (
    rmdir /s /q node_modules
)
if exist .next (
    rmdir /s /q .next
)

echo === 删除 lock 文件 ===
del /s /q *.lock >nul 2>&1

echo === 创建 .gitignore 文件（如不存在）===
echo node_modules> .gitignore
echo .next>> .gitignore
echo .env.local>> .gitignore
echo .DS_Store>> .gitignore
echo .vscode>> .gitignore

echo === Git 初始化并推送 ===
git init
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ivyhuqing/panel-a.git
git add .
git commit -m "clean: remove large files and push clean repo"
git branch -M main
git push -f origin main

echo === 完成！请回到 Vercel 部署 panel-a 项目 ===
pause

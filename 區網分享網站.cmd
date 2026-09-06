@echo off
cd /d "%~dp0"
title 廣島五日四夜獨旅 - 區網分享
echo.
echo  網站將在本機 8766 連接埠啟動。
echo  同 Wi-Fi 的朋友請輸入：http://你的電腦IP:8766/
echo  可用 ipconfig 查看「IPv4 位址」。分享完按 Ctrl+C 關閉。
echo  安全提醒：只在私人可信任 Wi-Fi 使用；公共網路請勿啟動。
echo.
set "TRIP_PYTHON=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%TRIP_PYTHON%" (
  "%TRIP_PYTHON%" -m http.server 8766 --bind 0.0.0.0
) else (
  echo  找不到本機網站服務程式，請回到 Codex 請我協助開啟。
)
pause

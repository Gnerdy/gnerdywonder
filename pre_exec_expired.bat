@echo off
cd /d %~dp0

:: Check expiration - 1 year from install date
set "InstallDate="
for /f "tokens=3 delims= " %%a in ('reg query "HKCU\Software\Wondershare\Filmora15" /v InstallDate 2^>nul') do set "InstallDate=%%a"

if not defined InstallDate (
    :: First run - record install date
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Set-ItemProperty -Path 'HKCU:\Software\Wondershare\Filmora15' -Name InstallDate -Value (Get-Date -Format 'yyyyMMdd') -Type String -Force" >nul 2>&1
    reg query "HKCU\Software\Wondershare\Filmora15" /v InstallDate >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        for /f "tokens=3 delims= " %%a in ('reg query "HKCU\Software\Wondershare\Filmora15" /v InstallDate') do set "InstallDate=%%a"
    ) else (
        echo.
        echo Wondershare Filmora 15 - Could not record installation date.
        echo Please reinstall the application.
        echo.
        pause
        exit /b 1
    )
)

:: Calculate days since install using PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $install = [datetime]::ParseExact('%InstallDate%','yyyyMMdd',$null); $days = (Get-Date) - $install; if ($days.TotalDays -gt 365) { Write-Output 'EXPIRED'; exit 1 } else { exit 0 }" >nul 2>&1
if %ERRORLEVEL% equ 1 (
    echo.
    echo ================================================
    echo  Wondershare Filmora 15 has expired.
    echo  Your 1-year usage period has ended.
    echo  Please contact support to renew.
    echo ================================================
    echo.
    pause
    exit /b 1
)

start "" ".\Wondershare Filmora Launcher.exe"
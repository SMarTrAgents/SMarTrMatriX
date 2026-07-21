# Installs matrix.scr as the active Windows screensaver for the current user.
# Run from PowerShell in this folder: .\install-screensaver.ps1
# No admin rights required — this only touches HKCU, not System32.

param(
    [string]$ScreensaverPath = "$PSScriptRoot\matrix.scr",
    [int]$TimeoutSeconds = 600
)

if (-not (Test-Path $ScreensaverPath)) {
    Write-Error "matrix.scr nicht gefunden unter: $ScreensaverPath"
    exit 1
}

$resolvedPath = (Resolve-Path $ScreensaverPath).Path

Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name "SCRNSAVE.EXE" -Value $resolvedPath
Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name "ScreenSaveActive" -Value "1"
Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name "ScreenSaveTimeOut" -Value "$TimeoutSeconds"

Write-Host "smartragents.ai Matrix ist jetzt als Bildschirmschoner aktiv (Timeout: $TimeoutSeconds s)."
Write-Host "Pruefen/aendern: Einstellungen > Personalisierung > Sperrbildschirm > Bildschirmschoner-Einstellungen"

@echo off
REM PrimeDesk Android debug APK build (Windows, no admin needed).
REM Uses the user-local toolchain in %USERPROFILE%\primedesk-android (JDK 17 + SDK).
REM Run from the repo root:  build-apk.bat
setlocal
set "JAVA_HOME=%USERPROFILE%\primedesk-android\java\jdk-17.0.20.1+1"
set "ANDROID_SDK_ROOT=%USERPROFILE%\primedesk-android\sdk"
set "ANDROID_HOME=%USERPROFILE%\primedesk-android\sdk"
cd /d "%~dp0web\android" || exit /b 1
if not exist local.properties (
  >local.properties echo ## Auto-generated. Do not commit.
  >>local.properties echo sdk.dir=%ANDROID_SDK_ROOT:\=\\%
)
call gradlew.bat assembleDebug --console=plain || exit /b 1
if not exist "%USERPROFILE%\primedesk-android\output" mkdir "%USERPROFILE%\primedesk-android\output"
copy /y "app\build\outputs\apk\debug\app-debug.apk" "%USERPROFILE%\primedesk-android\output\PrimeDesk-debug-v1.0.apk" || exit /b 1
call "%ANDROID_SDK_ROOT%\build-tools\34.0.0\apksigner.bat" verify --print-certs "%USERPROFILE%\primedesk-android\output\PrimeDesk-debug-v1.0.apk" || exit /b 1
echo.
echo DONE: %USERPROFILE%\primedesk-android\output\PrimeDesk-debug-v1.0.apk

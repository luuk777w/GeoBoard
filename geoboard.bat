@echo off
set arg1=%1
set arg2=%2

IF NOT DEFINED arg1 (
	echo Please enter a command or type help
	goto :eof
) ELSE (

	IF [%arg1%] == [create] (
		call :create
		goto :eof
	) ELSE IF [%arg1%] == [help] (
		call :help
		goto :eof
	) ELSE (
		echo Command not found
		goto :eof
	)
)

:create

IF NOT DEFINED arg2 (
	echo Please enter a name
) ELSE (
	IF EXIST src\pages\%arg2% (
		echo This page already exists
	) ELSE (
		mkdir src\pages\%arg2%

		(
			echo class %arg2% extends Page {
			echo:
			echo     constructor^(^) ^{
			echo         super^(^);
			echo         console.log^("%arg2%"^);
			echo         this.template.setLayout^("base_layout"^);
			echo         this.template.loadHtml^("%arg2%"^);
			echo     ^}
			echo ^}
		) > src\pages\%arg2%\%arg2%.ts

		(
			echo ^<div class^="container"^>
			echo     ^<h1^>%arg2%!^</h1^>
			echo ^</div^>
		) > src\pages\%arg2%\%arg2%.hbs

		echo: > src\pages\%arg2%\%arg2%.scss

		echo Created %arg2%
	)
)

goto :eof

:help

echo Help
echo:
echo Current commands:
echo create ^[NAME^]

goto :eof

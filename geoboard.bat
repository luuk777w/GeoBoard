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
	IF EXIST pages\%arg2% (
		echo This page already exists
	) ELSE (
		mkdir pages\%arg2%
		
		(
			echo App.%arg2% = ^(function ^(^) ^{
			echo:
			echo 	// init
			echo     const _init = function ^(^) ^{
			echo         console.log^("%arg2%"^);
			echo         App.Template.setLayout^("base_layout"^);
			echo         App.Template.loadhtml^("%arg2%"^);
			echo     ^}
			echo:
			echo     return ^{
			echo         init: _init
			echo     ^}
			echo ^}^)^(^);
		) > pages\%arg2%\%arg2%.js
		
		(
			echo ^<div class^="container"^>
			echo     ^<h1^>%arg2%!^</h1^>
			echo ^</div^>
		) > pages\%arg2%\%arg2%.hbs
		
		echo: > pages\%arg2%\%arg2%.scss
		
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
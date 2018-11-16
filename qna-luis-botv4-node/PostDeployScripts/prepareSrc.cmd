rem @echo off
setlocal
SET password=%1
SET repoName=srcRepo
SET repoUrl=file:///%HOMEDRIVE:~0,1%/%HOMEPATH:~1%/site/%repoName%
SET download=bot-src

echo %repoUrl%

rem cd to project root
pushd ..\wwwroot

rem init git
call git init
call git config user.name "botframework"
call git config user.email "util@botframework.com"
call git add .
call git commit -m "prepare to download source"
call git remote add srcRepo %repoUrl%
popd

rem init upstream
pushd %HOME%\site
mkdir srcRepo
cd srcRepo
call git init --bare
popd 

rem push to upstream
pushd ..\wwwroot
call git push --set-upstream srcRepo master
popd

rem clone srcRepo
pushd %HOME%\site
call git clone %repoUrl% %download%
rem delete .git
cd %download%
call rm -r -f .git
popd

rem prepare for publish
type PostDeployScripts\publish.js.template | sed -e s/\{WEB_SITE_NAME\}/%WEBSITE_SITE_NAME%/g | sed -e s/\{PASSWORD\}/%password%/g > %HOME%\site\%download%\publish.js

rem preare the zip file
%HOMEDRIVE%\7zip\7za a %HOME%\site\%download%.zip %HOME%\site\%download%\*

rem cleanup git stuff
pushd ..\wwwroot
call rm -r -f .git
popd

pushd %HOME%\site
call rm -r -f %download%
call rm -r -f %repoName%
popd

endlocal

#=======================================================================#
# Params                                                                
#=======================================================================#

$msdeploy = "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe" #"%env.msdeploy%"
$siteName = "elrondsoft-landing-prod" #"%env.siteName%"
$password = "x3os9qdHXCvJiDLNuzej9MWkhk1Wq3jAEyu47YPYBZQGmRCQd2j3305vZwiR" #"%env.password%"

$appFolder = "C:\Data\Sources\elrondsoft\src\landing-angular" #"%teamcity.build.workingDir%\src_dealer
$publishFolder = "$appFolder\dist\elrondsoft-landing"

#=======================================================================#
# Build                                                                 
#=======================================================================#

Set-Location $appFolder
npm install
npm run build:prod

#=======================================================================#
# Build Counter                                                         
#=======================================================================#

$indexHtml = "$appFolder\dist\elrondsoft-landing\index.html" #"%teamcity.build.workingDir%\dist\index.html";
$random = Get-Random #"%build.counter%"
(Get-Content $indexHtml).replace("-build.counter-", $random) | Set-Content $indexHtml

#=======================================================================#
# Deploy								
#=======================================================================#

$userName = "$" + "$siteName"
$wmsvc = "$siteName.scm.azurewebsites.net:443/msdeploy.axd?site=$siteName"
$msdeployArguments = '-verb:sync',
		"-source:contentPath=$publishFolder",
		"-dest:contentPath=$siteName,wmsvc=$wmsvc,userName=$userName,password=$password",
		'-AllowUntrusted'

 & $msdeploy $msdeployArguments;


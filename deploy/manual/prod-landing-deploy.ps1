#=======================================================================#
# Params                                                                
#=======================================================================#

$msdeploy = "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe"
$siteName = "onshop-landing-prod"
$password = "aPlCDprjmZiFLcllkaefTnKQC3ZAH2s8LNbfRSefrC2sbvb4WlsDRQtzkNAa"

$appFolder = (resolve-path ..\..\src\landind)
$publishFolder = "$appFolder\dist\onshop-landing"

#=======================================================================#
# Build                                                                 
#=======================================================================#

Set-Location $appFolder
npm install
npm run build:prod

#=======================================================================#
# Build Counter                                                         
#=======================================================================#

#$indexHtml = "$appFolder\dist\vipdrive-app\index.html"
#(Get-Content $indexHtml).replace("-build.counter-", "go-hard") | Set-Content $indexHtml

#=======================================================================#
# Deploy								
#=======================================================================#

$userName = "$" + "$siteName"
$wmsvc = "$siteName.scm.azurewebsites.net:443/msdeploy.axd?site=$siteName"
$msdeployArguments = '-verb:sync',
		"-source:contentPath=$publishFolder",
		"-skip:objectName=filePath,absolutePath=.*web\.config",
		"-dest:contentPath=$siteName,wmsvc=$wmsvc,userName=$userName,password=$password",
		'-AllowUntrusted'

 & $msdeploy $msdeployArguments;
 
	
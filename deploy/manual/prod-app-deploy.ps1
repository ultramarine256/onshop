#=======================================================================#
# Params                                                                
#=======================================================================#

$msdeploy = "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe"
$siteName = "onshop-app-prod"
$password = "3FjqGdTA2BhaubmMoqnXnWdi2vb5d7HtWkn7fy0Fvjjkd5SGpevBZdFeYLsi"

$appFolder = (resolve-path ..\..\src\app)
$publishFolder = "$appFolder\dist\onshop-app"

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
 

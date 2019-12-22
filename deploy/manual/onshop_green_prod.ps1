#=======================================================================#
# Params                                                                
#=======================================================================#

$msdeploy = "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe"
$siteName = "onshop-green-shop-prod"
$password = "9dXQ775kNvd60isglubbZeFcXXovGkiLFgLoDcY5LMeH1lM5gMZ4do7Sn1Bu"

$publishFolder = (resolve-path ..\..\src\shop\green-shop)

#=======================================================================#
# Build Counter                                                         
#=======================================================================#

# $indexHtml = "$appFolder\dist\elrondsoft-landing\index.html"
# $random = Get-Random
# (Get-Content $indexHtml).replace("-build.counter-", $random) | Set-Content $indexHtml

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

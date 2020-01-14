#=======================================================================#
# Params                                                                
#=======================================================================#

$msdeploy = "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe"
$siteName = "onshop-blue-prod"
$password = "dyTa43lmvqnFD87Qttocw4GCmJSGLn908AL9hjgsix0mfkJehrPElb5s9Dwq"

$publishFolder = (resolve-path ..\..\src\api)

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
		'-skip:Directory="node_modules"',
		'-skip:Directory="uploads"',
		"-dest:contentPath=$siteName,wmsvc=$wmsvc,userName=$userName,password=$password",
		'-AllowUntrusted'

 & $msdeploy $msdeployArguments;
 
 # -skip:Directory="%node_modules%"
 #-skip:objectName=dirPath,absolutePath="sub03" 
 #   -skip:objectName=dirPath,absolutePath="sub02"
 
 #-skip:Directory="App_Data"
 
 #-skip:Directory="%node_modules%"
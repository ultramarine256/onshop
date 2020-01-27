$msdeploy = "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe"

$msdeployArguments =
        '-verb:sync',
		'-source:contentPath=C:\Data\Sources\fork\onshop\src\api',
		'-skip:Directory="node_modules"',
		'-skip:Directory="uploads"',
		"-skip:objectName=filePath,absolutePath=.*web\.config",
		'-dest:contentPath="onshop-app-prod",wmsvc="65.52.198.177:8172/msdeploy.axd?site=onshop-app-prod",userName=vm-win-db-8/toto,password=2Vu6KmSaLdVHtj3g',
		'-AllowUntrusted'

& $msdeploy $msdeployArguments;


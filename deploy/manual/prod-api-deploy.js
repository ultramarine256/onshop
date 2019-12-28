//=======================================================================
// Params                                                                
//=======================================================================

const MSDEPLOY_PATH = 'C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe';

const WEBSITES = [
	{
		siteName: 'onshop-blue-prod',
		password: 'dyTa43lmvqnFD87Qttocw4GCmJSGLn908AL9hjgsix0mfkJehrPElb5s9Dwq'
	},
	{
		siteName: 'onshop-blue-api-prod',
		password: 'KZBqin54RYx342QpiPMH3hZryXztnK6vtezqjp56wAdFk5s4bijc6HDjdRno'
	}
];

//=======================================================================
// Build Counter                                                         
//=======================================================================

// Build counter goes here

//=======================================================================
// Deployment                                                         
//=======================================================================

for (let key in WEBSITES) {
  let value =  WEBSITES[key]; // get the value by key
  
  console.log(value['siteName']);  
}

// console.log('test');

// var msdeploy = require("msdeploy")

// $userName = "$" + "$siteName"
// $wmsvc = "$siteName.scm.azurewebsites.net:443/msdeploy.axd?site=$siteName"
// $msdeployArguments = '-verb:sync',
// 		"-source:contentPath=$publishFolder",
// 		"-dest:contentPath=$siteName,wmsvc=$wmsvc,userName=$userName,password=$password",
// 		'-AllowUntrusted'
// 
//  & $msdeploy $msdeployArguments;

// $siteName.scm.azurewebsites.net:443/msdeploy.axd?site=$siteName

msdeploy -verb:sync -source:contentPath=$publishFolder onshop-blue-prod.scm.azurewebsites.net:443/msdeploy.axd?site=onshop-blue-prod




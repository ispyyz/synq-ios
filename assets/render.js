const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();
for(const [f,sz,out] of [['assets/icon.svg',1024,'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png'],['assets/splash.svg',2732,'assets/splash.png']]){
 const p=await b.newPage({viewport:{width:sz,height:sz}});await p.setContent('<style>html,body{margin:0;background:#0B0B0C}</style>'+fs.readFileSync(f,'utf8'));
 await p.screenshot({path:out,omitBackground:false});await p.close();}
await b.close();})();

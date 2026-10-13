'use strict'
// Standalone, inert hosting probe. Never imports CareScript data, Auth or grant code.
const http=require('node:http')
const marker='CareScript fictional host probe v186\n'
function respond(request,response){
 const health=request.method==='GET'&&request.url==='/healthz'
 response.writeHead(health?200:503,{'Content-Type':'text/plain; charset=utf-8',
  'Cache-Control':'no-store, max-age=0','CDN-Cache-Control':'no-store','Surrogate-Control':'no-store',
  'Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  'Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow',Connection:'close'})
 response.end(health?marker:'Review unavailable\n')
}
function start(){
 if(process.argv.length!==3||process.argv[2]!=='--serve-fictional'||process.versions.node!=='24.21.0')throw Error('Refused')
 const port=process.env.PORT
 if(typeof port!=='string'||!/^[1-9][0-9]{0,4}$/.test(port)||Number(port)>65535)throw Error('Refused')
 const server=http.createServer({maxHeaderSize:8192},respond)
 server.maxConnections=32;server.headersTimeout=5000;server.requestTimeout=10000;server.keepAliveTimeout=1000
 server.on('error',()=>{console.log('FICTIONAL_HOST_PROBE=STOP');server.closeAllConnections();server.close();process.exitCode=1})
 server.listen(Number(port),'0.0.0.0',()=>console.log('FICTIONAL_HOST_PROBE=STARTED_NO_AUTH_OR_CONTENT'))
 for(const event of ['SIGINT','SIGTERM'])process.once(event,()=>{server.closeAllConnections();server.close()})
}
if(require.main===module)try{start()}catch{console.log('FICTIONAL_HOST_PROBE=STOP');process.exitCode=1}
module.exports={respond,marker}

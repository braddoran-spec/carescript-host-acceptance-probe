'use strict'
const fs=require('node:fs'),crypto=require('node:crypto')
const digest=crypto.createHash('sha256').update(fs.readFileSync(require('node:path').join(__dirname,'host-probe.cjs'))).digest('hex')
if(process.versions.node!=='24.21.0'||digest!=='5442342b4a98163f59a6d6aba782ea18da934a6334421cf63f8e20b3daca7878')process.exit(1)
console.log('FICTIONAL_PROBE_BUILD=VERIFIED')

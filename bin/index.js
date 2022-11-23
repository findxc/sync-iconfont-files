#!/usr/bin/env node
const path = require('path')
const AdmZip = require('adm-zip')
const args = require('args')
const axios = require('axios')
const open = require('open')

args
  .option('projectId', 'Check your project page url to get this id')
  .option('directory', 'The directory to place iconfont files', 'iconfont')

const { projectId, directory } = args.parse(process.argv)
const EGG_SESS_ICONFONT = process.env.EGG_SESS_ICONFONT

if (!projectId) {
  console.log('Please add --projectId=xxx to your script')
  return
}
if (!EGG_SESS_ICONFONT) {
  console.log('Please add EGG_SESS_ICONFONT to your environment variables')
  return
}

axios
  .get(`https://www.iconfont.cn/api/project/download.zip?pid=${projectId}`, {
    headers: { cookie: `EGG_SESS_ICONFONT=${EGG_SESS_ICONFONT}` },
    responseType: 'arraybuffer',
  })
  .then(res => {
    const { data } = res
    // if download fails, data is actually object
    // so we use try/catch to handle fail and succeed
    try {
      const dataObj = JSON.parse(data.toString())
      if (dataObj.error_code === 'LOGIN REQUIRED') {
        console.log(
          'Please update the value of EGG_SESS_ICONFONT, it has expired'
        )
      } else {
        console.log(`Please confirm you have access to project ${projectId}`)
      }
    } catch (err) {
      const zip = new AdmZip(data)
      zip.getEntries().forEach(entry => {
        if (!entry.isDirectory) {
          zip.extractEntryTo(entry.entryName, directory, false, true)
        }
      })
      console.log('😊Download iconfont files success')

      const htmlPath = path.resolve(process.cwd(), directory, 'demo_index.html')
      open(htmlPath)
    }
  })

const { google } = require('googleapis')
const { createReadStream } = require('fs')
const { join } = require('path')
require('dotenv').config()

const client = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET
const redirect = process.env.REDIRECT_URI
const refresh = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(client, secret, redirect)
oauth2Client.setCredentials({ refresh_token: refresh })

const drive = google.drive({ version: 'v3', auth: oauth2Client })
const filePath = join(__dirname, 'test.json')

async function uploadFile (filePath) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'testEmerson.json',
        mimeType: 'application/json'
      },
      media: {
        mimeType: 'application/json',
        body: createReadStream(filePath)
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}


uploadFile(filePath)

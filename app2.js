const dotenv = require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const fs1 = require("fs").promises;
const path = require("path");
const Formdata = require("form-data");
const https = require('https')
const apiKey = process.env.API_KEY;
const filepath = path.join(__dirname,"This New CSS Feature Makes Media Queries So Much Easier.mp3" );
const model = "whisper-1";
let x;

const formdata = new Formdata();
formdata.append("model", model);
formdata.append("file", fs.createReadStream(filepath));

axios
    .post("https://api.openai.com/v1/audio/transcriptions", formdata, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`
        }
    })
    .then((Response) => {

        const xxx = Response.data.text;
        const openai = require('openai');
        //console.log(xxx);

const { Configuration, OpenAIApi } = openai;

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openaiApi = new OpenAIApi(configuration);

const generateX = () => {
  return openaiApi.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{
      role: "user", content:
      "I want to make a notes out of this text,\
      first I want a title that describe the content of that text\
      then subtitles that for every part of this text\
      then a bullet notes for these subtitles from the text.\
      So gave me a json file that contain the following:\
      {\
        'mainTitle':'',\
        'subTitles':{\
          'title of the first subtitle':{\
            '1': 'content of first bullet note',\
            '2': 'content of second bullet note'\
            ...\
            'N': 'content of last bullet note'\
          },\
          'title of the second subtitle': {},\
          ...\
          'title of the last subtitle': {}\
        }\
      }\
      Here is the text: "+xxx+" "
    }]
  })
    .then(res => {
        x = res.data.choices[0].message.content;
      return fs1.writeFile('./x.json', JSON.stringify(x));
      
    });
};

generateX()
  .then(() => {
    console.log('File write successful!');
  })
  .catch(err => {
    console.error('Error:', err);
  });
  let Data;

  // fetch('/x.json')
  //         .then((response) => response.json())
  //         .then((D) => {
  //           console.log("Got data from x.json:", D);
  //            Data =JSON.parse(D)

  // });


       const CHUNK_SIZE = 1024;
const url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM";

const headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": "2addd6e681ed5dd171464467c0b0f887"
};

const data = {
  "text": "" ,
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.5
  }
};

const options = {
  method: 'POST',
  headers: headers
};

const req = https.request(url, options, (res) => {
  const file = fs.createWriteStream('output.mp3');
  res.on('data', (chunk) => {
    file.write(chunk);
  });
  res.on('end', () => {
    file.close();
    console.log('File saved successfully.');
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(JSON.stringify(data));
req.end();
    
})




  
 
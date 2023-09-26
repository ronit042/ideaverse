const express = require('express');
const mylogin = require('./login');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Cloud Storage
const gc = new Storage({
  keyFilename: path.join(__dirname, './json.json'),
  projectId: "poised-renderer-396517",
});
const bucket = gc.bucket('ideaverse');

app.use(bodyParser.json());
app.post('/getSignedUrl', async (req, res) => {
  try {
    const { filename, contentType } = req.body;
    
    const file = bucket.file(filename);
    const options = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
      contentType: contentType,
    };

    const [signedUrl] = await file.getSignedUrl(options);
    
    res.json({ signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Error generating signed URL' });
  }
});
// AWS routes
app.post('/data', (req, res) => {
  const data = req.body;
  const id = Object.keys(data)[0];
  console.log(`My id is ${id}`)
  console.log(mylogin);
  const pass = data[id].Pass;
  let signal1 = false;
  if(mylogin[id]!=undefined){
    if(mylogin[id].Password==pass){
      signal1=true;
    } 
  }
let previd=0;
if(signal1){
  fs.readFile('./device.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading device.json:', err);
      res.status(500).json({ error: 'Error reading device.json' });
    } else {
      const deviceData = JSON.parse(data);

      // Find the highest existing ID
      const lastId = Object.keys(deviceData).reduce((max, key) => {
        return Math.max(max, parseInt(key));
      }, 0);
previd=lastId;

      // Increment the highest existing ID and add the new ID
      const newDeviceData = {
        ...deviceData,
        [lastId + 1]: id,
      };

      // Write the updated deviceData back to device.json
      fs.writeFile('./device.json', JSON.stringify(newDeviceData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to device.json:', err);
        } else {
          console.log('Data added and device.json updated successfully');
        }
      });
    }
  });
}
  // Process the data and send a response
  // For simplicity, we'll just send back {"signal": true}
  res.json({ signal: signal1,prev:previd });
});
// ... Your other code ...
app.get('/9073324/:data', async (req, res) => {
    const data = req.params;
    let dc = data.data;
    let dc1 = dc.split('-');
    let p = "";
    for (let i = 0; i < dc1.length; i++) {
        switch (dc1[i]) {
            case "16RinKu40": p = p + '0'; break;
            case "12sIma21": p = p + '1'; break;
            case "33koMAl9": p = p + '2'; break;
            case "133KHUsI17": p = p + '3'; break;
            case "51AnIL79": p = p + '4'; break;
            case "16pRaMoD37": p = p + '5'; break;
            case "61alIshA16": p = p + '6'; break;
            case "22ANUprIyA89": p = p + '7'; break;
            case "59shirDEe93": p = p + '8'; break;
            case "94aBhIjEEt46": p = p + '9'; break;
        }
    }

    // Read device.json
    fs.readFile('./device.json', 'utf8', (deviceErr, deviceData) => {
        if (deviceErr) {
            console.error('Error reading device.json:', deviceErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const deviceJson = JSON.parse(deviceData);
        const deviceValue = deviceJson[p];

        if (!deviceValue) {
            res.status(404).json({ error: 'Device not found' });
            return;
        }

        // Read login.json
        fs.readFile('./login.json', 'utf8', (loginErr, loginData) => {
            if (loginErr) {
                console.error('Error reading login.json:', loginErr);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            const loginJson = JSON.parse(loginData);
            const userData = loginJson[deviceValue];

            if (userData) {
                res.json(userData);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    });
});

// Route to fetch the last updated ID from device.json
app.get('/lastId', (req, res) => {
  fs.readFile('./device.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading device.json:', err);
      res.status(500).json({ error: 'Error reading device.json' });
    } else {
      const deviceData = JSON.parse(data);

      // Find the last key in the deviceData object (which is the latest ID)
      const lastId = Object.keys(deviceData).reduce((max, key) => {
        return Math.max(max, parseInt(key));
      }, 0);

      res.json({ lastId });
    }
  });
});

// ... Rest of your code ...

app.post('/newposts', (req, res) => {
  const newPost = req.body;

  // Load existing data
  const jsonData = require('./data.json');

  // Push new data to the content array
  jsonData.content.push(newPost);

  // Write updated data back to the JSON file
  fs.writeFileSync('./data.json', JSON.stringify(jsonData, null, 2));

  res.json({ message: 'New post added successfully.' });
});

app.post('/create', (req, res) => {
  const newData = req.body;

  // Assuming data is in the format {"ronit1": {"Password": 2344}}
  const newId = Object.keys(newData)[0];
  const newPassword = newData[newId];
  // Update the mylogin object with the new data
  mylogin[newId] = newPassword;
  // Write the updated mylogin object back to login.json
  fs.writeFile('./login.json', JSON.stringify(mylogin, null, 2), (err) => {
    if (err) {
      console.error('Error writing to login.json:', err);
      
    } else {
      console.log('Data added and login.json updated successfully');

    }
  })
  fs.readFile('./device.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading device.json:', err);
      res.status(500).json({ error: 'Error reading device.json' });
    } else {
      const deviceData = JSON.parse(data);

      // Find the highest existing ID
      const lastId = Object.keys(deviceData).reduce((max, key) => {
        return Math.max(max, parseInt(key));
      }, 0);
previd=lastId;

      // Increment the highest existing ID and add the new ID
      const newDeviceData = {
        ...deviceData,
        [lastId + 1]: newId,
      };

      // Write the updated deviceData back to device.json
      fs.writeFile('./device.json', JSON.stringify(newDeviceData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to device.json:', err);
        } else {
          console.log('Data added and device.json updated successfully');
        }
      });
    }
});
})

app.get('/posts', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      res.status(500).json({ error: 'Error reading data.json' });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

// Google Cloud Storage upload route
app.post('/upload', async (req, res) => {
  const { filename } = req.body;
  const sourceFilePath = path.join(__dirname, filename);

  try {
    const fileContent = fs.readFileSync(sourceFilePath, 'utf8');

    const file = bucket.file(filename);
    const stream = file.createWriteStream({
      resumable: false,
      gzip: true,
    });

    stream.end(fileContent);

    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file.');
  }
});

// Google Cloud Storage download route
app.get('/download/:filename', async (req, res) => {
  const { filename } = req.params;
  const source = filename;

  try {
    const file = bucket.file(source);
    const stream = file.createReadStream();

    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading file.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
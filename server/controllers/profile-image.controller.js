'use strict';

const mongoose = require('mongoose'),
      mongo = require('mongodb'),
      config = require('../config/config'),
      fs = require('fs')

let Grid = require('gridfs-stream'),
    conn = mongoose.createConnection(config.dev.db);

Grid.mongo = mongoose.mongo;

let gfs = Grid(conn.db);

module.exports = {
  read: async (req, res, next) => {
    let imagename = req.params.filename;
    // gfs.files.findOne({
    //   filename: imagename
    // }, (error, file) => {
    //   if (!file || file.length === 0) {
    //     return res.status(404).json({
    //       message: 'File not found'
    //     });
    //   }

    //   if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/gif'){
    //     let readStream = gfs.createReadStream(file.filename);
    //     readStream.pipe(res);
    //   } else {
    //     return res.status(404).json({
    //       message: 'The File is not an image'
    //     });
    //   }
    // });

    gfs.files.find({
      filename: imagename
    }).toArray((err, files) => {
      if (files.length === 0) {
          return res.status(404).send({
              message: 'File not found'
          });
      }
      let data = [];
      let readstream = gfs.createReadStream({
          filename: files[0].filename
      });

      readstream.on('data', (chunk) => {
          data.push(chunk);
      });

      readstream.on('end', () => {
          data = Buffer.concat(data);
          let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
          res.end(img);
      });

      readstream.on('error', (err) => {
          res.status(500).send(err);
          console.log('An error occurred!', err);
      });
    });
  },
  
  create: async (req, res, next) => {
    let part = req.files.file;
    let writeStream = gfs.createWriteStream({
      filename: 'profile_' + Date.now() + '_' + part[0].name,
      mode: 'w',
      content_type: part[0].mimetype
    });
    
    writeStream.on('close', (file) => {
 
      if(!file) {
        res.status(400).send('No file received');
      }
      return res.status(200).send({
          message: 'Success',
          file: file
      });
    });
 
    writeStream.write(part[0].data, () => {
      writeStream.end();
    });
  }
}
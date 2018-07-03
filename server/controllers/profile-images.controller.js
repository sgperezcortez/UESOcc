'use strict';

const mongoose = require('mongoose');
const mongo = require('mongodb');
const db = require('../config/config').dev.db;

let Grid = require('gridfs-stream');
const conn = mongoose.createConnection(db);
Grid.mongo = mongoose.mongo;
let gfs = Grid(conn.db);


module.exports = {
  read: async (req, res, next) => {
    const imageName = req.params.filename;
    console.log(imageName);

    gfs.collection('profile-images')
      .findOne({
        filename: imageName
      }, (err, file) => {
        if (err) {
          res.status(400).json({
            success: false,
            error: err
          })
        };
        if (!file) {
          res.status(404).json({
            success: false,
            message: 'El archivo no existe'
          })
        } else {
          let data = [];
          let readStream = gfs.createReadStream({
            filename: imageName
          });

          readStream.on('data', (chunk) => {
            data.push(chunk);
          });

          readStream.on('end', () => {
            data = Buffer.concat(data);
            let image = 'data:image/png;base64,' + Buffer(data).toString('base64');
            res.status(200).json({
              success: true,
              message: 'Foto de perfil encontrada',
              file: file,
              profileImage: image
            });
          });

          readStream.on('error', (err) => {
            res.status(500).json({
              success: false,
              error: 'Un error ha ocurrido ', err
            })
          })
        }
      })
    
    

  },

  create: async (req, res, next) => {
    const imageName = req.files.file;
    const writeStream = gfs.createWriteStream({
      filename: 'profile_' + Date.now() + '_' + imageName[0].name,
      content_Type: imageName[0].mimetype,
      mode: {w: 1},
      root: 'profile-images',
      metadata: {
        originalName: imageName[0].name
      }
    });

    writeStream.write(imageName[0].data, () =>{
      writeStream.end();
    })

    writeStream.on('close', (file) => {
      if (!file) {
        res.status(400).json({
          success: false,
          message: 'Archivo no encontrado'
        })        
      } else {
        res.status(200).json({
          success: true,
          message: 'Imagen de perfil agregada satisfactoriamente',
          imageInfo: file,
          url: `http://${req.headers.host}/api/uploads/profile-image/${file.filename}` 
        })
      }
    })
  },

  delete: async (req, res, next) => {
    const imageName = req.params.filename;
    gfs.collection('profile-images')
      .findOne({filename: imageName}, (err, file) => {
        if (err) {
          res.status(400).json({
            success: false,
            error: 'Un error inesperado ha ocurrido ', err
          });
        } else {
          if (!file) {
            res.status(404).json({
              success: false,
              message: 'Imagen no encontrada'
            })
          } else {
            gfs.db.collection('profile-images'+ '.chunks')
              .remove({files_id: file._id}, (err) => {
                if (err) {
                  throw err;
                }
              })
            gfs.files.remove(file, (err, ) => {
              if (err) {
                res.status(400).json({
                  success: false,
                  error: 'Un error inesperado ha ocurrido ', err
                })
              } else {
                res.status(200).json({
                  success: true,
                  message: 'Imagen de perfil borrada satisfactoriamente'
                })
              }
            });
          }
        }
      })

  }
}
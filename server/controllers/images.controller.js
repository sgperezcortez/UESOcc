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

    gfs.collection('images')
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
              message: 'Image encontrada',
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
    if ((imageName[0].mimetype === 'image/png') || (imageName[0].mimetype === 'image/jpeg') || (imageName[0].mimetype === 'image/gif')) {
      const writeStream = gfs.createWriteStream({
        filename: 'image_' + Date.now() + '_' + imageName[0].name,
        content_type: imageName[0].mimetype,
        mode: {w: 1},
        root: 'images',
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
            message: 'Imagen agregada satisfactoriamente',
            imageInfo: file,
            url: `http://${req.headers.host}/api/uploads/profile-image/${file.filename}` 
          })
        }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'El tipo de archivo no corresponde a una imagen'
      })
    }
  },

  delete: async (req, res, next) => {
    const imageName = req.params.filename;
    gfs.collection('images')
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
          gfs.db.collection('images'+ '.chunks')
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
                message: 'Imagen borrada satisfactoriamente'
              })
            }
          });
        }
      }
    })
  }
}
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
    const docName = req.params.filename;

    gfs.collection('documents');
    gfs.files.find({filename: docName}).toArray((err, files) => {
      if (!files || files.length === 0) {
        res.status(404).json({
          success: false,
          message: 'El documento que buscas no existe'
        });
      }
      res.set('content-type', files[0].contentType);
      res.set('filename', files[0].filename);
      console.log(files[0].contentType);

      let readStream = gfs.createReadStream({
        filename: docName
      });
      
      readStream.on('data', (chunk) => {
        res.write(chunk);
      });

      readStream.on('end', () => {
        res.end();
      })
    });
  },

  create: async (req, res, next) => {
    const docName = req.files.file;
    console.log(docName[0].mimetype);
    if (docName[0].mimetype === 'application/pdf') {
      const writeStream = gfs.createWriteStream({
        filename: 'document_' + Date.now() + '_' + docName[0].name,
        content_type: docName[0].mimetype,
        mode: {w: 1},
        root: 'documents',
        metadata: {
          originalName: docName[0].name
        }
      });

      writeStream.write(docName[0].data, () =>{
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
            message: 'Documento agregado satisfactoriamente',
            imageInfo: file,
            url: `http://${req.headers.host}/api/uploads/profile-image/${file.filename}` 
          })
        }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'El tipo de archivo no corresponde a un documento PDF'
      })
    }
  },

  delete: async (req, res, next) => {
    const docName = req.params.filename;
    gfs.collection('documents')
    .findOne({filename: docName}, (err, file) => {
      if (err) {
        res.status(400).json({
          success: false,
          error: 'Un error inesperado ha ocurrido ', err
        });
      } else {
        if (!file) {
          res.status(404).json({
            success: false,
            message: 'Documento no encontrado'
          })
        } else {
          gfs.db.collection('documents'+ '.chunks')
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
                message: 'Documento borrado satisfactoriamente'
              })
            }
          });
        }
      }
    })
  }
}
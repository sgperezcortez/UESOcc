const Career = require('../models/careers'),
      mongoose = require('mongoose'),
      base_URL = "http://localhost:3000/api/careers/";

module.exports = {
  read: async (req, res, next) => {
    const careers = await Career.find({});
    res.status(200).json({
      success: true,
      count: careers.length,
      message: 'Listado completo de carreras',
      carrersList: careers.map(carrer => {
        return {
          _id: carrer._id,
          carrerName: career.careerName,
          description: career.description,
          dischargeProfile: career.dischargeProfile,
          admissionProfile: career.admissionProfile,
          workArea: career.workArea,
          info: {
            cycles: career.cycles,
            years: career.years,
            collegeDegree: career.collegeDegree
          },
          request: {
            type: 'GET',
            url: base_URL + career._id
          }
        };
      })
    });   
  },

  create: async (req, res, next) => {
    const newCareer = new Career(req.value.body);
    newCareer._id = new mongoose.Types.ObjectId();
    const career = await newCareer.save();
    res.status(200).json({
      succes: true,
      message: 'Carrera creada satisfactoriamente',
      career,
      request: {
        type: 'POST',
        url: base_URL + career._id
      }
    });
  },

  getCareer: async (req, res, next) => {
    const { careerId } = req.params;
    const career = await Career.findById(careerId);
    res.status(200).json({
      success: true,
      message: 'Recuperando información de la carrera',
      career: career,
      request: {
        type: 'GET',
        url: base_URL + careerId
      }
    });
  },

  edit: async (req, res, next) => {
    const { careerId } = req.params;
    const newCareer = req.body;

    const result = await Career.findByIdAndUpdate(careerId, newCareer);
    res.status(200).json({
      success: true,
      message: 'Carrera editada satisfactoriamente'
    });
  },

  update: async (req, res, next) => {
    const { careerId } = req.params;
    const newCareer = req.body;

    const result = await Career.findByIdAndUpdate(careerId, newCareer);
    res.status(200).json({
      success: true,
      message: 'Carrera editada satisfactoriamente'
    });
  },

  delete: async (req, res, next) => {
    const { careerId } = req.params;

    const result = await Career.findByIdAndRemove(careerId);
    res.status(200).json({
      success: true,
      message: "Carrera borrada satisfactoriamente."
    });
  }
}
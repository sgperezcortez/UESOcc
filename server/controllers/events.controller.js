const Event = require('../models/events');
const mongoose = require('mongoose');
const base_URL = "http://localhost:3000/api/events/";

module.exports = {

  // GET - get all events in database
  read: async (req, res, next) => {
    const events = await Event.find({});
    res.status(200).json({
      success: true,
      count: events.length,
      message: 'Lista completa de eventos',
      eventList: events.map( event => {
        return {
          _id: event._id,
          Name: event.name,
          whenStart: event.when.start,
          whenEnd: event.when.end,
          where: event.where,
          admission: event.admission,
          description: event.description,
          cost: event.cost,
          tags: event.tags,
          request: {
            type: 'GET',
            url: base_URL + event._id
          }
        }
      })
    })
  },

  // POST - create a new event to the Database
  create: async (req, res, next) => {
    const newEvent = new Event(req.value.body);
    newEvent._id = new mongoose.Types.ObjectId();
    const event = await newEvent.save();
    res.status(201).json({
      success: true,
      message: 'Evento creado satisfactoriamente',
      event,
      request: {
        type: 'POST',
        url: base_URL + event._id
      }
    })
  },

  // GET - get all the information about a specific event
  getEvent: async (req, res, next) => {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    res.status(200).json({
      success: true,
      message: 'Recuperando la información del evento',
      event: event
    })
  },

  // PUT - Modify the information about a specific event. All fields all required
  edit: async (req, res, next) => {
    const { eventId } = req.params;
    const newInfoEvent = req.body;
    const event = await Event.findByIdAndUpdate(eventId, newInfoEvent);
    res.status(200).json({
      success: true,
      message: 'Evento editado satisfactoriamente',
      event: event
    })
  },

  // PATCH - Modify the information about a specific event
  update: async (req, res, next) => {
    const {eventId} = req.params;
    const newInfoEvent = req.body;
    const event = await Event.findByIdAndUpdate(eventId, newInfoEvent);
    res.status(200).json({
      success: true,
      message: 'Evento editado satisfactoriamente',
      event: event,
      request: {
        type: 'GET',
        url: base_URL + eventId
      }
    })
  },

  // DELETE - removes a specific department
  delete: async (req, res, next) => {
    const {eventId} = req.params;
    const result = await Event.findByIdAndRemove(eventId);
    res.status(200).json({
      success: true,
      message: 'Evento borrado satisfactoriamente'
    })
  }
}
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Family = require('./family.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Familys
export function index(req, res) {
  Family.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Family from the DB
export function show(req, res) {
  Family.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Family in the DB
export function create(req, res) {
  Family.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Family in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Family.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Family from the DB
export function destroy(req, res) {
  Family.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets Familys By Email
export function getByEmail(req, res) {
  if (req.params.email) {
    Family.findOne({ email: req.params.email }, function (err, docs) {
      res.json(docs);
    });
  }
}

//Get Events by date
export function getEventByDate(req, res) {
  if (req.params.date) {
    Family.find({
      'events.timeStart': req.params.date,
      email: req.params.email }
      , function (err, docs) {
      res.json(docs);
    });
  }
}

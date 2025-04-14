const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {deleteFromDatabasebyId, getFromDatabaseById, getAllFromDatabase, addToDatabase, updateInstanceInDatabase} = require('./db');
//Cada vez que veas una ruta que tenga el parámetro :minionId, ejecutá esta función antes de llegar al manejador final, Guarda el minion encontrado en req.minion (para que puedas usarlo fácilmente en los próximos req de la ruta)
// Y llama a next() para que siga con el resto del flujo.
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
  });

minionsRouter.get('/',(req,res,next) => {
    res.send(getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req,res,next) => {
    let newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId',(req,res,next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req,res,next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
});

minionsRouter.delete('/:minionId', (req,res,next) => {
    let deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deleted){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

minionsRouter.get('/:minionId/work', (req,res,next)=> {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId
    });
    res.send(work);
});

//Generamos un trabajo , el cual primero definimos el trabajo a crear agregando el minionId al trabajo y depsuea agregandolo a la base de datos
minionsRouter.post('/:minionId/work', (req,res,next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

// Para todo aquel que use esta ruta se aplica el parametro que verifica que el trabajo esta dentro de la bd
minionsRouter.param('/:minionId/work/:workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId){
        res.status(400).send();
    } else {
        let updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if(deleted){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})
var express = require('express');
var router = express.Router();

const tasksProvider = require('./../providers/tasksProvider').TasksProvider;

const TasksRecursiveBuilder = require('./../services/tasksRecursiveBuilder').TasksRecursiveBuilder;
const taskRecursiveBuilder = new TasksRecursiveBuilder();
router.get('/', function (req, res, next) {
    taskRecursiveBuilder.getTree(mapResultCallback(res));
});

router.post('/', function (req, res, next) {
    tasksProvider.insert(req.body, mapResultCallback(res, (val) => {
        return {
            id: val
        }
    }));
});


function mapResultCallback (resp, mapping = null) {
    return function(error, value) {
        if (error === null) {
            resp.json(mapping == null ? value : mapping(value));
        } else {
            resp.status(400);
            resp.json(error);
        }
    }
}

module.exports = router;

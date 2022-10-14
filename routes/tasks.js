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

router.post('/:id', function (req, res, next) {
    const task = {
        ...req.body,
        id: req.params.id
    };
    tasksProvider.update(task, mapResultCallback(res, (val) => {
        return {
            result: val
        }
    }));
});

router.delete('/:id', function (req, res, next) {
    tasksProvider.delete(req.params.id, mapResultCallback(res, (val) => {
        return {
            result: val
        }
    }));
});


function mapResultCallback(resp, mapping = null) {
    return function (error, value) {
        if (error === null) {
            resp.json(mapping == null ? value : mapping(value));
        } else {
            resp.status(400);
            resp.json(error);
        }
    }
}

module.exports = router;

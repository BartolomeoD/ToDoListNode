TasksRecursiveBuilder = function () {
    const tasksProvider = require('./../providers/tasksProvider').TasksProvider;
    this.getTree = function (cb) {
        tasksProvider.fetchAll(function (error, tasks) {
            if (error) {
                cb(error, null);
            } else {
                let result = tasks.filter((task) => !task.parentId);
                buildTree(tasks, result);
                cb(null, result);
            }
        });
    };

    function buildTree(allTasks, innerTasks) {
        innerTasks.forEach(element => {
            element.subTasks = allTasks.filter((task) => task.parentId == element.id);
            buildTree(allTasks, element.subTasks);
        });
    }
};

exports.TasksRecursiveBuilder = TasksRecursiveBuilder;
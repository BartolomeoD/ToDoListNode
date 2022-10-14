
var nextTaskId = 1;

TasksProvider = function () {
    this.tasks = [];

    this.fetchAll = function (cb) {
        cb(null, this.tasks);
    };

    this.fetchById = function (id, cb) {
        var foundTasks = this.tasks.filter(function (task) { return task.id == id });

        if (foundTasks.length == 0) {
            cb('Task not found', null);
        } else {
            cb(null, foundTasks[0]);
        }
    };

    this.insert = function (user, cb) {
        user.id = nextTaskId++;
        this.tasks.push(user);

        cb(null, user.id);
    };

    this.update = function (task, cb) {
        this.fetchById(task.id, function (error, _task) {
            if (error) {
                cb(error, null);
            } else {
                _task.text = task.text;
                _task.done = task.done;
                _task.proiority = task.proiority;
                _task.parentId = task.parentId;

                cb(null, task.id);
            }
        });
    };

    this.delete = function (id, cb) {
        this.tasks = this.tasks.filter(function (task) { return task.id != id });
        cb(null, null);
    };
};

exports.TasksProvider = new TasksProvider();
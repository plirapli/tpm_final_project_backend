const router = require("express").Router();
const verify = require("../middleware/auth");
const todo = require("../controller/todo");

// [GET] /:uername
router.get("/", verify, todo.getTodo);
// [POST] /:id
router.post("/", verify, todo.insertTodo);
// [PUT] check/:id
router.put("/check/:todo_id", verify, todo.checkTodo);
// [PUT] /:id
router.put("/:todo_id", verify, todo.updateTodo);
// DELETE /:id
router.delete("/:todo_id", verify, todo.deleteTodo);

module.exports = router;

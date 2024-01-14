import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn react",
    description:
      "I want to learn react so that i can treat it like my slave and make it do whatever I want to go",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [favorite, setFavorite] = useState(false);
  // add neew task
  const handleTaskAdd = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  };

  //   edit the task
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  //   close modal button
  const handleOnClose = () => {
    setTaskToUpdate(false);
    setShowAddModal(null);
  };

  //   task delete
  const handleDelete = (deletedTask) => {
    const remainingTask = tasks.filter((task) => task.id !== deletedTask.id);
    setTasks(remainingTask);
  };

  //delete all
  const handleAllDelete = () => {
    setTasks([]);
  };

  //toggle favorite to unfavorite
  const handleToggleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setFavorite(newTask);
  };

  //search
  const handleOnSearch = (searchText) => {
    console.log(searchText);
    const newTasks = tasks.filter((task) =>
      task.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
    setTasks(newTasks);
  };

  return (
    <section className="mb-20 " id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleTaskAdd}
          taskToUpdate={taskToUpdate}
          OnClose={handleOnClose}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          {/* search box */}
          <SearchTask onSearch={handleOnSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* task actions */}
          <TaskActions
            addOnClick={() => setShowAddModal(!showAddModal)}
            handleAllDelete={handleAllDelete}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDelete}
              onFavorite={handleToggleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;

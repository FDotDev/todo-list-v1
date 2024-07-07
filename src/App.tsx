import { useState } from "react";
import "./App.css";
import { Todo, TodoElement, TodoState } from "./components/TodoElelement";
import { Filter, FilterButton } from "./components/FilterButton";

function App() {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const updateTodo = (index: number, state: TodoState) => {
    setTodos((oldTodos) => {
      const newTodos = [...oldTodos];
      newTodos[index].state = state;
      return newTodos;
    });
  };

  const deleteTodo = (index: number) => {
    setTodos((oldTodos) => {
      const newTodos = [...oldTodos];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  return (
    <>
      <h1>Todo List V1</h1>
      <div>
        <input
          type="text"
          placeholder="Add task..."
          onChange={(x) => setNewTodo(x.target.value)}
        />
        <button
          onClick={() => {
            setTodos((x) => [
              ...x,
              { title: newTodo, state: TodoState.Pending },
            ]);
          }}
        >
          Add
        </button>
      </div>
      <div>
        <FilterButton filter={Filter.All} setFilter={setFilter} />
        <FilterButton filter={Filter.Completed} setFilter={setFilter} />
        <FilterButton filter={Filter.Pending} setFilter={setFilter} />
      </div>
      <ul>
        {todos
          .filter((x) => {
            switch (filter) {
              case Filter.All:
                return true;
              case Filter.Completed:
                return x.state === TodoState.Completed;
              case Filter.Pending:
                return x.state === TodoState.Pending;
            }
          })
          .map((todo, index) => (
            <TodoElement
              todo={todo}
              index={index}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
      </ul>
    </>
  );
}

export default App;

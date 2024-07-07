import { useState } from "react";
import "./App.css";

enum Filter {
  All,
  Completed,
  Pending,
}

enum TodoState {
  Completed,
  Pending,
}

interface Todo {
  title: string;
  state: TodoState;
}

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
        <button onClick={() => setFilter(Filter.All)}>All</button>
        <button onClick={() => setFilter(Filter.Completed)}>Completed</button>
        <button onClick={() => setFilter(Filter.Pending)}>Pending</button>
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
          .map((x, index) => (
            <li key={`${index}-${x.title}`}>
              <span
                onClick={() =>
                  updateTodo(
                    index,
                    x.state === TodoState.Completed
                      ? TodoState.Pending
                      : TodoState.Completed
                  )
                }
                className={x.state === TodoState.Completed ? "done" : ""}
              >
                {x.title}
              </span>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;

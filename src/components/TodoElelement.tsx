export enum TodoState {
  Completed,
  Pending,
}

export interface Todo {
  title: string;
  state: TodoState;
}

interface TodoElementProps {
  todo: Todo;
  index: number;
  updateTodo: (index: number, state: TodoState) => void;
  deleteTodo: (index: number) => void;
}

export const TodoElement = ({
  todo,
  index,
  updateTodo,
  deleteTodo,
}: TodoElementProps) => {
  return (
    <li key={`${index}-${todo.title}`}>
      <span
        onClick={() =>
          updateTodo(
            index,
            todo.state === TodoState.Completed
              ? TodoState.Pending
              : TodoState.Completed
          )
        }
        className={todo.state === TodoState.Completed ? "done" : ""}
      >
        {todo.title}
      </span>
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </li>
  );
};

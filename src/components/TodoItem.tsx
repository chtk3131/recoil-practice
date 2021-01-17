import React from 'react';
import { useRecoilState } from 'recoil';

import { TodoState, TodoListState } from '../atom/TodoListState';

type Props = {
  item: TodoState;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(TodoListState);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // テキストを変更して更新
    const newList = todoList.map((value: TodoState) => {
      if (value.id === item.id) {
        return {
          ...value,
          text: e.target.value,
        };
      }
      return value;
    });

    setTodoList([...newList]);
  };

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // リストのうちの１つをupdateしてリスト自体を更新する必要がある
    const newList = todoList.map((value: TodoState) => {
      if (item.id === value.id) {
        return {
          ...item,
          isComplete: !value.isComplete,
        };
      }
      return value;
    });

    setTodoList([...newList]);
  };

  const handleDeleteClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newList = todoList.filter((value: TodoState) => {
      if (value.id !== item.id) {
        return value;
      }
    });

    setTodoList([...newList]);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={handleChangeText}></input>
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={handleChangeCheck}
      ></input>
      <button onClick={handleDeleteClicked}>X</button>
    </div>
  );
};

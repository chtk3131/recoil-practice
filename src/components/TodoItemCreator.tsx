import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { TodoListState, TodoState } from '../atom/TodoListState';

let id = 0;
const getId = () => {
  return id++;
};

export const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(TodoListState);

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // TODO:空白の場合は登録させない

    // アイテムを作成して、保存する
    setTodoList((todoList: TodoState[]) => [
      ...todoList,
      { id: getId(), text: inputValue, isComplete: false },
    ]);
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChanged}
      ></input>
      <button type="submit" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

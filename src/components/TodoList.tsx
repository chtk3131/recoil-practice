import React from 'react';
import { useRecoilValue } from 'recoil';

import { FilteredTodoListState } from '../atom/TodoListState';
import { TodoItem } from './TodoItem';
import { TodoItemCreator } from './TodoItemCreator';
import { TodoListFilters } from './TodoListFilters';
import { TodoListStats } from './TodoListStats';

export const TodoList = () => {
  // stateからTodoListを取得
  const filteredTodoList = useRecoilValue(FilteredTodoListState);

  return (
    <>
      <TodoListFilters></TodoListFilters>
      <TodoListStats></TodoListStats>
      <TodoItemCreator></TodoItemCreator>
      {filteredTodoList &&
        filteredTodoList.map((item) => {
          return <TodoItem key={item.id} item={item}></TodoItem>;
        })}
    </>
  );
};

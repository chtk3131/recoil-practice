import React from 'react';
import { useRecoilState } from 'recoil';

import { TodoListFilteredState, FilteredType } from '../atom/TodoListState';

// フィルタの種類を表示するだけ
export const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(TodoListFilteredState);

  const handleFilterSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <select value={filter} onChange={handleFilterSelected}>
        {/* なぜかわからないが、再レンダリングしてしまう */}
        {/* {Object.entries(FilteredType).map(([key, value]) => {
          console.log(value);
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })} */}
        <option value={FilteredType.ALL}>{FilteredType.ALL}</option>
        <option value={FilteredType.COMPLETED}>{FilteredType.COMPLETED}</option>
        <option value={FilteredType.UNCOMPLETED}>
          {FilteredType.UNCOMPLETED}
        </option>
      </select>
    </div>
  );
};

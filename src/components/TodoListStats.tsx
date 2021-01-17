import React from 'react';
import { useRecoilValue } from 'recoil';

import { TodoListStatsState } from '../atom/TodoListState';

export const TodoListStats = () => {
  const {
    itemCount,
    completedCount,
    unCompletedCount,
    competedRatio,
  } = useRecoilValue(TodoListStatsState);

  const completedPercentage = Math.round(competedRatio * 100);

  return (
    <div>
      <ul>
        <li>Total items : {itemCount}</li>
        <li>Completed items : {completedCount}</li>
        <li>UnCompleted items : {unCompletedCount}</li>
        <li>Completed Ratio : {completedPercentage}%</li>
      </ul>
    </div>
  );
};

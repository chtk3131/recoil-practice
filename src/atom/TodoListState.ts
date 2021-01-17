import { atom, selector } from 'recoil';

export type TodoState = {
  id: number;
  text: string;
  isComplete: boolean;
};

export enum FilteredType {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  UNCOMPLETED = 'UNCOMPLETED',
}

// TDリストの実態
export const TodoListState = atom<TodoState[]>({
  key: 'todoListState',
  default: [],
});

// TDリストのフィルタリングの項目
export const TodoListFilteredState = atom<string>({
  key: 'todoListFilteredState',
  default: FilteredType.ALL.toString(),
});

// TDリストのフィルタ内容（Providerでいうaction的な？）
export const FilteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(TodoListFilteredState);
    const list = get(TodoListState);

    switch (filter) {
      case FilteredType.COMPLETED:
        return list.filter((value: TodoState) => value.isComplete);
      case FilteredType.UNCOMPLETED:
        return list.filter((value: TodoState) => !value.isComplete);
      default:
        return list;
    }
  },
});

// TDリストの情報
// アイテム総数・完了アイテム数・未完了数・完了の割合
export const TodoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    // 全アイテム
    const itemList = get(FilteredTodoListState);
    // アイテム数
    const itemCount = itemList.length;
    // 完了アイテム数
    const completedCount = itemList.filter((value: TodoState) => {
      return value.isComplete;
    }).length;
    // 未完了数
    const unCompletedCount = itemCount - completedCount;
    // 完了の割合
    const competedRatio = itemCount === 0 ? 0 : completedCount / itemCount;

    return {
      itemCount,
      completedCount,
      unCompletedCount,
      competedRatio,
    };
  },
});

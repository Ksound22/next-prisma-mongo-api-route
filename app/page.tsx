import TodoList from '@/components/TodoList';
import CreateTodoBtn from '@/components/CreateTodoBtn';

export default async function Home() {
  return (
    <main>
      <h1 className="text-4xl text-center mt-5">Emerald Todo</h1>

      <CreateTodoBtn />
      <TodoList />
    </main>
  );
}

async function main() {
  await prisma.todo.createMany({
    data: [
      {
        title: 'Buy groceries',
        description: 'Milk, Bread, Cheese, and Eggs',
        isCompleted: false,
        updatedAt: new Date('2023-06-10T10:00:00Z'),
        createdAt: new Date('2023-06-10T09:45:00Z'),
      },
      {
        title: 'Complete assignment',
        description: 'Finish the math assignment by tomorrow',
        isCompleted: true,
        updatedAt: new Date('2023-06-11T15:30:00Z'),
        createdAt: new Date('2023-06-10T11:00:00Z'),
      },
    ],
  });

  const allTodos = await prisma.todo.findMany();
  console.dir(allTodos, { depth: null });
}

// main()
//   .catch(async (e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

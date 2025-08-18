import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db/db";
import Task from "../models/task";

export const getTasks = createServerFn({
  method: "GET",
}).handler(
  async (): Promise<
    {
      createdAt: Date;
      updatedAt: Date;
      title: string;
      description: string;
      _id: string;
      __v: number;
    }[]
  > => {
    await connectDB();
    const tasks = await Task.find({}).lean();

    console.log("Fetched tasks:", tasks); // Debugging fetched tasks

    return tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
    }));
  }
);

// export const postTask = createServerFn({
//   method: "POST",
// }).handler(
//   async (
//     ctx
//   ): Promise<{
//     createdAt: string;
//     updatedAt: string;
//     title: string;
//     description: string;
//     _id: string;
//     __v: number;
//   }> => {
//     await connectDB();

//     const { title, description } = ctx.data! as {
//       title: string;
//       description: string;
//     };

//     const savedTask = await Task.create({ title, description });

//     return {
//       ...savedTask.toObject(),
//       _id: savedTask._id.toString(),
//       createdAt: savedTask.createdAt.toISOString(),
//       updatedAt: savedTask.updatedAt.toISOString(),
//     };
//   }
// );

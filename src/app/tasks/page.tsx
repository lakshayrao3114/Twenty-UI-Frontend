"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function Tasks() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getandSetTodos();
  }, []);

  const getandSetTodos = () => {
    var todos: any = [];
    JSON.parse(localStorage.getItem("people") || "")?.forEach((todo: any) => {
      todo.tasks.forEach((task: any) => {
        todos.push({ id: todo.id, ...task });
      });
    });
    setTodos(todos);
  };

  const handleTaskStatus = (id: any, name: String) => {
    const newData: any = JSON.parse(localStorage.getItem("people") || "").map(
      (item: any) => {
        if (item?.id === id) {
          item.tasks.forEach((task: any) => {
            if (task.name === name) {
              task.status = 1;
            }
          });
        }
        return item;
      }
    );
    localStorage.setItem("people", JSON.stringify(newData));
    getandSetTodos();
  };

  const addTodo = () => {
    console.log("hey");
  };

  return (
    <div className="w-full border h-[600px] rounded-md">
      <Tabs defaultValue="todo">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="todo">Todo</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent className="p-2" value="todo">
          <div className="mx-1 text-lg font-bold mb-2">Upcoming</div>
          <ul className="mx-1">
            {todos
              ?.filter((todo: any) => todo.status != 1)
              .map((task: any, index: any) => (
                <li className="border p-2 mt-1 flex items-center" key={index}>
                  <div>{task.name}</div>
                  {task.status === 0 && (
                    <div className="ml-auto">
                      <Button
                        onClick={(e) => handleTaskStatus(task.id, task.name)}
                      >
                        Mark as done
                      </Button>
                    </div>
                  )}
                  {task.status === 1 && (
                    <div className="ml-auto">
                      <Button variant="ghost">Done</Button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
          <div>
            {/* <div className="mx-1 text-lg font-bold mt-2">
                            UnScheduled
                        </div> */}
          </div>
        </TabsContent>
        <TabsContent className="p-2" value="done">
          <div>
            <ul className="mx-1">
              {todos
                ?.filter((todo: any) => todo.status != 0)
                .map((task: any, index: any) => (
                  <li className="border p-2 mt-1 flex items-center" key={index}>
                    <div>{task.name}</div>
                    {task.status === 0 && (
                      <div className="ml-auto">
                        <Button
                          onClick={(e) => handleTaskStatus(task.id, task.name)}
                        >
                          Mark as done
                        </Button>
                      </div>
                    )}
                    {task.status === 1 && (
                      <div className="ml-auto">
                        <Button variant="ghost">Done</Button>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

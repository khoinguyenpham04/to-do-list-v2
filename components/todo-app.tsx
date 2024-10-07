"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

type Task = {
  id: number
  title: string
  notes: string
  dueDate: Date | null
  priority: "low" | "medium" | "high"
  category: string
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete project proposal", notes: "Include budget estimates", dueDate: new Date(2023, 5, 15), priority: "high", category: "Work" },
    { id: 2, title: "Buy groceries", notes: "Milk, eggs, bread", dueDate: new Date(2023, 5, 10), priority: "medium", category: "Groceries" },
    { id: 3, title: "Schedule dentist appointment", notes: "", dueDate: null, priority: "low", category: "Personal" },
  ])

  const [categories, setCategories] = useState<string[]>(["Work", "Personal", "Groceries"])
  const [newCategory, setNewCategory] = useState("")

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    notes: "",
    dueDate: null,
    priority: "medium",
    category: "Personal"
  })

  const addTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: Date.now() } as Task])
      setNewTask({ title: "", notes: "", dueDate: null, priority: "medium", category: "Personal" })
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task))
  }

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory("")
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl" 
      style={{
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <h1 className="text-5xl font-bold mb-4">Noah's Todo List</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="New task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Notes"
          value={newTask.notes}
          onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
          className="mb-2"
        />
        <div className="flex items-center space-x-2 mb-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !newTask.dueDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newTask.dueDate ? format(newTask.dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={newTask.dueDate || undefined}
                onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
            className="border rounded p-2"
          >
            <option value="low">Low ❕</option>
            <option value="medium">Medium ❗️❗️</option>
            <option value="high">High ❗️❗️❗️</option>
          </select>
          <select
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            className="border rounded p-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <Input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-48"
        />
        <Button onClick={addCategory}>Add Category</Button>
      </div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        {["all", ...categories].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {tasks
              .filter((task) => tab === "all" || task.category === tab)
              .map((task) => (
                <div key={task.id} className="mb-4 p-4 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <Input
                      type="text"
                      value={task.title}
                      onChange={(e) => updateTask(task.id, { title: e.target.value })}
                      className="text-lg font-semibold"
                    />
                    <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    type="text"
                    value={task.notes}
                    onChange={(e) => updateTask(task.id, { notes: e.target.value })}
                    placeholder="Notes"
                    className="mb-2"
                  />
                  <div className="flex items-center space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !task.dueDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {task.dueDate ? format(task.dueDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={task.dueDate || undefined}
                          onSelect={(date) => updateTask(task.id, { dueDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <select
                      value={task.priority}
                      onChange={(e) => updateTask(task.id, { priority: e.target.value as Task['priority'] })}
                      className="border rounded p-2"
                    >
                      <option value="low">Low ❕</option>
                      <option value="medium">Medium ❗️❗️</option>
                      <option value="high">High ❗️❗️❗️</option>
                    </select>
                    <select
                      value={task.category}
                      onChange={(e) => updateTask(task.id, { category: e.target.value })}
                      className="border rounded p-2"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
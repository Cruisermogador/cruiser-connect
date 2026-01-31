import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { mockTasks } from '@/data/mockData';

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
};

const statusIcons = {
  pending: AlertCircle,
  'in-progress': Clock,
  completed: CheckCircle2,
};

export default function Tasks() {
  const pendingTasks = mockTasks.filter((t) => t.status === 'pending');
  const inProgressTasks = mockTasks.filter((t) => t.status === 'in-progress');
  const completedTasks = mockTasks.filter((t) => t.status === 'completed');

  const TaskList = ({ tasks }: { tasks: typeof mockTasks }) => (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => {
          const StatusIcon = statusIcons[task.status];
          return (
            <div
              key={task.id}
              className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <StatusIcon className={`w-5 h-5 mt-0.5 ${
                task.status === 'completed' ? 'text-green-600' : 
                task.status === 'in-progress' ? 'text-blue-600' : 'text-amber-600'
              }`} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{task.title}</span>
                  <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  <Badge variant="outline">{task.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {task.assignedTo && <span>Assigned: {task.assignedTo}</span>}
                  {task.relatedRoomNumber && <span>Room: {task.relatedRoomNumber}</span>}
                  {task.dueDate && <span>Due: {task.dueDate}</span>}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-muted-foreground text-center py-8">No tasks in this category</p>
      )}
    </div>
  );

  return (
    <DashboardLayout title="Tasks & Operations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-9" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-amber-600">{pendingTasks.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-blue-600">{inProgressTasks.length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-green-600">{completedTasks.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList tasks={pendingTasks} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList tasks={inProgressTasks} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList tasks={completedTasks} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealTimeTasks.Data
{
    public class TasksRepository
    {
        private readonly string _connectionString;
        public TasksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddTask(TaskItem taskItem)
        {
            var ctx = new TasksContext(_connectionString);
            ctx.TaskItems.Add(taskItem);
            ctx.SaveChanges();
        }
        public List<TaskItem> GetTasks()
        {
            var ctx = new TasksContext(_connectionString);
            return ctx.TaskItems.Where(t => t.Status != Status.Done).ToList();
        }
        public void UpdateStatus(TaskItem taskItem)
        {
            var ctx = new TasksContext(_connectionString);
            ctx.TaskItems.Attach(taskItem);
            ctx.Entry(taskItem).State = EntityState.Modified;
            ctx.SaveChanges();
        }
        public User GetUserById(int id)
        {
            var ctx = new TasksContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Id == id);
        }

    }
}

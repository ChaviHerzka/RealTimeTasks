using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using RealTimeTasks.Data;

namespace RealTimeTasks.Web
{
    public class TaskHub : Hub
    {
        private readonly string _connectionString;
        public TaskHub(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        public void NewTask()
        {
            var repo = new TasksRepository(_connectionString);
            Clients.All.SendAsync("newtask", repo.GetTasks());
        }
        public void StatusChanged()
        {
            var repo = new TasksRepository(_connectionString);
            Clients.All.SendAsync("statuschanged", repo.GetTasks());
        }
    }
}

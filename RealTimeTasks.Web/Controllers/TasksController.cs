using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RealTimeTasks.Data;
using RealTimeTasks.Web.ViewModels;
using System.Collections.Generic;

namespace RealTimeTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly string _connectionString;
        public TasksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("addtask")]
        public void AddTask(NewTaskViewModel viewModel)
        {
            var task = new TaskItem
            {
                UserId = viewModel.UserId,
                Status = Status.Available,
                Title = viewModel.Title,
            };
            var repo = new TasksRepository(_connectionString);
            repo.AddTask(task);
        }
        [HttpGet]
        [Route("gettasks")]
        public List<TaskItem> GetTasks ()
        {
            var repo = new TasksRepository(_connectionString);
            return repo.GetTasks();
        }
        [HttpGet]
        [Route("getuserbyid")]
        public User GetById (int id)
        {
            var repo = new TasksRepository(_connectionString);
            return repo.GetUserById(id);
        }
        [HttpPost]
        [Route("changestatus")]
        public void ChangeStatus (TaskItem taskItem)
        {

            var repo = new TasksRepository(_connectionString);
            repo.UpdateStatus(taskItem);
        }
    }
}

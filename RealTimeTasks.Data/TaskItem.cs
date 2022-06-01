using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RealTimeTasks.Data
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Status Status { get; set; }
        public int UserId { get; set; }
       
    }
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        [JsonIgnore]
        public List<TaskItem> Tasks { get; set; }

    }
    public enum Status
    {
        Available,
        BeingDone,
        Done
    }
}

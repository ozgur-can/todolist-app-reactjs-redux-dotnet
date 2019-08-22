using ExampleWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace ExampleWebApi.TaskService
{
    public interface ITask
    {
        List<Task> GetTaskByDate(string date);
        HttpResponseMessage AddTask(Task task);
        HttpResponseMessage FinishTask(string date, string id);
    }
}
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TaskApi.Models;
using TaskApi.TaskService;

namespace TaskApi.Controllers
{
    public class TaskTodoController : ApiController
    {
        // ITask which is we gave permissions to use here, with Autofac
        ITask taskService;
        public ITask TaskService { get => taskService; set => taskService = value; }

        public TaskTodoController(ITask TService)
        {
            TaskService = TService;
        }

        // create a new task
        [Route("api/tasktodo/create")]
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Task task)
        {
            return TaskService.AddTask(task);
        }

        // get uncompleted tasks by date
        [Route("api/tasktodo/gettasks/{date}")]
        [HttpGet]
        public IHttpActionResult Get(string date)
        {
            return Ok(new { results = TaskService.GetTaskByDate(date) });
        }

        // finish tasks
        [Route("api/tasktodo/delete/{date}/{id}")]
        [HttpDelete]
        public HttpResponseMessage Delete(string date, string id)
        {
            return TaskService.FinishTask(date, id);
        }

    }
}

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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TaskTodoController : ApiController
    {
        TaskRepo taskRepo;
        public TaskRepo TaskRepo { get => taskRepo; set => taskRepo = value; }

        public TaskTodoController()
        {
            TaskRepo = new TaskRepo();
        }

        // POST: api/TaskTodo/create
        [Route("api/tasktodo/create")]
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Task task)
        {
            return TaskRepo.AddTask(task);
        }

        // GET: api/TaskTodo/5
        [Route("api/tasktodo/gettasks/{date}")]
        [HttpGet]
        public IHttpActionResult Get(string date)
        {
            return Ok(new { results = TaskRepo.GetTaskByDate(date) });
        }

        // DELETE: api/TaskTodo/5
        [Route("api/tasktodo/delete/{date}/{id}")]
        [HttpDelete]
        public HttpResponseMessage Delete(string date, string id)
        {
            return TaskRepo.FinishTask(date, id);
        }

    }
}

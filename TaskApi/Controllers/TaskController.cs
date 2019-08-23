using TaskApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Cors;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Mvc.Routing;
using RouteAttribute = System.Web.Mvc.RouteAttribute;
using HttpGetAttribute = System.Web.Mvc.HttpGetAttribute;
using HttpPostAttribute = System.Web.Mvc.HttpPostAttribute;
using HttpDeleteAttribute = System.Web.Mvc.HttpDeleteAttribute;
using TaskApi.TaskService;
using TaskApi.Controllers.CorsEnabler;

namespace TaskApi.Controllers
{
    [EnableCors("*", "*", "*")]
    public class TasksController : Controller
    {
        ITask taskService;
        public TasksController(ITask TService)
        {
            TaskService = TService;
        }

        string connectionString = @"Data Source=.\SQLEXPRESS;
                                    AttachDbFilename=|DataDirectory|\taskdb.mdf;
                                    Integrated Security=True;User Instance=True;";

        public ITask TaskService { get => taskService; set => taskService = value; }

        // GET: tasks
        [HttpGet]
        [Route("tasks")]
        [AllowCrossSiteJson]
        public JsonResult Index()
        {
            // return nothing if date is not specified in url
            //return Json(null, JsonRequestBehavior.AllowGet);
            // TODO delete this method

            string queryString = "select * from dbo.Task";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, con);
                List<Task> mytasks = new List<Task>();

                try
                {
                    con.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        mytasks.Add(new Task(reader[0].ToString(), reader[1].ToString(), Convert.ToBoolean(reader[2]), reader[3].ToString()));
                    }
                    reader.Close();
                    return Json(mytasks, JsonRequestBehavior.AllowGet);


                }
                catch (Exception ex)
                {
                    return Json(mytasks, JsonRequestBehavior.AllowGet);
                }
            }
        }

        // GET: tasks/details/date
        [HttpGet]
        [Route("tasks/details/{date}")]
        [AllowCrossSiteJson]
        public JsonResult Details(string date)
        {
            return Json(TaskService.GetTaskByDate(date), JsonRequestBehavior.AllowGet);
        }

        // POST: tasks/create
        [HttpPost]
        [Route("tasks/create")]
        [AllowCrossSiteJson]
        public HttpResponseMessage Create([FromBody] string id, string name, bool completed, string date)
        {
            return TaskService.AddTask(new Task(id, name, completed, date));
        }

        // DELETE: tasks/delete/date/id
        [HttpDelete]
        [Route("tasks/delete/{date}/{id}")]
        [AllowCrossSiteJson]
        public HttpResponseMessage Delete(string date, string id)
        {
            return TaskService.FinishTask(date, id);
        }

        // DELETE: tasks/deleteall
        [HttpDelete]
        [Route("tasks/deleteall")]
        [AllowCrossSiteJson]
        public HttpResponseMessage DeleteAll()
        {
            try
            {
                using (SqlConnection sqlCon = new SqlConnection(connectionString))
                {
                    sqlCon.Open();
                    string query = "truncate table dbo.task";
                    SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
                    sqlCmd.ExecuteNonQuery();

                    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                }
            }
            catch (Exception)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }
        }

    }
}

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
        [Route("api/tasktodo/getone/{date}")]
        [HttpGet]
        public IHttpActionResult Get(string date)
        {
            string connectionString = @"Data Source=.\SQLEXPRESS;
                                    AttachDbFilename=|DataDirectory|\taskdb.mdf;
                                    Integrated Security=True;User Instance=True;";

            string queryString = "select * from dbo.Task where date = @date and completed = 'false'";

            SqlParameter param = new SqlParameter();
            param.ParameterName = "@date";
            param.Value = date;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, con);
                List<Task> mytasks = new List<Task>();

                command.Parameters.Add(param);

                try
                {
                    con.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        mytasks.Add(new Task(reader[0].ToString(), reader[1].ToString(), Convert.ToBoolean(reader[2]), reader[3].ToString()));
                    }

                    reader.Close();
                    return Ok(new { results = mytasks });

                }
                catch (Exception)
                {
                    return NotFound();
                }
            }
        }

        // DELETE: api/TaskTodo/5
        [Route("api/tasktodo/delete/{date}/{id}")]
        [HttpDelete]
        public HttpResponseMessage Delete(string date, string id)
        {
            string connectionString = @"Data Source=.\SQLEXPRESS;
                                    AttachDbFilename=|DataDirectory|\taskdb.mdf;
                                    Integrated Security=True;User Instance=True;";

            string queryString = "update dbo.Task set completed = 'true' where id = @id and date = @date";

            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                SqlCommand sqlCmd = new SqlCommand(queryString, sqlCon);
                try
                {
                    sqlCon.Open();
                    sqlCmd.Parameters.AddWithValue("@id", id);
                    sqlCmd.Parameters.AddWithValue("@date", date);
                    sqlCmd.ExecuteNonQuery();
                    sqlCon.Close();

                    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                }

                catch (Exception)
                {
                    return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                }

            }
        }

    }
}

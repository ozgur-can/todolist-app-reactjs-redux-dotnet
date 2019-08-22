using ExampleWebApi.Models;
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

namespace ExampleWebApi.Controllers
{
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Origin", "*");
            base.OnActionExecuting(filterContext);
        }
    }

    [EnableCors("*", "*", "*")]
    public class tasksController : Controller
    {
        string startupPath = Environment.CurrentDirectory;

        string connectionString = @"Data Source=.\SQLEXPRESS;
                                    AttachDbFilename=|DataDirectory|\taskdb.mdf;
                                    Integrated Security=True;User Instance=True;";

        // GET: tasks
        [HttpGet]
        [Route("tasks")]
        [AllowCrossSiteJson]
        public JsonResult Index()
        {
            // return nothing if date is not specified in url
            //return Json(null, JsonRequestBehavior.AllowGet);

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
                    Console.WriteLine(ex.Message);
                }
                return Json(mytasks, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: tasks/details/date
        [HttpGet]
        [Route("tasks/details/{date}")]
        [AllowCrossSiteJson]
        public JsonResult Details(string date)
        {
            string queryString = "select * from dbo.Task where date = @date";

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
                    return Json(mytasks, JsonRequestBehavior.AllowGet);

                }
                catch (Exception)
                {
                    return Json(mytasks, JsonRequestBehavior.AllowGet);
                }
            }
        }

        // POST: tasks/create
        [HttpPost]
        [Route("tasks/create")]
        [AllowCrossSiteJson]
        public HttpResponseMessage Create([FromBody] string id, string name, bool completed, string date)
        {
            try
            {
                using (SqlConnection sqlCon = new SqlConnection(connectionString))
                {

                    sqlCon.Open();
                    string query = "insert into dbo.Task values(@id, @name, @completed, @date)";
                    SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
                    sqlCmd.Parameters.AddWithValue("@id", id);
                    sqlCmd.Parameters.AddWithValue("@name", name);
                    sqlCmd.Parameters.AddWithValue("@completed", completed);
                    sqlCmd.Parameters.AddWithValue("@date", date);
                    sqlCmd.ExecuteNonQuery();

                    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                }
            }
            catch (Exception)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }

        }

        // DELETE: tasks/delete/date/id
        [HttpDelete]
        [Route("tasks/delete/{date}/{id}")]
        [AllowCrossSiteJson]
        public HttpResponseMessage Delete(string date, string id)
        {
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

                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);

            }

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

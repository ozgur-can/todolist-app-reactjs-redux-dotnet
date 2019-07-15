using System;
using System.Collections.Generic;
using System.Web.Http;
using todoApi.Models;
using System.Data.SqlClient;

namespace todoApi.Controllers
{
    public class ValuesController : ApiController
    {
       SqlConnection con;
        string startupPath = Environment.CurrentDirectory;

        string connectionString = @"data source=(localdb)\MSSQLLocalDB;
                                    AttachDbFilename=C:\Users\Ozgur Can\Desktop\mygithub\.net-reactJS-redux-todolist-app\server\todoApi\todoApi\Models\TaskDb.mdf;
                                    initial catalog=TaskDb;integrated security=True;
                                    MultipleActiveResultSets=True;App=EntityFramework";
        
        // GET api/values
        [Route("api/values")]
        public IEnumerable<Task> Get()
        {
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
                        Console.WriteLine("\t{0}\t{1}\t{2}",
                            reader[0], reader[1], reader[2]);
                        mytasks.Add(new Task(reader[0].ToString(), reader[1].ToString()));
                    }
                    reader.Close();
                    return mytasks;


                    //        List<Task> mytasks = new List<Task>();
                    //mytasks.Add(new Task("asda", new DateTime().ToString("dd-mm-yyyy")));
                    //mytasks.Add(new Task("sdas", new DateTime().ToString("dd-mm-yyyy")));

                    //return mytasks;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                return mytasks;

            }
        }

        // GET api/values/5
        [Route("api/values/{id}")]
        public Task Get(int id)
        {
            string queryString = "select * from dbo.Task where taskid={id}";
            return new Task("asda", "22-03-1992");
        }

        [Route("api/values/newtask")]
        public Task Post([FromBody] Task task)
        {
            return new Task(task.Taskname, task.Taskdate);
        }

        // PUT api/values/5
        [Route("api/values/updatetask/{id}")]
        public Task Put([FromBody]int id, bool done)
        {
            //dbden bul id ile uzerinde done = true yap
            return new Task("s", new DateTime().ToString("dd-MM-yyyy"));
        }

        // GET api/tasks/5
        [Route("api/tasks/{date}")]
        public Task Get(string date)
        {
            return new Task("sdasd", new DateTime(2019, 3, 28).ToString("dd-MM-yyyy"));
        }


        //// POST api/values
        //public HttpResponseMessage Post([FromBody] Task task)
        //{
        //    try
        //    {
        //        // dbye ekle new Task(task)
        //        var message = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        //        return message;
        //    }
        //    catch
        //    {
        //        return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
        //    }
        //}


        //// GET api/values/5
        //public HttpResponseMessage Get([FromBody] Task task)
        //{
        //    try
        //    {
        //        // dbde ara Task(task)
        //        var message = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        //        return message;
        //    }
        //    catch
        //    {
        //        return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
        //    }
        //}

    }
}

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using ExampleWebApi.Models;

namespace ExampleWebApi.TaskService
{
    public class TaskRepo : ITask
    {
        string connectionString;

        public TaskRepo()
        {
            ConnectionString = @"Data Source=.\SQLEXPRESS;
                                    AttachDbFilename=|DataDirectory|\taskdb.mdf;
                                    Integrated Security=True;User Instance=True;";
        }

        public string ConnectionString { get => connectionString; set => connectionString = value; }

        public HttpResponseMessage AddTask(Task task)
        {
            try
            {
                using (SqlConnection sqlCon = new SqlConnection(ConnectionString))
                {
                    sqlCon.Open();
                    string query = "insert into dbo.Task values(@id, @name, @completed, @date)";
                    SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
                    sqlCmd.Parameters.AddWithValue("@id", task.id);
                    sqlCmd.Parameters.AddWithValue("@name", task.name);
                    sqlCmd.Parameters.AddWithValue("@completed", task.completed);
                    sqlCmd.Parameters.AddWithValue("@date", task.date);
                    sqlCmd.ExecuteNonQuery();

                    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                }
            }
            catch (Exception)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }
        }

        public HttpResponseMessage FinishTask(string date, string id)
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
                    return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                }

            }
        }

        public List<Task> GetTaskByDate(string date)
        {
            string queryString = "select * from dbo.Task where date = @date and completed = 'false'";

            SqlParameter param = new SqlParameter();
            param.ParameterName = "@date";
            param.Value = date;

            using (SqlConnection con = new SqlConnection(ConnectionString))
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
                    return mytasks;
                    //return Json(mytasks, JsonRequestBehavior.AllowGet);

                }
                catch (Exception)
                {
                    //return Json(mytasks, JsonRequestBehavior.AllowGet);
                    return null;
                }

            }
        }
    }
}
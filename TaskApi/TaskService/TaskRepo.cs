using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using TaskApi.Models;

namespace TaskApi.TaskService
{
    public class TaskRepo : ITask
    {
        string connectionString;
        public string ConnectionString { get => connectionString; set => connectionString = value; }

        public TaskRepo()
        {
            // database connection path
            ConnectionString = @"Data Source=.\SQLEXPRESS;
                                    AttachDbFilename=|DataDirectory|\taskdb.mdf;
                                    Integrated Security=True;User Instance=True;";
        }


        public HttpResponseMessage AddTask(Task task)
        {
            // insert task object into the database

            try
            {
                using (SqlConnection sqlCon = new SqlConnection(ConnectionString))
                {
                    string query = "insert into dbo.Task values(@id, @name, @completed, @date)";

                    // using parameter in the sql query
                    SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
                    sqlCmd.Parameters.AddWithValue("@id", task.id);
                    sqlCmd.Parameters.AddWithValue("@name", task.name);
                    sqlCmd.Parameters.AddWithValue("@completed", task.completed);
                    sqlCmd.Parameters.AddWithValue("@date", task.date);

                    sqlCon.Open();
                    sqlCmd.ExecuteNonQuery();
                    sqlCon.Close();

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
            // update a specific task set completed true

            try
            {
                using (SqlConnection sqlCon = new SqlConnection(connectionString))
                {
                    string query = "update dbo.Task set completed = 'true' where id = @id and date = @date";

                    // using parameter in the sql query
                    SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
                    sqlCmd.Parameters.AddWithValue("@id", id);
                    sqlCmd.Parameters.AddWithValue("@date", date);

                    sqlCon.Open();
                    sqlCmd.ExecuteNonQuery();
                    sqlCon.Close();

                    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                }
            }

            catch (Exception)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }

        }

        public List<Task> GetTaskByDate(string date)
        {
            // list tasks for given date
            List<Task> myTasks = new List<Task>();

            try
            {
                using (SqlConnection sqlCon = new SqlConnection(ConnectionString))
                {
                    string query = "select * from dbo.Task where date = @date and completed = 'false'";

                    // using parameter in the sql query
                    SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
                    sqlCmd.Parameters.AddWithValue("@date", date);

                    sqlCon.Open();

                    SqlDataReader reader = sqlCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // after fetch list, push into the list
                        myTasks.Add(new Task(reader[0].ToString(), reader[1].ToString(), Convert.ToBoolean(reader[2]), reader[3].ToString()));
                    }

                    reader.Close();
                    sqlCon.Close();

                    return myTasks;
                }
            }
            catch (Exception)
            {
                return null;
                //throw;
            }
        }
    }
}
namespace ExampleWebApi.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TaskModel : DbContext
    {
        public TaskModel()
            : base("name=TaskModel")
        {
        }

        public virtual DbSet<Task> tasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}

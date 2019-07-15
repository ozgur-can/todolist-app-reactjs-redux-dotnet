namespace todoApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Task")]
    public partial class Task
    {
        [StringLength(50)]
        private string taskid;

        [Required]
        private string taskname;

        private bool done;

        [Required]
        [StringLength(50)]
        private string taskdate;

        public string Taskid { get => taskid; set => taskid = value; }
        public string Taskname { get => taskname; set => taskname = value; }
        public bool Done { get => done; set => done = value; }
        public string Taskdate { get => taskdate; set => taskdate = value; }

        public Task(string taskname, string taskdate)
        {
            Taskid = Guid.NewGuid().ToString("N");
            Taskname = taskname;
            Done = false;
            Taskdate = taskdate;
        }
    }
}

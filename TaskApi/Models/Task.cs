namespace TaskApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("task")]
    public partial class Task
    {
        public Task(string idVal, string nameVal, bool completedVal, string dateVal)
        {
            id = idVal;
            name = nameVal;
            completed = completedVal;
            date = dateVal;
        }

        [StringLength(50)]
        public string id { get; set; }

        [Required]
        [StringLength(50)]
        public string name { get; set; }

        public bool completed { get; set; }

        [Required]
        [StringLength(50)]
        public string date { get; set; }
    }
}

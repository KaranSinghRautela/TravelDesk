
using Microsoft.VisualBasic;
using System.Data;
using System.Globalization;
using System.Reflection.Metadata.Ecma335;

namespace TravelDeskNST.Model
{
    public class Request
    {
        public int RequestId { get; set; }
         public User?  User { get; set; }

        public int UserId { get; set; }

        public Project? Project { get; set; }

        public int ProjectId { get; set; }

        public string ReasonForTraveling { get; set; }
       
        public string Status { get; set; }


        public virtual User? Manager { get; set; }
        public int ManagerId { get; set; }
        public Document? Document { get; set; }
        public int? DocumentId { get; set; }
        public string AadharNumber { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public Boolean IsActive { get; set; } = true;



    }
}

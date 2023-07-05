using TravelDeskNST.Model;

namespace TravelDeskNST.Models
{
    public class RequestViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string ProjectName { get; set; }
        public string ReasonForTravelling { get; set; }
        public string Status { get; set; }
        public string ManagerName { get; set; }


        public string DepartmentName { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public Boolean IsActive { get; set; }
    }
}

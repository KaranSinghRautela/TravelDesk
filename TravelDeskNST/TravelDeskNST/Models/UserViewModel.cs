namespace TravelDeskNST.Models
{
    public class UserViewModel
    {

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string ManagerName { get; set; }
        //public int ManagerId { get; set; }
        public string DepartmentName { get; set; }
        public string RoleName { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public Boolean IsActive { get; set; }

    }
}

using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace TravelDeskNST.Model
{
    public class User
    {

        public int Id { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email  { get; set; }
        [Required]
        [StringLength(20)]
        public string FirstName { get; set; }
        
        public string? MiddleName { get; set; }
        [Required]
        [StringLength(20)]
        public string LastName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string ContactNumber { get; set; }
        public virtual CommonTypeReference? Role { get; set; }
        public int RoleId { get; set; }
        public virtual CommonTypeReference? Department { get; set; }
        public int DepartmentId { get; set; }
        public virtual User? Manager { get; set; }
        public int? ManagerId { get; set; }
        public string ? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set;}
        public Boolean IsActive  { get; set; } = true;




    }
}

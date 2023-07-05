using System.ComponentModel.DataAnnotations;

namespace TravelDeskNST.Models
{
    public class LogInViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        public string? RoleName { get; set; }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TravelDeskNST.Context;
using TravelDeskNST.Model;
using TravelDeskNST.Models;



namespace TravelDeskNST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        TravelDbContext _context;
        IConfiguration _config;
        public AuthenticationController(TravelDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
            
        }
        [HttpPost]
        public IActionResult Login(LogInViewModel user)
        {
            IActionResult response = Unauthorized();
            var obj = Authenticate(user);

 
            if (obj != null)
            {
                CommonTypeReference c=_context.CommonTypeReferences.Where(x=>x.Id == obj.RoleId).FirstOrDefault();
                user.RoleName = c.Value;
                var tokenString = GenerateJSONWebToken(obj.Id, obj.Email, user.RoleName,obj.FirstName);
                response = Ok(new { token = tokenString,status=200 });

            }
            return response;
        }
        private string GenerateJSONWebToken(int Id, string Email, string role, string firstName)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim("Id", Id.ToString()));
            claims.Add(new Claim("Email", Email));
            claims.Add(new Claim("rolename", role));
            claims.Add(new Claim("firstName", firstName));
            //   Claim[] claims = new[]
            //{
            //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            //        new Claim(JwtRegisteredClaimNames.Sid, Id.ToString()),
            //        new Claim(JwtRegisteredClaimNames.Email, password),
            //        new Claim(ClaimTypes.Role, role.ToString()),
            //        new Claim(type:"Date", DateTime.Now.ToString())
            //   };
            var securityKey = new
            SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey,
            SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        private User Authenticate(LogInViewModel user)
        {
            User obj = _context.Users.FirstOrDefault(x => x.Email == user.Email
&& x.Password == user.Password);
            return obj;
        }
    }
}
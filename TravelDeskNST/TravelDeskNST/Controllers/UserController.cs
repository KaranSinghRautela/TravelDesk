using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelDeskNST.IRepository;
using TravelDeskNST.Model;
using TravelDeskNST.Models;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TravelDeskNST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        IUserInterface _repo;
        public UserController(IUserInterface repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            if (_repo.GetUsers().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return _repo.GetUsers();
            }
        }

        [HttpGet("usersview")]
        public ActionResult<List<UserViewModel>> GetUsersList()
        {
            if (_repo.GetUsers().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return _repo.GetUsersList();
            }
        }

        [HttpGet("usersview/{id}")]
        public ActionResult<List<UserViewModel>> GetUsersList(int id)
        {
            if (_repo.GetUsers().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return _repo.GetUsersList(id);
            }
        }


        [HttpGet("managers")]
        public ActionResult<List<ManagerViewModel>> GetManagersList()
        {
            if (_repo.GetUsers().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return _repo.GetManagersList();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<int> GetUserById(int id)
        {
            if (_repo.GetUsersById(id) == null)
                return 0;
            else
                return Ok(_repo.GetUsersById(id));
        }

        [HttpPost]
        public ActionResult<int> AddUser(User user)
        {
            _repo.AddUser(user);
            return Created("Created", user);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateUser(int id, User user)
        {
            _repo.EditUsers(id, user);
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public ActionResult<string> DeleteUser(int id)
        {
            User user = _repo.GetUsersById(id);
            if (user == null)
                return "There is no Record";
            else
            {
                _repo.DeleteUsers(id);
                return Ok(JsonSerializer.Serialize("Record Deleted"));
            }
        }
    }
}

using Microsoft.EntityFrameworkCore;
using TravelDeskNST.Context;
using TravelDeskNST.IRepository;
using TravelDeskNST.Model;
using TravelDeskNST.Models;

namespace TravelDeskNST.Repository
{
    public class UserRepository : IUserInterface
    {
        TravelDbContext _context;
        public UserRepository(TravelDbContext context)
        {
            _context = context;
        }
        public void AddUser(User user)
        {
            if (user != null)
            {
                user.CreatedBy = "admin";
            }
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void DeleteUsers(int id)
        {
            User user = _context.Users.FirstOrDefault(
                x => x.Id == id);
            if (user != null)
            {
                user.IsActive = false;
                _context.SaveChanges();
            }

        }

        public void EditUsers(int id, User user)
        {
            //(from p in _context.Users
            // where p.Id == id
            // select p).ToList().
            // ForEach(x =>
            // {
            //     x.FirstName = user.FirstName;
            //     x.MiddleName = user.MiddleName;
            //     x.LastName = user.LastName;
            //     x.MiddleName = user.MiddleName;
            //     x.Email = user.Email;
            //     x.Password = user.Password;
            //     x.ContactNumber = user.ContactNumber;
            //     x.RoleId = user.RoleId;
            //     x.DepartmentId= user.DepartmentId;
            //     x.ManagerId = user.ManagerId;
            //     x.ModifiedBy = user.ModifiedBy;
            //     x.ModifiedDate = DateTime.Now;
            // });

            User obj = GetUsersById(id);

            if(obj != null)
            {
                obj.FirstName = user.FirstName;
                obj.LastName = user.LastName;
                obj.Email = user.Email;
                obj.ModifiedBy = user.FirstName;
                obj.ContactNumber = user.ContactNumber;
                obj.ModifiedDate = DateTime.Now;
                //obj.CreatedBy = user.CreatedBy;
                obj.ManagerId = user.ManagerId;
            }

            _context.SaveChanges();

        }

        public List<ManagerViewModel> GetManagersList()
        {
            var managerList = _context.Users
                .Join(_context.CommonTypeReferences,
                    user => user.RoleId,
                    role => role.Id,
                    (user, role) => new { User = user, Role = role })
                .Where(result => result.Role.Value == "manager")
                .Select(result => new ManagerViewModel
                {
                    Id = result.User.Id,
                    FirstName = result.User.FirstName,
                    LastName = result.User.LastName
                })
                .ToList();



            return managerList;

        }

        public List<User> GetUsers()
        {

            return _context.Users.Where(x=>x.IsActive==true).ToList();

        }

        public User GetUsersById(int id)
        {
            User user = _context.Users.FirstOrDefault(
               x => x.Id == id);
            return user;
        }

        public List<UserViewModel> GetUsersList()
        {
           
            var query = (from u in _context.Users
                         where u.IsActive == true && u.RoleId != 2
                         join r in _context.CommonTypeReferences on u.RoleId equals r.Id
                         join d in _context.CommonTypeReferences on u.DepartmentId equals d.Id
                         join m in _context.Users on u.ManagerId equals m.Id into managers
                         from manager in managers.DefaultIfEmpty()
                         select new UserViewModel
                         {
                             Id = u.Id,
                             FirstName = u.FirstName,
                             LastName = u.LastName,
                             Email = u.Email,
                             ContactNumber = u.ContactNumber,
                             ManagerName = manager != null ? manager.FirstName + " " + manager.LastName : string.Empty,
                             DepartmentName = d.Value,
                             RoleName = r.Value,
                             CreatedBy = u.CreatedBy,
                             CreatedDate = u.CreatedDate,
                             ModifiedBy = u.ModifiedBy,
                             ModifiedDate = u.ModifiedDate
                         }).ToList();

            return query;

        }

        public List<UserViewModel> GetUsersList( int uid)
        {

            var query = (from u in _context.Users
                         where u.IsActive == true && u.RoleId != 1 && u.Id == uid
                         join r in _context.CommonTypeReferences on u.RoleId equals r.Id
                         join d in _context.CommonTypeReferences on u.DepartmentId equals d.Id
                         join m in _context.Users on u.ManagerId equals m.Id into managers
                         from manager in managers.DefaultIfEmpty()
                         select new UserViewModel
                         {
                             Id = u.Id,
                             FirstName = u.FirstName,
                             LastName = u.LastName,
                             Email = u.Email,
                             ContactNumber = u.ContactNumber,
                             ManagerName = manager != null ? manager.FirstName + " " + manager.LastName : string.Empty,
                             DepartmentName = d.Value,
                             RoleName = r.Value,
                             CreatedBy = u.CreatedBy,
                             CreatedDate = u.CreatedDate,
                             ModifiedBy = u.ModifiedBy,
                             ModifiedDate = u.ModifiedDate,
                             IsActive = u.IsActive
                         }).ToList();

            return query;

        }

    }
}

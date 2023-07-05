using TravelDeskNST.Model;
using TravelDeskNST.Models;

namespace TravelDeskNST.IRepository
{
    public interface IUserInterface
    {
        public List<User> GetUsers();

        public List<ManagerViewModel> GetManagersList();

        public List<UserViewModel> GetUsersList();
        public List<UserViewModel> GetUsersList(int id);
        public User GetUsersById(int id);
        public void AddUser(User user);
        public void EditUsers(int id, User user);
        public void DeleteUsers(int id);
    }
}

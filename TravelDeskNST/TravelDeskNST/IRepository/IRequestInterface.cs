using TravelDeskNST.Models;

namespace TravelDeskNST.IRepository
{
    public interface IRequestInterface
    {
        public List<RequestViewModel> GetUserRequestList(int id);
        public List<RequestViewModel> GetManagerRequestList(int id);
        public List<RequestViewModel> GetHRAdminRequestList();

        public RequestViewModel GetUserRequestDetail(int id);

    }
}

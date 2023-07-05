using TravelDeskNST.Context;
using TravelDeskNST.IRepository;
using TravelDeskNST.Models;

namespace TravelDeskNST.Repository
{
    public class RequestRepository: IRequestInterface
    {
        TravelDbContext _context;
        public RequestRepository(TravelDbContext context) {
            _context = context;
        }

        public List<RequestViewModel> GetUserRequestList(int id) {
            var query = (from r in _context.Requests
                         where r.IsActive == true && r.UserId ==id
                         join u in _context.Users on r.UserId equals u.Id
                         join d in _context.CommonTypeReferences on u.DepartmentId equals d.Id
                         join p in _context.Projects on r.ProjectId equals p.Id
                         join m in _context.Users on r.ManagerId equals m.Id into managers
                         from manager in managers.DefaultIfEmpty()
                         select new RequestViewModel
                         {
                             Id = r.RequestId,
                             UserName = u.FirstName+" "+u.LastName,
                             ManagerName = manager != null ? manager.FirstName + " " + manager.LastName : string.Empty,
                             DepartmentName = d.Value,
                             ProjectName = p.ProjectName,
                             Status = r.Status,
                             ReasonForTravelling=r.ReasonForTraveling,
                             CreatedBy = u.CreatedBy,
                             CreatedDate = u.CreatedDate,
                             ModifiedBy = u.ModifiedBy,
                             ModifiedDate = u.ModifiedDate,
                             IsActive = u.IsActive
                      
                         }).ToList();

            return query;
        }

        public List<RequestViewModel> GetManagerRequestList(int id)
        {
            var query = (from r in _context.Requests
                         where r.IsActive == true &&  r.ManagerId == id && r.Status.ToLower()=="pending"
                         join u in _context.Users on r.UserId equals u.Id
                         join d in _context.CommonTypeReferences on u.DepartmentId equals d.Id
                         join p in _context.Projects on r.ProjectId equals p.Id
                         join m in _context.Users on r.ManagerId equals m.Id into managers
                         from manager in managers.DefaultIfEmpty()
                         select new RequestViewModel
                         {
                             Id = r.RequestId,
                             UserName = u.FirstName + " " + u.LastName,
                             ManagerName = manager != null ? manager.FirstName + " " + manager.LastName : string.Empty,
                             DepartmentName = d.Value,
                             ProjectName = p.ProjectName,
                             Status = r.Status,
                             ReasonForTravelling = r.ReasonForTraveling,
                             CreatedBy = u.CreatedBy,
                             CreatedDate = u.CreatedDate,
                             ModifiedBy = u.ModifiedBy,
                             ModifiedDate = u.ModifiedDate,
                             IsActive = u.IsActive
                         }).ToList();

            return query;
        }
        public List<RequestViewModel> GetHRAdminRequestList()
        {
            var query = (from r in _context.Requests
                         where r.IsActive == true && r.Status.ToLower()=="approved"
                         join u in _context.Users on r.UserId equals u.Id
                         join d in _context.CommonTypeReferences on u.DepartmentId equals d.Id
                         join p in _context.Projects on r.ProjectId equals p.Id
                         join m in _context.Users on r.ManagerId equals m.Id into managers
                         from manager in managers.DefaultIfEmpty()
                         select new RequestViewModel
                         {
                             Id = r.RequestId,
                             UserName = u.FirstName + " " + u.LastName,
                             ManagerName = manager != null ? manager.FirstName + " " + manager.LastName : string.Empty,
                             DepartmentName = d.Value,
                             ProjectName = p.ProjectName,
                             Status = r.Status,
                             ReasonForTravelling = r.ReasonForTraveling,
                             CreatedBy = u.CreatedBy,
                             CreatedDate = u.CreatedDate,
                             ModifiedBy = u.ModifiedBy,
                             ModifiedDate = u.ModifiedDate,
                             IsActive = u.IsActive
                         }).ToList();

            return query;
        }

        public RequestViewModel GetUserRequestDetail(int id)
        {
            var query = (from r in _context.Requests
                         where r.IsActive == true && r.RequestId == id
                         join u in _context.Users on r.UserId equals u.Id
                         join d in _context.CommonTypeReferences on u.DepartmentId equals d.Id
                         join p in _context.Projects on r.ProjectId equals p.Id
                         join m in _context.Users on r.ManagerId equals m.Id into managers
                         from manager in managers.DefaultIfEmpty()
                         select new RequestViewModel
                         {
                             Id = r.RequestId,
                             UserName = u.FirstName + " " + u.LastName,
                             ManagerName = manager != null ? manager.FirstName + " " + manager.LastName : string.Empty,
                             DepartmentName = d.Value,
                             ProjectName = p.ProjectName,
                             Status = r.Status,
                             ReasonForTravelling = r.ReasonForTraveling,
                             CreatedBy = u.CreatedBy,
                             CreatedDate = u.CreatedDate,
                             ModifiedBy = u.ModifiedBy,
                             ModifiedDate = u.ModifiedDate,
                             IsActive = u.IsActive,
                         }).ToList();

            return query.FirstOrDefault();

        }




    }
    }


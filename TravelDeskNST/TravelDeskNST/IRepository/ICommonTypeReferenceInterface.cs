using TravelDeskNST.Model;

namespace TravelDeskNST.IRepository
{
    public interface ICommonTypeReferenceInterface
    {
        public List<CommonTypeReference> GetRoles();
        public List<CommonTypeReference> GetDepartment();
        public List<CommonTypeReference> GetMealPreference();
        public List<CommonTypeReference> GetNoOfMeals();

        public List<CommonTypeReference> GetCity();
    }
}

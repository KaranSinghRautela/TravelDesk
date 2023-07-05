using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelDeskNST.Context;
using TravelDeskNST.IRepository;
using TravelDeskNST.Model;

namespace TravelDeskNST.Repository
{
    public class CommonTypeReferenceRepository : ICommonTypeReferenceInterface
    {
        TravelDbContext _context;
        public CommonTypeReferenceRepository(TravelDbContext context)
        {
            _context = context;
            
        }
        public List<CommonTypeReference> GetDepartment()
        {
            return _context.CommonTypeReferences.Where(x=>x.IsActive==true && x.Type== "Department").ToList();  
        }

        public List<CommonTypeReference> GetMealPreference()
        {
            return _context.CommonTypeReferences.Where(x => x.IsActive == true && x.Type == "MealPreference").ToList();
        }
        

        public List<CommonTypeReference> GetRoles()
        {
            return _context.CommonTypeReferences.Where(x => x.IsActive == true && x.Type == "Role" && x.Value!="Admin").ToList();
        }

        public List<CommonTypeReference> GetNoOfMeals()
        {
            return _context.CommonTypeReferences.Where(x => x.IsActive == true && x.Type == "NoOfMeals").ToList();
        }
        public List<CommonTypeReference> GetCity() 
        {
            return _context.CommonTypeReferences.Where(x => x.IsActive == true && x.Type == "City").ToList();
        }
    }
}

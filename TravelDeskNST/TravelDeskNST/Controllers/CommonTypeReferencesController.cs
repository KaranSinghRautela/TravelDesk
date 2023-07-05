using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelDeskNST.Context;
using TravelDeskNST.IRepository;
using TravelDeskNST.Model;
using TravelDeskNST.Models;

namespace TravelDeskNST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommonTypeReferencesController : ControllerBase
    {
        private readonly TravelDbContext _context;
        ICommonTypeReferenceInterface _repo;

        public CommonTypeReferencesController(TravelDbContext context, ICommonTypeReferenceInterface commonTypeInterface)
        {
            _context = context;
            _repo = commonTypeInterface;
        }

        // GET: api/CommonTypeReferences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommonTypeReference>>> GetCommonTypeReferences()
        {
          if (_context.CommonTypeReferences == null)
          {
              return NotFound();
          }
            return await _context.CommonTypeReferences.ToListAsync();
        }

        [HttpGet("role")]
        public virtual ActionResult GetRoles()
        {
            if (_repo.GetRoles().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return Ok(_repo.GetRoles().Select(t => new { t.Id, t.Value }).ToList());
            }
        }

        // GET: api/CommonTypeReferences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommonTypeReference>> GetCommonTypeReference(int id)
        {
          if (_context.CommonTypeReferences == null)
          {
              return NotFound();
          }
            var commonTypeReference = await _context.CommonTypeReferences.FindAsync(id);

            if (commonTypeReference == null)
            {
                return NotFound();
            }

            return commonTypeReference;
        }

        [HttpGet("Department")]
        public ActionResult GetDepartment()
        {
            if (_repo.GetDepartment().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return Ok(_repo.GetDepartment().Select(t => new { t.Id, t.Value }).ToList());
            }
        }
        [HttpGet("MealPreference")]
        public ActionResult GetMealPreference()
        {
            if (_repo.GetMealPreference().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return Ok(_repo.GetMealPreference().Select(t => new { t.Id, t.Value }).ToList());
            }
        }
        [HttpGet("NoOfMeals")]
        public ActionResult GetNoOfMeals()
        {
            if (_repo.GetNoOfMeals().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return Ok(_repo.GetNoOfMeals().Select(t => new { t.Id, t.Value }).ToList());
            }
        }
        [HttpGet("City")]
        public ActionResult GetCity()
        {
            if (_repo.GetCity().ToList().Count == 0)
            {
                return NotFound("There are no records");
            }
            else
            {
                return Ok(_repo.GetCity().Select(t => new { t.Id, t.Value }).ToList());
            }
        }


    }
}

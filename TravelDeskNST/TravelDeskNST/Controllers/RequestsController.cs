using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;
using TravelDeskNST.Context;
using TravelDeskNST.IRepository;
using TravelDeskNST.Model;
using TravelDeskNST.Models;

namespace TravelDeskNST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class RequestsController : ControllerBase
    {
        private readonly TravelDbContext _context;
        private readonly IRequestInterface _req;

        public RequestsController(TravelDbContext context, IRequestInterface req)
        {
            _context = context;
            _req = req;
        }

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
          if (_context.Requests == null)
          {
              return NotFound();
          }
            return await _context.Requests.Where(x=>x.IsActive==true).ToListAsync();
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
          if (_context.Requests == null)
          {
              return NotFound();
          }
            var request = await _context.Requests.FindAsync(id);

            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // PUT: api/Requests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequest(int id, Request request)
        {
            if (id != request.RequestId)
            {
                return BadRequest();
            }

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Requests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(Request request)
        {
          if (_context.Requests == null)
          {
              return Problem("Entity set 'TravelDbContext.Requests'  is null.");
          }
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRequest", new { id = request.RequestId }, request);
        }

        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            if (_context.Requests == null)
            {
                return NotFound();
            }
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }
            request.IsActive = false;
            //_context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RequestExists(int id)
        {
            return (_context.Requests?.Any(e => e.RequestId == id)).GetValueOrDefault();
        }

        [HttpGet("user/{id}")]
        public ActionResult<List<RequestViewModel>> GetUserRequestList(int id) {
            return Ok(_req.GetUserRequestList(id));
        }

        [HttpGet("manager/{id}")]
        public ActionResult<List<RequestViewModel>> GetManagerRequestList(int id)
        {
            return Ok(_req.GetManagerRequestList(id));
        }

        [HttpGet("hradmin/")]
        public ActionResult<List<RequestViewModel>> GetHRAdminRequestList()
        {
            return Ok(_req.GetHRAdminRequestList());
        }

        [HttpGet("detail/{id}")]
        public ActionResult<List<RequestViewModel>> GetUserRequestDetail(int id)
        {
            return Ok(_req.GetUserRequestDetail(id));
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelDeskNST.Context;
using TravelDeskNST.Model;

namespace TravelDeskNST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransportDetailsController : ControllerBase
    {
        private readonly TravelDbContext _context;

        public TransportDetailsController(TravelDbContext context)
        {
            _context = context;
        }

        // GET: api/TransportDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransportDetails>>> GetTransportDetails()
        {
          if (_context.TransportDetails == null)
          {
              return NotFound();
          }
            return await _context.TransportDetails.ToListAsync();
        }

        // GET: api/TransportDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransportDetails>> GetTransportDetails(int id)
        {
          if (_context.TransportDetails == null)
          {
              return NotFound();
          }
            var transportDetails = await _context.TransportDetails.FindAsync(id);

            if (transportDetails == null)
            {
                return NotFound();
            }

            return transportDetails;
        }

        // PUT: api/TransportDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransportDetails(int id, TransportDetails transportDetails)
        {
            if (id != transportDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(transportDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransportDetailsExists(id))
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

        // POST: api/TransportDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TransportDetails>> PostTransportDetails(TransportDetails transportDetails)
        {
          if (_context.TransportDetails == null)
          {
              return Problem("Entity set 'TravelDbContext.TransportDetails'  is null.");
          }
            _context.TransportDetails.Add(transportDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransportDetails", new { id = transportDetails.Id }, transportDetails);
        }

        // DELETE: api/TransportDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransportDetails(int id)
        {
            if (_context.TransportDetails == null)
            {
                return NotFound();
            }
            var transportDetails = await _context.TransportDetails.FindAsync(id);
            if (transportDetails == null)
            {
                return NotFound();
            }

            _context.TransportDetails.Remove(transportDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransportDetailsExists(int id)
        {
            return (_context.TransportDetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

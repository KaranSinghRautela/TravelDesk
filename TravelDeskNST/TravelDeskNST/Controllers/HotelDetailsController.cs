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
    public class HotelDetailsController : ControllerBase
    {
        private readonly TravelDbContext _context;

        public HotelDetailsController(TravelDbContext context)
        {
            _context = context;
        }

        // GET: api/HotelDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelDetail>>> GetHotelDetails()
        {
          if (_context.HotelDetails == null)
          {
              return NotFound();
          }
            return await _context.HotelDetails.ToListAsync();
        }

        // GET: api/HotelDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HotelDetail>> GetHotelDetail(int id)
        {
          if (_context.HotelDetails == null)
          {
              return NotFound();
          }
            var hotelDetail = await _context.HotelDetails.FindAsync(id);

            if (hotelDetail == null)
            {
                return NotFound();
            }

            return hotelDetail;
        }

        // PUT: api/HotelDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotelDetail(int id, HotelDetail hotelDetail)
        {
            if (id != hotelDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(hotelDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelDetailExists(id))
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

        // POST: api/HotelDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HotelDetail>> PostHotelDetail(HotelDetail hotelDetail)
        {
          if (_context.HotelDetails == null)
          {
              return Problem("Entity set 'TravelDbContext.HotelDetails'  is null.");
          }
            _context.HotelDetails.Add(hotelDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHotelDetail", new { id = hotelDetail.Id }, hotelDetail);
        }

        // DELETE: api/HotelDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotelDetail(int id)
        {
            if (_context.HotelDetails == null)
            {
                return NotFound();
            }
            var hotelDetail = await _context.HotelDetails.FindAsync(id);
            if (hotelDetail == null)
            {
                return NotFound();
            }

            _context.HotelDetails.Remove(hotelDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HotelDetailExists(int id)
        {
            return (_context.HotelDetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

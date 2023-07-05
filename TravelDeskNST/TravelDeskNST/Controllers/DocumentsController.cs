using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
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

    public class DocumentsController : ControllerBase
    {
        private readonly TravelDbContext _context;



        public DocumentsController(TravelDbContext context)
        {
            _context = context;
        }



        // GET: api/Documents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            if (_context.Documents == null)
            {
                return NotFound();
            }
            return await _context.Documents.ToListAsync();
        }



        // GET: api/Documents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocument(int id)
        {
            if (_context.Documents == null)
            {
                return NotFound();
            }
            var document = await _context.Documents.FindAsync(id);



            if (document == null)
            {
                return NotFound();
            }



            return document;
        }



        // PUT: api/Documents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocument(int id, Document document)
        {
            if (id != document.Id)
            {
                return BadRequest();
            }



            _context.Entry(document).State = EntityState.Modified;



            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(id))
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

        //public class A
        //{
        //    int id;
        //    string name;
        //}

        [HttpPost("upload")]
        public IActionResult Upload([FromForm] Document document)
        {
            string sFolderPath;



            sFolderPath = "C:/Documents";
            var pathToSave = sFolderPath + "\\user";
            if (Request.Form.Files.Count > 0)
            {
                foreach (var temp in Request.Form.Files)
                {
                    var file = temp;
                    Directory.CreateDirectory(sFolderPath + "\\user");
                    //foreach (var file in certificates)
                    //{
                    if (file.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);
                        using (FileStream stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        // }    
                    }
                }
                return Ok();



            }
            else
            {
                return BadRequest();
            }
        }



        // DELETE: api/Documents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            if (_context.Documents == null)
            {
                return NotFound();
            }
            var document = await _context.Documents.FindAsync(id);
            if (document == null)
            {
                return NotFound();
            }



            _context.Documents.Remove(document);
            await _context.SaveChangesAsync();



            return NoContent();
        }



        private bool DocumentExists(int id)
        {
            return (_context.Documents?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

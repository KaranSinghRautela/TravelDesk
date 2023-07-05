using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using TravelDeskNST.Context;
using TravelDeskNST.Controllers;
using TravelDeskNST.IRepository;
using TravelDeskNST.Repository;
using TravelDeskNST.Model;
using System.Net;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace TravelDeskTesting
{

    //internal class MockIOwnerRepository
    //{
    //    public static Mock<CommonTypeReferenceRepository> GetMock()
    //    {
    //        var mock = new Mock<CommonTypeReferenceRepository>();

    //        var owners = new List<CommonTypeReference>()
    //    {
    //        new CommonTypeReference()
    //        {
    //            Id = 0,
    //            Type = "Role",
    //            Value ="Admin",
    //            CreatedBy="aa",
    //            CreatedDate= DateTime.Now

    //        }
    //    };
        
    //        // Set up

    //        return mock;
    //    }
    //}

    //public class Roles
    //{
    //    public int Id { get; set; }
    //    public string Role { get; set; }
    //}
    public class TodoMockData
    {
        static List<CommonTypeReference> list = new List<CommonTypeReference>();
        
            public static List<CommonTypeReference> GetList()
            {
           
            return list;
             
         }
        public static List<CommonTypeReference> GetLists()
        {
            var s = new List<CommonTypeReference>()
            {
                new CommonTypeReference { Id=1, Type="s", Value="type", CreatedBy="Ajy", CreatedDate=DateTime.Now,IsActive = true },
                new CommonTypeReference { Id=1, Type="s", Value="type", CreatedBy="Ajy", CreatedDate=DateTime.Now,IsActive = true },
                new CommonTypeReference { Id=1, Type="s", Value="type", CreatedBy="Ajy", CreatedDate=DateTime.Now,IsActive = true },
                new CommonTypeReference { Id=1, Type="s", Value="type", CreatedBy="Ajy", CreatedDate=DateTime.Now,IsActive = true }
                };
            return s;

        }

    }

        public class Tests
        {
            TravelDeskNST.Context.TravelDbContext dbContext;
            TravelDeskNST.Controllers.CommonTypeReferencesController commonTypeReference = null;
            TravelDeskNST.IRepository.ICommonTypeReferenceInterface commonType;
            //TravelDeskNST.Context.TravelDbContext context = null;
            [SetUp]
            public void Setup()
            {
            }
        //[Test]
    //    public void Test()
    //    {
    //        ////TravelDeskNST.Repository.CommonTypeReferenceRepository commonTypeReference = null;
    //        //var todo = new Mock<TravelDbContext>();
    //        //todo.Setup(x=>x.CommonTypeReferences.ToList().Count()).Returns(10);

    //        //var result = new CommonTypeReferenceRepository(todo.Object);

    //        //Assert.Equals(10, result);

    //        var mock = MockIOwnerRepository.GetMock();
    //         mock.Setup(m => m.GetRoles())
    //.Returns(() =>  TodoMockData.GetLists());
    //        var sut = new CommonTypeReferenceRepository(mock.Object);
    //        Assert
    //    }

        //[Test]
        //    public void CommonTypeReferenceControllerTest1()
        //    {
        //        //List<CommonTypeReference> list = new List<CommonTypeReference>();
        //        var todo = new Mock<ICommonTypeReferenceInterface>();
        //        todo.Setup(x => x.GetRoles()).Returns(TodoMockData.GetList());
        //        var sut = new CommonTypeReferencesController(todo.Object);
        //        var result = (NotFoundObjectResult)sut.GetRoles();
        //        //result.StatusCode.Equals(200);
        //        Assert.AreEqual(404, result.StatusCode);

        //    }
        //    [Test]
        //    public void CommonTypeReferenceControllerTest2()
        //    {
        //        var todo=new Mock<ICommonTypeReferenceInterface>();
        //        todo.Setup(x=>x.GetDepartment()).Returns(TodoMockData.GetList());
        //        var sut =new CommonTypeReferencesController (todo.Object);
        //        var result=(NotFoundObjectResult)sut.GetDepartment();
        //        Assert.AreEqual(404, result.StatusCode);
        //    }
        //[Test]
        //    public void CommonTypeReferenceControllerTest3()
        //    {
        //        var todo = new Mock<ICommonTypeReferenceInterface>();
        //        todo.Setup(x => x.GetCity()).Returns(TodoMockData.GetList());
        //        var sut = new CommonTypeReferencesController(todo.Object);
        //        var result = (NotFoundObjectResult)sut.GetCity();
        //        Assert.AreEqual(404, result.StatusCode);
        //    }
        //[Test]
        //    public void CommonTypeReferenceControllerTest4()
        //    {
        //        var todo = new Mock<ICommonTypeReferenceInterface>();
        //        todo.Setup(x => x.GetMealPreference()).Returns(TodoMockData.GetList());
        //        var sut = new CommonTypeReferencesController(todo.Object);
        //        var result = (NotFoundObjectResult)sut.GetMealPreference();
        //        Assert.AreEqual(404, result.StatusCode);
        //    }
        //[Test]
        //    public void CommonTypeReferenceControllerTest5()
        //    {
        //        var todo = new Mock<ICommonTypeReferenceInterface>();
        //        todo.Setup(x => x.GetNoOfMeals()).Returns(TodoMockData.GetList());
        //        var sut = new CommonTypeReferencesController(todo.Object);
        //        var result = (NotFoundObjectResult)sut.GetNoOfMeals();
        //        Assert.AreEqual(404, result.StatusCode);
        //    }
    }
}

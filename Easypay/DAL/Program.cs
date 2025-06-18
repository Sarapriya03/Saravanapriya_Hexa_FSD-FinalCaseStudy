using DAL.DataAccess;
using DAL.Models;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    class Program
    {
        public static void Main(string[] args)
        {
            UserRepo repo = new UserRepo();
            var newUser = repo.AddUser(new User { UserId = 1, Email = "user1@gmail.com", Password = "user1@123", Role = "Admin" });
            Console.WriteLine(newUser != null ? "User is Added" : "Error");
        }
    }
}

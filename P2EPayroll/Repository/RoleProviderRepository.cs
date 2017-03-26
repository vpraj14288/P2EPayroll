using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using P2EPayroll.Models;

namespace P2EPayroll.Repository
{
    public class RoleProviderRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["AppConnectionString"].ToString());
        public string[] GetEmployeeScreens(string UserName)
        {
            List<string> userScreens = new List<string>();
            DynamicParameters param = new DynamicParameters();
            param.Add("@pRoleID", HttpContext.Current.Session["RoleID"].ToString());
            List<User> objuser = con.Query<User>("[dbo].[spP2EPayroll_GetRoleScreens]", param, commandType: CommandType.StoredProcedure).ToList();
            for (int i = 0; i < objuser.Count; i++)
            {
                userScreens.Add(objuser[i].ScreenName.ToString());
            }
            return userScreens.ToArray();
        }
    }
}
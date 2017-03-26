using P2EPayroll.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace P2EPayroll.Controllers
{
    public class RegistrationController : Controller
    {
        private readonly ILoginsRepository _loginsRepository;

        public RegistrationController(ILoginsRepository loginsRepository)
        {
            this._loginsRepository = loginsRepository;
        }

        // GET: Registration
        public ActionResult Index()
        {
            return View();
        }

        public string GetUserList()
        {
            HttpPostedFileBase file = Request.Files[0];
            BinaryReader b = new BinaryReader(file.InputStream);
            byte[] binData = b.ReadBytes(file.ContentLength);
            return JsonConvert.SerializeObject(binData);
        }

        public string BusinessRegister(string Name, string EmailID, string Password, string PhoneNo1, string Designation, string CompanyName, string Image)
        {
            IList lstresult = _loginsRepository.BusinessRegister(Name,EmailID,Password,PhoneNo1,Designation,CompanyName, Image);
            return JsonConvert.SerializeObject(lstresult);
        }

        public string GetForgotPassword(string EmailID)
        {
            IList lstresult = _loginsRepository.GetForgotPassword(EmailID);
            return JsonConvert.SerializeObject(lstresult);
        }
    }
}
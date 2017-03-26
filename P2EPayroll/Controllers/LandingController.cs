using P2EPayroll.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using P2EPayroll.Repository;
using System.Collections;
using Newtonsoft.Json;

namespace P2EPayroll.Controllers
{
    [SessionTimeOutFilter]
    public class LandingController : Controller
    {
        private readonly ILoginsRepository _loginsRepository;

        public LandingController(ILoginsRepository loginsRepository)
        {
            this._loginsRepository = loginsRepository;
        }

        // GET: Landing
        public ActionResult Landing()
        {
            if (Session["RoleID"].ToString() == "1")
            {
                return Redirect("/Home/Index");
            }
            else
            {
                return Redirect("/Home/Index");
            }
        }

        public string SaveUserRegister(string EmailID)
        {
            IList lstresult = _loginsRepository.SaveUserRegisterLanding(EmailID);
            return JsonConvert.SerializeObject(lstresult);
        }
    }
}
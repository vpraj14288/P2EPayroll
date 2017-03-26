using P2EPayroll.Models;
using P2EPayroll.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing;
using System.Drawing.Imaging;

namespace P2EPayroll.Controllers
{
    [SessionTimeOutFilter]
    public class UsersController : Controller
    {
        public Guid RandomID { get; set; }
        private readonly IUsersRepository _usersRepository;
        private readonly IUserIdentityRepository _userIdentityRepository;
        // GET: Users
        public UsersController(IUsersRepository usersRepository, IUserIdentityRepository userIdentityRepository)
        {
            this._usersRepository = usersRepository;
            this._userIdentityRepository = userIdentityRepository;
        }
        public ActionResult UserProfile()
        {
            return View();
        }
        public ActionResult ChangePassword()
        {
            return View();
        }

        public string GetUserProfile()
        {
            IList lstresult = _usersRepository.GetUserProfile(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

        private ImageCodecInfo GetImageCoeInfo(string mimeType)
        {
            ImageCodecInfo[] codes = ImageCodecInfo.GetImageEncoders();
            for (int i = 0; i < codes.Length; i++)
            {
                if (codes[i].MimeType == mimeType)
                {
                    return codes[i];
                }
            }
            return null;
        }

        [HttpPost]
        public string UploadImage()
        {

            ImageCompress imgCompress = ImageCompress.GetImageCompressObject;
            HttpPostedFileBase file = Request.Files[0];
            Random rand = new Random();
            string ext = Path.GetExtension(file.FileName);
            int guid = rand.Next();
            string phyiscalPath = Server.MapPath("/Upload/Profiles/" + guid.ToString() + ext.ToString());
            file.SaveAs(phyiscalPath);
            imgCompress.GetImage = new System.Drawing.Bitmap(file.InputStream);
            imgCompress.Height = 60;
            imgCompress.Width = 128;
            imgCompress.Save(guid.ToString() + ext.ToString(), Server.MapPath("/Upload/Profiles/"));
            
            TempData["Profile"] = "/Upload/Profiles/" + guid.ToString() + ext.ToString();
            return JsonConvert.SerializeObject("/Upload/Profiles/" + guid.ToString() + ext.ToString());
        }

        public string GetUploadImage(string Image)
        {

            IList lstresult = _usersRepository.UploadUserImage(_userIdentityRepository.UserID, Image, TempData["Profile"].ToString());
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetImage()
        {
            IList lstresult = _usersRepository.GetImage(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string SaveChangePassword(string OldPassword, string Password)
        {
            IList lstresult = _usersRepository.ChangePassword(OldPassword, Password, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

        public string SaveUserDetails(UsersProfile UserProfileDetails)
        {
            DataTable dtUserProfileDetails = ToDataTable(UserProfileDetails);
            IList lstresult = _usersRepository.SaveUserDetails(dtUserProfileDetails, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string SaveIndividualUserDetails(IndividualUsersProfile UserProfileDetails)
        {
            DataTable dtUserProfileDetails = ToDataTable(UserProfileDetails);
            IList lstresult = _usersRepository.SaveIndividualUserDetails(dtUserProfileDetails, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

        public static DataTable ToDataTable(object o)
        {
            DataTable dt = new DataTable("OutputData");

            DataRow dr = dt.NewRow();
            dt.Rows.Add(dr);

            o.GetType().GetProperties().ToList().ForEach(f =>
            {
                f.GetValue(o, null);
                dt.Columns.Add(f.Name, f.PropertyType);
                dt.Rows[0][f.Name] = f.GetValue(o, null);
            });

            return dt;
        }
    }
}
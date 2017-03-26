using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc5;
using P2EPayroll.Repository;

namespace P2EPayroll
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IUsersRepository, UsersRepository>();
            container.RegisterType<IRegisterRepository, RegisterRepository>();
            container.RegisterType<IUserIdentityRepository, UserIdentityRepository>();
            container.RegisterType<ILoginsRepository, LoginsRepository>();
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}
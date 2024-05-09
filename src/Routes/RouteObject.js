console.log("routeobjectes");
export const RouteObjects = {
  // ===========USER============


  UserHome: '/',
  Userlogin: "/login",
  Register: "/signup",
  verification: "/verify/:token",
  ForgetPassword: "/forgotpass",
  OTP: "/otpverify",
  ResetPassword: "/newpass",
  UserProfile: "/profile",
  Destinations: "/destinations",


  // ===========AGENT============

  AgentLogin: "/agent/login",
  Agentverification:"/agent/verify/:token",
  AgentHome: "/agent/",
  AgentPlaces: "/agent/places",
  AgentActivites: "/agent/activites",
  Packages:'/agent/packages',
  Bookings:'/agent/booking',
  Sales:'/agent/sales',


  // // ===========ADMIN============
  AdminLogin: "/admin/login",
  Adminhome: "/admin/",
  Adminapproval: '/admin/approval',
  UserList: "/admin/users",
  Agentlist:'/admin/agents',
  Category: "/admin/category",
  destin:'/admin/destination'

};
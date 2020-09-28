const router = [
  {
    title: "控制台",
    icon: "index",
    key: "/index",
  },
  {
    title: "用户管理",
    icon: "laptop",
    key: "/index/user",
    subs: [
      { key: "/index/user/list", title: "用户列表", icon: "" },
      {
        key: "/index/user/addUser",
        title: "添加用户",
        icon: "",
        subs: [
          { key: "/index/user/addUser/person", title: "个人中心", icon: "" },
          { key: "/index/user/addUser/work", title: "工作总结", icon: "" },
        ],
      },
    ],
  },
  {
    title: "部门管理",
    icon: "bars",
    key: "/index/navigation",
    subs: [
      { key: "/index/navigation/dropdown", title: "部门列表", icon: "" },
      { key: "/index/navigation/menu", title: "添加部门", icon: "" },
    ],
  },
  {
    title: "职位管理",
    icon: "job",
    key: "/index/job",
    subs: [
      { key: "/index/job/basic-form", title: "职位列表", icon: "" },
      { key: "/index/job/step-form", title: "添加职位", icon: "" },
    ],
  },
  {
    title: "请假",
    icon: "info-circle-o",
    key: "/index/leave",
  },
  {
    title: "加班",
    icon: "info-circle-o",
    key: "/index/workOvertime",
  },
];
export default router;

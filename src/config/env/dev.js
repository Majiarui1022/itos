// const winchaingroupApi = "https://www.bmeauto.cn";
const winchaingroupApi = "http://kungfunion.com/itos/";


module.exports = {


  //全部通知消息
  NewsTit:winchaingroupApi + 'v1_0/messages/notification/',       //全部通知信息
  ChangeNewsStatus:winchaingroupApi + 'v1_0/messages/set/read/',               //消息改为已读
  RemoveNews:winchaingroupApi + 'v1_0/messages/notification/',             //消息删除
  NewsLength:winchaingroupApi+ 'v1_0/messages/count/',            //消息条数
  NewsChu:winchaingroupApi + 'commander/message/process/',                    //消息处理
  getMessageTit : winchaingroupApi + 'v1_0/messages/category/unread/count/',      //获取消息列表

  //登录
  LoginUser:winchaingroupApi + 'v1_0/login/',           //用户登录

  //任务管理
  TaskList:winchaingroupApi + 'v1_0/tasks/tasks/',         //获取所有的任务列表
  UnfinishedProjects:winchaingroupApi + 'commander/tasks/projects/?status=',       //全部已创建未完成项目
  UnfinishedControllers:winchaingroupApi + 'commander/tasks/controllers/?status=',       //全部已创建未完成项目
  UnfinishedModules:winchaingroupApi + 'commander/tasks/modules/?status=',       //全部已创建未完成项目
  SelectModule:winchaingroupApi + 'commander/tasks/update_modules/',       //全部已创建未完成项目
  ScriptList:winchaingroupApi + 'commander/tasks/task_script/',                //脚本选择
  ScriptSearch:winchaingroupApi + 'commander/tasks/scripts/',                        //脚本搜索
  ModuleListGetTast:winchaingroupApi + 'commander/tasks/modules/',                   //获取模块详情
  checktast:winchaingroupApi + 'commander/tasks/check_task/',                              //审核当前任务
  sblistConfir : winchaingroupApi + 'v1_0/tasks/optional/equipments/',                //设备列表
  mkcategory : winchaingroupApi + 'v1_0/modules/category/',                           //全部模块类别
  modulesTaskList : winchaingroupApi + 'v1_0/tasks/optional/modules/',                //任务可选模块
  controllersList : winchaingroupApi + 'v1_0/tasks/optional/controllers/',            //控制器列表
  scriptTaskList : winchaingroupApi + 'v1_0/tasks/optional/scripts/',                 //任务可选脚本列表
  comTask : winchaingroupApi + 'v1_0/tasks/submitted/',                                      //任务提交

  shtask : winchaingroupApi + 'v1_0/tasks/check/',        //审核任务
  taskchann : winchaingroupApi + 'v1_0/tasks/channel/setting/',       //任务下通道配置的脚本信息
  closetaskL : winchaingroupApi + 'v1_0/tasks/cancel/check/',       //撤销审核

  //脚本配置
  ScriptsConfig:winchaingroupApi+ 'commander/tasks/scripts_list/',              //脚本配置
  TaskModuleList:winchaingroupApi + 'commander/tasks/modules_list/',           //任务模块列表
  TaskScriptModule:winchaingroupApi + 'commander/tasks/orders_modules/?',        //任务下的指令对应的模块
  ChangeModule:winchaingroupApi + 'commander/tasks/create/orders_modules/',         //修改任务下指令模块

  //人员管理
  AddUser:winchaingroupApi + 'v1_0/users/register/',    //全部banner
  UserList:winchaingroupApi + 'v1_0/users/users/',      //全部人员列表
  UserInfo:winchaingroupApi + 'users/users/',       //个人详情    修改用户  删除用户
  UserQuan:winchaingroupApi + 'commander/permission/groups/',   //全部分组
  UserSelectQ:winchaingroupApi + 'commander/permission/user_group/',   //全部分组
  AllQuan:winchaingroupApi + 'commander/permission/permissions/',   //全部分组
  UserQuanxian:winchaingroupApi + 'commander/permission/user_permission/',   //全部分组
  setPassReq : winchaingroupApi + 'v1_0/users/password/',        //修改密码
  erportperson : winchaingroupApi + 'v1_0/users/export/',         //导出人员
  importperson : winchaingroupApi + 'v1_0/users/import/',         //导入人员

  //概况
  Runproject:winchaingroupApi + 'commander/general/ongoing_project/',
  Runtask:winchaingroupApi + 'commander/general/ongoing_task/',
  myscript:winchaingroupApi + 'commander/general/my_scripts/',
  Runcount:winchaingroupApi + 'commander/general/scripts/copied_count/',
  TaskRundu:winchaingroupApi + 'commander/general/task_process/',              //任务进度

  //概况  新接口
  infoSet : winchaingroupApi + 'v1_0/general/info_set/',
  controllerRates : winchaingroupApi + 'v1_0/general/controller_rates/',      //控制器使用率




  //脚本管理
  ScripSystemtList:winchaingroupApi + 'commander/scripts/page_system/',      // 获取脚本管理系统列表
  AddScriptList:winchaingroupApi + 'v1_0/scripts/scripts/',             //新增脚本管理
  CopyScript:winchaingroupApi + 'v1_0/scripts/copy/',             //复制脚本
  GetSteamScriptNum:winchaingroupApi + 'commander/scripts/scripts_count/?page_system=',                      //页面系统下脚本数量

  //项目管理
  GetProList:winchaingroupApi + 'v1_0/projects/projects/',        //获取项目管理列表
  GetOnecPro:winchaingroupApi + 'v1_0/projects/projects/',               //获取某个项目
  GetSystem:winchaingroupApi + 'v1_0/projects/page_system/',            //获取所有系统
  OkProJectY:winchaingroupApi + 'v1_0/projects/finish/project/',        //完成某个项目

  //控制器管理
  GetControllerList:winchaingroupApi + 'v1_0/controllers/controllers/',     //获取全部控制器列表
  NewsController:winchaingroupApi + 'commander/controllers/controllers/',              //获取全部控制器列表
  SubsetsController:winchaingroupApi + 'commander/controllers/controller_subsets/?controller=',  //获取某个控制器的子设备
  ChangeController:winchaingroupApi + 'v1_0/controllers/controllers/',  //创建控制器  修改控制器 查看控制器
  allLocation : winchaingroupApi + 'v1_0/users/location/',               ///所有位置信息
  kzqwhhf : winchaingroupApi + 'v1_0/controllers/maintain/',       //控制器维护 恢复

  //模块管理
  ModuleList:winchaingroupApi + 'v1_0/modules/modules/',           //所有模块列表
  ModuleInfo:winchaingroupApi + 'v1_0/modules/modules/',           //所有模块列表
  Allmodulecategories:winchaingroupApi + 'commander/modules/module_categories/',           //所有模块类别
  WeiSelectQ:winchaingroupApi + 'commander/permission/group_permissions/',                //组内可用权限
  testModule:winchaingroupApi + 'commander/modules/test_module/',                 //检测模块

  //大屏管理
  BigScreenList:winchaingroupApi + 'commander/screen/control/',                           //所有的大屏列表
  ChangeZhiBig:winchaingroupApi + 'commander/screen/select/large_screen/',                //设定投屏内容为指挥官的大屏



  //大屏展示
  BigShowScreen:winchaingroupApi + 'commander/screen/controllers_info/',                    //大屏展示控制器信息
  TaskProgress:winchaingroupApi + 'commander/screen/progress/',                    //大屏任务进度
  ModuleRate:winchaingroupApi + 'v1_0/general/module_rates/',                    //模块使用率
  warringMessage:winchaingroupApi + 'commander/screen/warning_message/',                    //报警信息
  TitMiddle:winchaingroupApi + 'commander/screen/display/all_data/',                    //8参数


  //碳罐配置脚本
  deployScript:winchaingroupApi + 'commander/scripts/sequences/',           //全部波特率
  ScriptAllPart:winchaingroupApi + 'commander/scripts/parts/?script=',      //脚本下全部Part
  ChangePartName:winchaingroupApi + 'commander/scripts/parts/',             //修改Part名称
  GetPartOrder:winchaingroupApi + 'commander/scripts/orders/?part=',               //Part下的全部指令
  CreateOrder:winchaingroupApi + 'commander/scripts/orders/',                   //创建指令
  GetTypeList:winchaingroupApi + 'commander/scripts/order_type/',             //全部指令类型


  //时序配置
  AllTime:winchaingroupApi + 'commander/scripts/sequence_parts/',            //全部part时序
  AllSequence_Part:winchaingroupApi + 'commander/scripts/compose_parts/',       //全部Part组合


  // DBC解析
  DBCAnalysis:winchaingroupApi + 'carbon_tank/scripts/ctt_data/',             //展示所有报文
  SeeAllAnarule:winchaingroupApi + 'carbon_tank/scripts/ana_rule/',                 //查看全部解析规则
  ParseResult:winchaingroupApi + 'carbon_tank/parse_result/',           //解析数据
  ExportDbcFile:winchaingroupApi + 'carbon_tank/scripts/export_dbc_file/1/',            //导出DBC文件



  //设备管理
  sblist : winchaingroupApi + 'v1_0/equipments/equipments/',                //全部设备



  //权限管理
  createqx : winchaingroupApi + 'v1_0/users/groups/',             //创建权限组

  //位置管理
  locationset : winchaingroupApi + 'v1_0/users/location/',          //全部位置管理
  allsbleibie : winchaingroupApi + 'v1_0/equipments/category/',     //全部设备类别


  selectModuleL : winchaingroupApi + 'v1_0/equipments/selectable/',     //创建设备可选模块


  qxpzlist : winchaingroupApi + 'v1_0/users/total/permissions/',
  qxsuc : winchaingroupApi + 'v1_0/users/groups/',
  qzchange : winchaingroupApi + 'v1_0/users/permissions/',

  selectyh : winchaingroupApi + 'v1_0/users/user/groups/',        //查询用户下所有权限


  SendPhoneCode : winchaingroupApi + 'v1_0/users/codes/',         //发送手机验证码
  ForgetPass : winchaingroupApi + 'v1_0/users/forget/',           //忘记密码

  
}

/*
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as dept from './moudules/dept'
import * as role from './moudules/role'
import * as menu from './moudules/menu'
import * as dict from './moudules/dict'
import * as log from './moudules/log'
import * as back from './moudules/back'
import * as sys from './moudules/sys'
import * as recipe from './moudules/recipe'
import * as pharmacist from './moudules/pharmacist'
import * as set from './moudules/set'
import * as workload from './moudules/workload'


// 默认全部导出
export default {
  login,
  user,
  dept,
  role,
  menu,
  dict,
  back,
  log,
  sys,
  recipe,
  pharmacist,
  set,
  workload
}

/**
 * Created by zhong on 2017/10/24.
 *
 * (resolve) =>{require(['../components/test.vue'],resolve)}
 *
 */
import Vue from 'vue'
import store from './vuex'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义组件
const short = (resolve) => {require(['./pages/short.vue'],resolve)}
const home = (resolve) => {require(['./pages/home/home.vue'],resolve)}
// 设置
const jurisdiction = (resolve) => {require(['./pages/setup/jurisdiction.vue'],resolve)}
const integral = (resolve) => {require(['./pages/setup/integral.vue'],resolve)}
const member = (resolve) => {require(['./pages/setup/member.vue'],resolve)}
const file = (resolve) => {require(['./pages/setup/file.vue'],resolve)}
const label = (resolve) => {require(['./pages/setup/label.vue'],resolve)}
//登陆
const login = (resolve) => {require(['./pages/login/login.vue'],resolve)}
//运营管理
const operPhone = (resolve) => {require(['./pages/operation/phone.vue'],resolve)}
// 404错误页面
const error = (resolve) => {require(['./pages/error.vue'],resolve)}
// 合同管理
const productAdd = (resolve) => {require(['./pages/contract/product/add.vue'],resolve)}
const productEdit = (resolve) => {require(['./pages/contract/product/edit.vue'],resolve)}
const productDetail = (resolve) => {require(['./pages/contract/product/detail.vue'],resolve)}
const productScan = (resolve) => {require(['./pages/contract/product/scan.vue'],resolve)}
const productPackage = (resolve) => {require(['./pages/contract/product-package.vue'],resolve)}
const contractTemplateAdd = (resolve) => {require(['./pages/contract/template/add.vue'],resolve)}
const contractTemplateEdit = (resolve) => {require(['./pages/contract/template/edit.vue'],resolve)}
const contractTemplateScan = (resolve) => {require(['./pages/contract/template/scan.vue'],resolve)}
const contractTemplate = (resolve) => {require(['./pages/contract/contract-template.vue'],resolve)}
const contractServices = (resolve) => {require(['./pages/contract/custom-services.vue'],resolve)}
const contractServiceDetail = (resolve) => {require(['./pages/contract/services/detail.vue'],resolve)}
// 内容管理
const contentValue = (resolve) => {require(['./pages/content/value.vue'],resolve)}
const valueAdd = (resolve) => {require(['./pages/content/value/add.vue'],resolve)}
const valueEdit = (resolve) => {require(['./pages/content/value/edit.vue'],resolve)}
const partner = (resolve) => {require(['./pages/content/partner.vue'],resolve)}
const partnerAdd = (resolve) => {require(['./pages/content/partner/add.vue'],resolve)}
const partnerEdit = (resolve) => {require(['./pages/content/partner/edit.vue'],resolve)}
const productFunc = (resolve) => {require(['./pages/content/product.vue'],resolve)}
const videoDemo = (resolve) => {require(['./pages/content/video.vue'],resolve)}
const videoDemoAdd = (resolve) => {require(['./pages/content/video/add.vue'],resolve)}
const videoDemoEdit = (resolve) => {require(['./pages/content/video/edit.vue'],resolve)}
const HotDocs = (resolve) => {require(['./pages/content/hotDocs.vue'],resolve)}
const HotDocsAdd = (resolve) => {require(['./pages/content/docs/add.vue'],resolve)}
const HotDocsEdit = (resolve) => {require(['./pages/content/docs/edit.vue'],resolve)}
const aboutUs = (resolve) => {require(['./pages/content/aboutUs.vue'],resolve)}
const news = (resolve) => {require(['./pages/content/news.vue'],resolve)}
const newsAdd = (resolve) => {require(['./pages/content/news/add.vue'],resolve)}
const newsEdit = (resolve) => {require(['./pages/content/news/edit.vue'],resolve)}
const comment= (resolve) => {require(['./pages/content/comment.vue'],resolve)}
const banner= (resolve) => {require(['./pages/content/banner.vue'],resolve)}
// 财务
const manage= (resolve) => {require(['./pages/financial/manage.vue'],resolve)}
const accounts= (resolve) => {require(['./pages/financial/accounts.vue'],resolve)}
const orders= (resolve) => {require(['./pages/financial/orders.vue'],resolve)}
const refund= (resolve) => {require(['./pages/financial/refund.vue'],resolve)}
const orderDetail= (resolve) => {require(['./pages/financial/order-detail.vue'],resolve)}
// 系统设置
const sysClassify= (resolve) => {require(['./pages/system/classify.vue'],resolve)}
const sysAccount= (resolve) => {require(['./pages/system/account.vue'],resolve)}
// 站内信
const messages= (resolve) => {require(['./pages/message/messages.vue'],resolve)}
const emails= (resolve) => {require(['./pages/message/emails.vue'],resolve)}
const texts= (resolve) => {require(['./pages/message/texts.vue'],resolve)}
// 用户管理
const usersList= (resolve) => {require(['./pages/users/user-list.vue'],resolve)}
const userDetail= (resolve) => {require(['./pages/users/user-detail.vue'],resolve)}
// 渠道管理
const channelSelf= (resolve) => {require(['./pages/channel/index.vue'],resolve)}
const channelUser= (resolve) => {require(['./pages/channel/user-index.vue'],resolve)}
const channelDetail= (resolve) => {require(['./pages/channel/detail.vue'],resolve)}
// 富文本编辑器，本地图片上传
const editorImg= (resolve) => {require(['./pages/common/editorImageUpload.vue'],resolve)}

// 创建路由器实例，配置路由规则
const routers = [
    {path: '/d/:shortId', component: short},
    {name:'login',path: '/login', component: login},
    {name: 'home',path:'/',component: home, meta: {keepAlive: true},
           children:[
           // 设置
               {name: 'jurisdiction',path:'/setup/jurisdiction',component: jurisdiction},
               {name: 'integral',path:'/setup/integral',component: integral},
               {name: 'member',path:'/setup/member',component: member},
               {name: 'file',path:'/setup/file',component: file},
               {name: 'label',path:'/setup/label',component: label},
               {name: 'operPhone',path:'/operation/operPhone',component: operPhone},
               // 系统管理—》分类
               {name: 'sysClassify',path:'/system/classify',component: sysClassify},
               {name: 'sysAccount',path:'/system/account',component: sysAccount},
               // 合同管理—》产品包
               {name: 'productPackage',path:'/contract/product',component: productPackage},
               {name: 'productAdd',path:'/contract/product/add',component: productAdd},
               {name: 'productEdit',path:'/contract/product/edit/:prodId',component: productEdit},
               {name: 'productDetail',path:'/contract/product/detail/:prodId',component: productDetail},
               {name: 'productScan',path:'/contract/product/scan/:prodId',component: productScan},
               // 合同管理—》价值定位
               {name: 'productAdd',path:'/contract/product/add',component: productAdd},
               {name: 'productEdit',path:'/contract/product/edit/:prodId',component: productEdit},
               {name: 'productDetail',path:'/contract/product/detail/:prodId',component: productDetail},
               {name: 'productScan',path:'/contract/product/scan/:prodId',component: productScan},
               // 合同管理—》模板
               {name: 'contractTemplateAdd',path:'/contract/template/:templateTyp/add',component: contractTemplateAdd},
               {name: 'contractTemplateEdit',path:'/contract/template/:templateTyp/edit/:templateId',component: contractTemplateEdit},
               {name: 'contractTemplateScan',path:'/contract/template/:templateTyp/scan/:templateId',component: contractTemplateScan},
               {name: 'contractTemplate',path:'/contract/template/:templateTyp',component: contractTemplate},
               // 合同管理—》定制服务
               {name: 'contractServices',path:'/contract/service',component: contractServices},
               {name: 'contractServiceDetail',path:'/contract/service/detail/:serviceId',component: contractServiceDetail},
               // 内容管理—》合作伙伴
               {name: 'partner',path:'/content/partner/:partnerTyp',component: partner},
               {name: 'partnerAdd',path:'/content/partner/:partnerTyp/add',component: partnerAdd},
               {name: 'partnerEdit',path:'/content/partner/:partnerTyp/edit/:partnerId',component: partnerEdit},
               // 内容管理—》产品功能
               {name: 'productFunc',path:'/content/product',component: productFunc},
               // 内容管理—》价值定位
               {name: 'contentValue',path:'/content/value',component: contentValue},
               {name: 'valueAdd',path:'/content/value/add',component: valueAdd},
               {name: 'valueEdit',path:'/content/value/edit/:valueId',component: valueEdit},
               // 内容管理—》演示视频
               {name: 'videoDemo',path:'/content/video',component: videoDemo},
               {name: 'videoDemoAdd',path:'/content/video/add',component: videoDemoAdd},
               {name: 'videoDemoEdit',path:'/content/video/edit/:videoId',component: videoDemoEdit},
               // 内容管理—》HotDocs代表用户
               {name: 'HotDocs',path:'/content/hotdocs',component: HotDocs},
               {name: 'HotDocsAdd',path:'/content/hotdocs/add',component: HotDocsAdd},
               {name: 'HotDocsEdit',path:'/content/hotdocs/edit/:hotDocsId',component: HotDocsEdit},
               // 内容管理—》关于我们
               {name: 'aboutUs',path:'/content/about',component: aboutUs},
               // 内容管理—》新闻管理
               {name: 'news',path:'/content/news',component: news},
               {name: 'newsAdd',path:'/content/news/add',component: newsAdd},
               {name: 'newsEdit',path:'/content/news/edit/:newsId',component: newsEdit},
               // 内容管理—》评论管理
               //{name: 'comment',path:'/content/comment',component: comment},
               // 内容管理—》焦点图管理
               {name: 'banner',path:'/content/banner',component: banner},
               // 站内信
               {name: 'messages',path:'/message/messages',component: messages},
               {name: 'emails',path:'/message/emails',component: emails},
               {name: 'texts',path:'/message/texts',component: texts},
               // 财务
               {name: 'manage',path:'/financial/manage/:tabIndex',component: manage},
               {name: 'accounts',path:'/financial/accounts',component: accounts},
               {name: 'orders',path:'/financial/orders',component: orders},
               {name: 'order-detail',path:'/financial/orders/:orderNo',component: orderDetail},
               {name: 'refund',path:'/financial/refund/:tabIndex/:orderId',component: refund},
               // 用户管理
               {name: 'users',path:'/users',component: usersList},
               {name: 'user-detail',path:'/users/:userId',component: userDetail},
               // 渠道管理
               {name: 'channelSelf',path:'/channel/self',component: channelSelf},
               {name: 'channelUser',path:'/channel/users',component: channelUser},
               {name: 'channelDetail',path:'/channel/detail/:channelId',component: channelDetail},
               // 富文本编辑器，上传本地图片
               {name: 'editorImg',path:'/editor/image',component: editorImg},

           ]
       },
    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面


    
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:routers
})

export default router
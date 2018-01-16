<template>
    <div id="setting">
        <div v-if="!panel" class='photoShow'>
            <div id="purchased">
                <div class="purchased-top">
                    <i class="iconfont icon-fanhui" @click="back()"></i>
                    <span>{{text}}</span>
                </div>
            </div>
            <!--展示头像-->
            <div v-if="setState == 1">
                <div class="header-per">
                    <div class="header-Img">
                        <img :src="headerImage" v-if="headerType">
                        <img src="../../assets/image/header.png" v-if="!headerType">
                        <div class="setting-img"><i class="iconfont icon-shangchuansucaitu"></i></div>
                        <input type="file" id="change"  accept="image/*" @change="change">
                        <label for="change"></label>
                    </div>
                </div>
                <!--手机号、昵称、性别、简介-->
                <div class="settingList">
                    <div class="setList">
                        <div class="setList-left">手机号</div>
                        <div class="setList-right phone">{{ phone }}</div>
                    </div>
                    <div class="setList" @click="changName()">
                        <div class="setList-left">昵称</div>
                        <div class="setList-right">{{ name }}<i class="iconfont icon-fanhui"></i></div>
                    </div>
                    <div class="setList" @click="changSex()">
                        <div class="setList-left">性别</div>
                        <div class="setList-right" v-if="sex == 1">男<i class="iconfont icon-fanhui"></i></div>
                        <div class="setList-right" v-if="sex == 2">女<i class="iconfont icon-fanhui"></i></div>
                        <div class="setList-right" v-if="!sex">请选择<i class="iconfont icon-fanhui"></i></div>
                    </div>
                    <div class="setList" @click="changIntro()">
                        <div class="setList-left brief1">简介</div>
                        <div class="setList-right brief">
                            <div class="brief">{{ brief }}</div>
                            <i class="iconfont icon-fanhui"></i>
                        </div>
                    </div>
                </div>

                <!--我的地址、公司、职位-->
                <div class="settingList">
                    <div class="setList" @click="changAddress()">
                        <div class="setList-left brief1">我的地址</div>
                        <div class="setList-right brief">
                            <div>
                                <span class="brief" v-for="a in address" v-if="a.defaultAdress && a.available">{{a.provinceName}}{{a.cityName}}{{a.districtName}}{{a.detailAdress}}</span>
                            </div>
                            <i class="iconfont icon-fanhui"></i>
                        </div>
                    </div>
                    <div class="setList" @click="changCompany()">
                        <div class="setList-left">公司</div>
                        <div class="setList-right" v-if="company">{{ company }}<i class="iconfont icon-fanhui"></i></div>
                    </div>
                    <div class="setList" @click="changPosition()">
                        <div class="setList-left">职位</div>
                        <div class="setList-right">{{ position }}<i class="iconfont icon-fanhui"></i></div>
                    </div>
                </div>

                <!--微信号、密码-->
                <div class="settingList">
                    <div class="setList" v-if="wxShow">
                        <div class="setList-left">微信号</div>
                        <div class="setList-right" v-if="wxlogin">已绑定<i class="iconfont icon-fanhui"></i></div>
                        <div class="setList-right" v-if="!wxlogin" @click="wxOn()">未绑定<i class="iconfont icon-fanhui"></i></div>
                    </div>
                    <div class="setList" @click="changPassword(passCode)">
                        <div class="setList-left">密码</div>
                        <div class="setList-right">设置密码<i class="iconfont icon-fanhui"></i></div>
                    </div>
                </div>

                <!--退出-->
                <div class="exit" @click="exit()">退出登录</div>
            </div>
            <!--设置名字-->
            <div v-if="setState == 2">
                <div class="settingName">
                    <input type="text" v-model="name" placeholder="10字以内" ref="count" maxlength="10"/>
                    <i class="iconfont icon-Shape" @click="cleanName()"></i>
                </div>
                <div class="SaveBtn" v-if="changeName">保存</div>
                <div class="okSave font1" v-if="!changeName" @click="changeNames()">保存</div>
            </div>
            <!--设置性别-->
            <div v-if="setState == 3">
                <div class="settingSex">
                    <div class="settingSex-list" @click="sexBtn(0)">男<i class="iconfont icon-yes" v-if="sex == 1"></i></div>
                    <div class="settingSex-list" @click="sexBtn(1)">女<i class="iconfont icon-yes" v-if="sex == 2"></i></div>
                </div>
            </div>
            <!--设置简介-->
            <div v-if="setState == 4">
                <div class="settingIntro">
                    <textarea maxlength="30" v-model="brief" @input="descInput"></textarea>
                    <p>{{ remnant }}</p>
                </div>
                <div class="SaveBtn" v-if="changebrief">保存</div>
                <div class="okSave font1" v-if="!changebrief" @click="changebriefs()">保存</div>
            </div>
            <!--设置地址-->
            <div v-if="setState == 5">
                <!--新增地址列表页-->
                <div class="addressList" v-for="(add,index) in myAddress">
                    <div class="addressList-top">
                        <div>{{add.name}}<span>{{add.phone}}</span></div>
                        <div>{{add.provinceName}}{{add.cityName}}{{add.districtName}}{{add.detailAdress}}</div>
                    </div>
                    <div class="addressList-bottom">
                        <div class="tacitly" :class="{'checked1':add.defaultAdress}" @click="pitchSite(add._id,index,2)">
                            <i class="iconfont defaults" :class="{'icon-icon_right':add.defaultAdress,'icon-danxuan_moren':!add.defaultAdress}"></i>
                            默认地址
                        </div>
                        <div class="compile" @click="delAddress2(add._id)">删除</div>
                        <div class="compile" @click="comAddress(add._id)">编辑</div>
                        <!---删除地址弹窗-->
                        <div class="delectBox" v-if="delAddress">
                            <div class="delectBox-top">确认删除该地址吗？</div>
                            <div class="delectBox-btn">
                                <div class="yes font1" @click="delAdd()">确认</div>
                                <div class="no" @click="delAddNo()">取消</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--新建地址-->
                <div class="newAdress font1" @click="openAdd()"><i class="iconfont icon-jia"></i>新增地址</div>
            </div>
            <!--编辑地址-->
            <div v-if="setState == 11">
                <div class="addAddress">
                    <div class="addressName">
                        <div class="addressName-left">收件人</div>
                        <input type="text" placeholder="姓名" maxlength="10" v-model="nameNum">
                    </div>
                    <div class="addressName">
                        <div class="addressName-left">联系电话</div>
                        <input type="number" placeholder="电话" maxlength="11" v-model="phoneNum">
                    </div>
                    <div class="addressName">
                        <div class="addressName-left">所在地区</div>
                        <div class="select" @click="setAddress()">
                            <div>
                                <span style="color:#333;">{{selectAddress}}</span>
                                <i class="iconfont icon-fanhui"></i>
                            </div>
                        </div>
                    </div>
                    <div class="addressDetail">
                        <div class="addressName-left">详细地址</div>
                        <textarea type="number" placeholder="请填写详细地址" maxlength="30" v-model="addressNum"></textarea>
                    </div>
                </div>
                <!--保存按钮-->
                <div class="SaveBtn" v-if="!saveYes">保存</div>
                <div class="okSave font1" v-if="saveYes" @click="compileOK(bjId,nameNum,phoneNum,selectAddress,addressNum)">保存</div>
                <!--新增地址-->
                <div class="distpicker" v-if="distpicker">
                    <div class="distpicker-top">
                        <span @click="closeAdd()">取消</span>
                        <span @click="addAddress()">完成</span>
                    </div>
                    <v-distpicker type="mobile" @selected="onSelected" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
                </div>
                <div class="keepOut" v-if="distpicker" @click="closeAdd()"></div>
            </div>
            <!--新建地址-->
            <div v-if="setState == 6">
                <div class="addAddress">
                    <div class="addressName">
                        <div class="addressName-left">收件人</div>
                        <input type="text" placeholder="姓名" maxlength="10" v-model="nameNum">
                    </div>
                    <div class="addressName">
                        <div class="addressName-left">联系电话</div>
                        <input type="number" placeholder="电话" maxlength="11" v-model="phoneNum">
                    </div>
                    <div class="addressName">
                        <div class="addressName-left">所在地区</div>
                        <div class="select" @click="setAddress()">
                            <div>
                                <span v-if="selectAddress == ''">请选择</span>
                                <span v-if="selectAddress != ''" style="color:#333;">{{province}} {{city}} {{area}}</span>
                                <i class="iconfont icon-fanhui"></i>
                            </div>
                        </div>
                    </div>
                    <div class="addressDetail">
                        <div class="addressName-left">详细地址</div>
                        <textarea type="number" placeholder="请填写详细地址" maxlength="30" v-model="addressNum"></textarea>
                    </div>
                </div>
                <!--提示-->
                <div class="hintpw" v-if="hintAdd">请填写正确的{{hintAddtext1}}{{hintAddtext2}}{{hintAddtext4}}</div>
                <!--保存按钮-->
                <div class="SaveBtn" v-if="!saveYes">保存</div>
                <div class="okSave font1" v-if="saveYes" @click="saveOK()">保存</div>
                <!--新增地址-->
                <div class="distpicker" v-if="distpicker">
                    <div class="distpicker-top">
                        <span @click="closeAdd()">取消</span>
                        <span @click="addAddress()">完成</span>
                    </div>
                    <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
                </div>
                <div class="keepOut" v-if="distpicker" @click="closeAdd()"></div>
            </div>
            <!--设置公司-->
            <div v-if="setState == 7">
                <div class="settingName">
                    <input type="text" v-model="company" placeholder="10字以内" ref="count" maxlength="10"/>
                    <i class="iconfont icon-Shape" @click="cleanCompany()"></i>
                </div>
                <div class="SaveBtn" v-if="changeCompany">保存</div>
                <div class="okSave font1" v-if="!changeCompany" @click="changeCompanys()">保存</div>
            </div>
            <!--设置职位-->
            <div v-if="setState == 8">
                <div class="settingName">
                    <input type="text" v-model="position" placeholder="10字以内" ref="count" maxlength="10"/>
                    <i class="iconfont icon-Shape" @click="cleanPosition()"></i>
                </div>
                <div class="SaveBtn" v-if="changePosition">保存</div>
                <div class="okSave font1" v-if="!changePosition" @click="changePositions()">保存</div>
            </div>
            <!--设置密码-->
            <div v-if="setState == 10">
                <!--是否有旧密码-->
                <div class="password" v-if="passCode">
                    <div class="passwordNew">
                        <input type="password" placeholder="旧密码" v-model="passwordOld">
                    </div>
                </div>
                <div class="password">
                    <div class="passwordNew">
                        <input type="password" placeholder="新密码" v-model="passwordNew">
                    </div>
                    <div class="passwordNew">
                        <input type="password" placeholder="确认新密码" v-model="passwordNew2">
                    </div>
                </div>
                <div class="hintpw">请输入6~24位字母、数字组合的密码</div>
                <div class="okSave font1" @click="passwordBtn()">确定</div>
                <div class="hint" v-if="hint">{{hintText}}</div>

                <!--登录成功提示弹窗-->
                <div class="successExit" v-if="exitShow">
                    <div class="successExit-top">请重新登录</div>
                    <div class="successExit-p">您修改密码成功，请重新登录验证身份</div>
                    <div class="successExit-Btn" @click="successExit()">确定</div>
                </div>
                <div class="zhezhao" v-if="exitShow"></div>
            </div>
        </div>
        <!--展示上传头像截图区-->
        <div class="container" v-show="panel">
            <div>
                <img id="image" :src="url" alt="Picture">
            </div>
            <button type="button" id="button" @click="crop">确定</button>
        </div>
    </div>
</template>

<script>
//    import {service} from '../../service/service'
    import {commonService} from '../../service/personalService'
    import {common} from '../../assets/js/common/common'
    import {axios} from '../../service/axios'
    import VDistpicker from 'v-distpicker'
    import Cropper from 'cropperjs'
    export default {
        components: { VDistpicker },
        data(){
            return{
                picValue:'',
                cropper:'',
                croppable:false,
                panel:false,
                url:'',
                //以上上传头像参数
                text:'设置',
                headerImage:'',//设置头像
                headerImageSrc:'',//上传的头像路径
                headerType:'',
                phone:'',
                name:'',
                name2:'',
                changeName:false,
                sex:'',
                brief:'',
                brief2:'',
                changebrief:false,
                address:'',
                Newaddress:'',//新增加的地址
                selectAddress:'',//新建收货地址中的地址栏
                company:'',
                company2:'',//检查公司是否变化
                changeCompany:false,
                position:'',
                position2:'',
                changePosition:false,
                wxName:'我是微信号',
                setState:1,//1.主页。2.名字。3.性别。4.简介。5.收货地址页面。6.新增地址页。
                remnant:'30',
                distpicker:false,//新建地址栏是否开启
                province:'',//省
                city:'',//市
                district:'',//区
                saveYes:false,//是否可以点击保存
                nameNum:'',//新建地址中收件人
                addressNum:'',//新建地址中监听详细地址的值
                pickNum:'',//新建地址中监听有无选中详细地址
                phoneNum:'',//新建地址中监听手机号
                monitorName:0,//新建地址中监听收件人是否填写
                monitorText:0,//监听textarea有没有值
                monitorPhone:0,//监听phone有没有值
                monitorPick:0,//监听selectAddress有没有值
                monitorBtn:0,//监听保存按钮是否可以点击
                passwordOld:'',//旧密码
                passwordNew:'',//监听新密码
                passwordNew2:'',//监听重复输入的新密码
                hint:false,//是否显示更改密码错误的提示
                hintText:'',//更改密码错误的提示状态
                select: { province: '广东省', city: '广州市', area: '海珠区' },//编辑地址中显示的区域
                myAddress:'',
                addressUser:'',//编辑使用
                bjId:'',//编辑使用的
                provinceid:1,//编辑要的Id
                districtId:1,//编辑要的ID
                cityId:1,
                wxShow:false,
                passCode:'',//是否设置过密码
                width:'',//上传头像宽
                height:'',//上传头像高
                wxlogin:'',//判断微信是否登录
                exitShow:false,//修改密码弹窗提示
                shopid:'',
                hintAdd:false,//提示框
                hintAddtext1:'',//提示文字
                hintAddtext2:'',//提示文字
                hintAddtext4:'',//提示文字
                delAddress:false,//显示
                defaultAdress:false,//是否是默认地址
            }
        },
        mounted:function(){
            //初始化这个裁剪框
            let that = this;
            let image = document.getElementById('image');
            document.title=that.text
            this.cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                background:false,
                zoomable:false,
                ready: function () {
                    that.croppable = true;
                }
            });
            //微信绑定第二步
            let wxBind = window.localStorage.getItem('wxBind')
            if(wxBind){
                this.wxBind();
            }
            //判断浏览器
            function isWeiXin() {
                var ua = window.navigator.userAgent.toLowerCase();
//                console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            }
            if(isWeiXin()){
//                console.log(" 是来自微信内置浏览器")
                this.wxShow = true;
            }else{
//                console.log("不是来自微信内置浏览器")
            }
            commonService.myCenter().then(function (res) {
//                console.log(res.data.datas.user);
                let user = res.data.datas.user;
                let baseUser = res.data.datas.baseUser;
                that.passCode = baseUser.password ? true : false;
                that.phone = user.phone;//电话
                that.name = user.name;//名字
                that.name2 = user.name;//检测姓名是否改变使用
                that.sex = user.sex;//性别1.男。2.女。
                that.brief = user.descripthion==null?'还没有简介':user.descripthion;//个人简介
                let addresses = user.addresses;
                that.address =  addresses;//收货地址
                that.company = user.company==null?'暂无':user.company;//公司
                that.company2 = that.company //检查有没有公司
                that.position = user.job==null?'暂无':user.job;//职位
                that.position2 = that.position;
                that.headerType = user.headImg;
                that.headerImage = that.$store.state.picHead + user.headImg;
                that.wxlogin = baseUser.unionid ? true : false;
            }).catch(function(err){
//                console.log(err);
            })
        },
        created () {

        },
        methods:{
            back:function(){
                if(this.setState === 1){
//                    console.log('这里是首页')
                    this.$router.replace({name:'mycenter'})
                }
                if(this.setState === 2){//改名字
                    this.setState = 1;
                    this.text = '设置';
                    this.name = this.name2
//                    commonService.myCenterSet({name:this.name}).then(function (res) {
////                        console.log(res)
//                    })
                }
                if(this.setState === 3){//修改性别
                    this.setState = 1;
                    this.text = '设置';
                    commonService.myCenterSet({sex:this.sex}).then(function (res) {
//                        console.log(res)
                    })
                }
                if(this.setState === 4){//修改简介
                    this.setState = 1;
                    this.text = '设置';
                    this.brief = this.brief2
                    if(this.brief == '还没有简介'||this.brief == ''){
                        this.brief = '还没有简介';
                    }
//                    commonService.myCenterSet({descripthion:this.brief}).then(function (res) {
////                        console.log(res)
//                    })
                }
                if(this.setState === 5){//修改地址
                    this.setState = 1;
                    this.text = '设置';
                    this.$router.go('setting');
                }
                if(this.setState === 6){
                    this.setState = 5;
                }
                if(this.setState === 7){//修改公司
//                    console.log('这里是公司')
                    this.setState = 1;
                    this.text = '设置';
                    this.company = this.company2;
                    if(this.company == '暂无'||this.company == ''){
                        this.company = '暂无'
                    }
//                    commonService.myCenterSet({company:this.company}).then(function(res){
//                        console.log(res)
//                    })
                }
                if(this.setState === 8){//修改职位
                    this.setState = 1;
                    this.text = '设置';
                    this.position = this.position2;
                    if(this.position == '暂无'||this.position == ''){
                        this.position = '暂无'
                    }
//                    commonService.myCenterSet({job:this.position}).then(function(res){
//                        console.log(res)
//                    })
                }
                if(this.setState === 10){
                    this.setState = 1;
                    this.text = '设置';
                    this.passwordOld = '';
                    this.passwordNew = '';
                    this.passwordNew2 = '';
                }
                if(this.setState === 11){
                    this.setState = 5;
                    this.selectAddress = '';
                    this.nameNum = '';
                    this.phoneNum = '';
                    this.addressNum = '';
                }
            },
            //改名字按钮
            changName:function(){
                this.setState = 2;
                this.text = '昵称';
                this.name2 = this.name
            },
            //修改性别按钮
            changSex:function(){
                this.setState = 3;
                this.text = '性别'
            },
            //清除名字按钮
            cleanName:function(){
                this.name = ''
            },
            //更改性别
            sexBtn:function(data){
                if(data === 0){
                    this.sex = 1
                }
                if(data === 1){
                    this.sex = 2
                }
//                console.log(this.sex)
            },
            //修改简介按钮
            changIntro:function(){
                if(this.brief == '还没有简介'){
                    this.brief = '';
                }
                this.brief2 = this.brief
                this.setState = 4;
                this.text = '简介';
                let txtVal = this.brief.length;
                this.remnant = 30 - txtVal;
            },
            //监听简介的数字
            descInput:function(){
                let txtVal = this.brief.length;
                this.remnant = 30 - txtVal;
            },
            //刷新收获地址
            changAddress:function(){
                this.setState = 5;
                this.text = '地址'
                let that = this
                commonService.myCenterAddress({pageNo:1,pageSize:100}).then(function (res) {
                    that.myAddress = res.data.datas.datas;
                    that.nameNum = res.data.datas.datas.name;
                    that.phoneNum = res.data.datas.datas.phone;
                    that.addressNum = res.data.datas.datas.provinceName;
                    that.nameNum = res.data.datas.datas.name
                })
            },
            //选中默认地址
            pitchSite:function(id,index,type){
                let that = this;
                let thisId = id;
                let thisType = type;
                let tacitly = document.getElementsByClassName('tacitly');
                for(let i = 0;i<tacitly.length;i++){
                    tacitly[i].classList.remove('checked1')
                }
                tacitly[index].classList.add('checked1');
                let tacitlyChild = document.getElementsByClassName('defaults');
                for(let i = 0;i<tacitlyChild.length;i++){
                    tacitlyChild[i].classList.remove('icon-icon_right');
                    tacitlyChild[i].classList.add('icon-danxuan_moren');
                }
                tacitlyChild[index].classList.add('icon-icon_right');
                tacitlyChild[index].classList.remove('icon-danxuan_moren');
                commonService.myAddressSave(thisId,{type:thisType}).then(function (res) {
//                    console.log(res)
                })
            },
            //编辑地址
            comAddress:function(id){
                this.setState = 11;
                this.text = '地址';
                let that = this;
                commonService.myAddressEdit(id).then(function(res){
                    that.addressUser = res.data.datas;
                    that.nameNum = res.data.datas.name;
                    that.addressNum = res.data.datas.detailAdress;
                    that.province = res.data.datas.provinceName;
                    that.city = res.data.datas.cityName;
                    that.area = res.data.datas.districtName;
                    that.selectAddress = that.province + ' ' + that.city + ' '+ that.area;
                    that.phoneNum = res.data.datas.phone;
                    that.bjId = res.data.datas.id;
                    that.provinceid = res.data.datas.provinceId
                    that.districtId = res.data.datas.districtId
                    that.cityId = res.data.datas.cityId
                    that.delAddress = false;
                    that.defaultAdress = res.data.datas.defaultAdress;
                })
            },
            //确认删除
            delAdd:function(){
                let that = this;
                commonService.myAddressDel(that.delId).then(function(res){
                    that.setState = 5;
                    that.text = '地址';
                    that.changAddress();
                })
                that.delAddress = false;
                that.delId = '';
            },
            //取消删除
            delAddNo:function(){
                let that = this;
                that.delAddress = false;
            },
            //删除收货地址
            delAddress2:function(id){
                let that = this;
                that.delId = id;
                that.delAddress = true;
            },
            //打开新建地址功能
            openAdd:function(){
                this.setState = 6;
                this.text = '地址';
                this.selectAddress = '';
                this.nameNum = '';
                this.phoneNum = '';
                this.addressNum = '';
            },
            //新增地址三级联动
            setAddress:function(){
                this.distpicker = true;
            },
            //选择新建地址三级联动（实时）
            onSelected(data) {
//                console.log(data)
                this.province = data.province.value;
                this.city = data.city.value;
                this.area = data.area.value;
                this.provinceid = data.province.code;
                this.cityId = data.city.code;
                this.districtId = data.area.code;
            },
            //三级联动选择新增地址（点击完成）
            addAddress:function(){
                let province1 = this.province;
                let city1 = this.city;
                let area = this.area;
                if(province1 == ''&&city1 == ''&&area == ''){
                    alert('请选择地址')
                }else{
                    this.selectAddress = this.province + ' ' + this.city + ' ' + this.area;
                    this.distpicker = false;//关闭新增地址弹窗和遮罩层
                    this.monitorPick = 1;
                }
            },
            //三级联动关闭取消新增地址
            closeAdd:function(){
                this.province = '';
                this.city = '';
                this.area = '';
                this.distpicker = false;
            },
            //保存新建的地址
            saveOK:function(){
                let that = this;
                that.saveYes = false;
                commonService.myAddressNew({
                    name:that.nameNum,
                    phone:that.phoneNum,
                    provinceName:that.province,
                    provinceId:that.provinceid,
                    cityName:that.city,
                    cityId:that.cityId,
                    districtId:that.districtId,
                    districtName:that.area,
                    detailAdress:that.addressNum,
                    type:1
                }).then(function(res){
                    that.changAddress();
                    that.selectAddress = '';
                    that.nameNum = '';
                    that.phoneNum = '';
                    that.addressNum = '';
                })
            },
            //编辑地址保存按钮
            compileOK:function(id){
                this.setState = 5;
                let that = this;
                commonService.myAddressSave(that.bjId,
                    {
                        name:that.nameNum,
                        phone:that.phoneNum,
                        provinceName:that.province,
                        provinceId:that.provinceid,
                        cityName:that.city,
                        cityId:that.cityId,
                        districtId:that.districtId,
                        districtName:that.area,
                        detailAdress:that.addressNum,
                        type:1,
                        available:true,
                        defaultAdress:that.defaultAdress,
                    }).then(function(res){
                    that.changAddress();
                    that.selectAddress = '';
                    that.nameNum = '';
                    that.phoneNum = '';
                    that.addressNum = '';
                })
            },
            //修改公司名称
            changCompany:function(){
                this.setState = 7;
                this.text = '公司'
                if(this.company == '暂无'){
                    this.company = '';
                }
                this.company2 = this.company;
            },
            //清除公司名称
            cleanCompany:function(){
                this.company = '';
            },
            //修改职位
            changPosition:function(){
                this.setState = 8;
                this.text = '职位'
                this.position2 = this.position;
                if(this.position == '暂无'){
                    this.position = '';
                }
            },
            //清除职位
            cleanPosition:function(){
                this.position = '';
            },
            //绑定微信号
            wxOn:function(){
                if(!this.wxlogin){//未绑定
                    commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxBind',wxscope:'snsapi_userinfo'}).then(function(res){
                        let code = res.data.code;
                        window.localStorage.setItem('code',code);
                        if(code === 200){
                            //获取静默授权地址成功
                            window.localStorage.setItem('wxBind',true);
                            window.location.href = res.data.datas;
                        }
                    })
                }
            },
            //绑定微信号第二步
            wxBind:function(){
                let that = this;
                let code = that.$route.params.code;
                if(!code){
                    code = window.localStorage.getItem('code')
                }
                commonService.wxBind({code: code}).then(function (res) {
                    if(res.data.success){
                        that.wxlogin = true;
                        window.localStorage.removeItem('wxBind')
                    }
                })
            },
            //确认更改密码
            successExit:function(){
                let that = this;
                window.localStorage.removeItem('token');
                commonService.myExit().then(function(res){
                    that.$router.push({name:'login'});
                });
            },
            //设置密码
            changPassword:function(){
                this.setState = 10;
                this.text = '设置密码';
                this.hint = false;
            },
            passwordBtn:function(){
                let that = this;
                //有旧密码
                if(that.passCode){
                    if(that.passwordNew.length < 6){
                        that.hint = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        return;
                    }else if(that.passwordNew.length > 24){
                        that.hint = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        return;
                    }else if(that.passwordNew != this.passwordNew2){
                        that.hint = true;
                        that.hintText = '两次输入的密码不一致';
                        return;
                    }else if(that.passwordNew.length<=24 && that.passwordNew.length>=6) {
                        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
                        if (!regExp.test(that.passwordNew)) {
                            that.hint = true;
                            that.hintText = '请输入6~24位字母、数字组合的密码';
                        }else{
                            commonService.myPassword({oldPassword:that.passwordOld,newPassword:that.passwordNew}).then(function(res){
                                if(res.data.code === 513107){
                                    that.hint = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                }else if(res.data.code === 513103){
                                    that.hint = true;
                                    that.hintText = '旧密码不能为空';
                                }else if(res.data.code === 513104){
                                    that.hint = true;
                                    that.hintText = '请输入6~24位字母、数字组合的密码';
                                }else if(res.data.code === 513114){
                                    that.hint = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                }else{
                                    that.exitShow = true;
                                }
                            })
                        }
                    }
                }else{
                    //没有旧密码
                    if(that.passwordNew.length < 6){
                        that.hint = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        return;
                    }else if(that.passwordNew.length > 24){
                        that.hint = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        return;
                    }else if(that.passwordNew != this.passwordNew2){
                        that.hint = true;
                        that.hintText = '两次输入的密码不一致';
                        return;
                    }else if(that.passwordNew.length<=24 && that.passwordNew.length>=6) {
                        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
                        if (!regExp.test(that.passwordNew)) {
                            that.hint = true;
                            that.hintText = '请输入6~24位字母、数字组合的密码';
                        }else{
                            commonService.myPassword2({password:that.passwordNew}).then(function(res){
                                if(res.data.code === 513107){
                                    that.hint = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                }else if(res.data.code === 513103){
                                    that.hint = true;
                                    that.hintText = '旧密码不能为空';
                                }else if(res.data.code === 513104){
                                    that.hint = true;
                                    that.hintText = '请输入6~24位字母、数字组合的密码';
                                }else if(res.data.code === 513114){
                                    that.hint = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                }else{
                                    that.exitShow = true;
                                }
                            })
                        }
                    }
                }
            },
            //退出登录
            exit:function(){
                let that = this;
                commonService.myExit().then(function(res){
                    if(res.data.success){
                        window.localStorage.removeItem('token');
                        that.$router.replace({name:'home'});
                    }
                })
            },
            //以下为上传头像方法
            getObjectURL (file) {
                let url = null ;
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            },
            change (e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.panel = true;
                this.picValue = files[0];

                this.url = this.getObjectURL(this.picValue);
                //每次替换图片要重新得到新的url
                if(this.cropper){
                    this.cropper.replace(this.url);
                }
                this.panel = true;

            },
            crop () {
                this.panel = false;
                let croppedCanvas;
                let roundedCanvas;

                if (!this.croppable) {
                    return;
                }
                // Crop
                croppedCanvas = this.cropper.getCroppedCanvas();
                // Round
                roundedCanvas = this.getRoundedCanvas(croppedCanvas);

                this.headerImageSrc = roundedCanvas.toDataURL();
                let that = this;
                console.log(that.headerImageSrc)
                console.log(that.width,that.height);
                commonService.myImage({base64Img:that.headerImageSrc,width:that.width,height:that.height}).then(function(res){
                    let img = res.data.datas;
                    commonService.myCenterSet({headImg:img}).then(function(res){
                        if(res.data.success){
                            that.$router.go(0)
                        }
                    })
                })
            },
            getRoundedCanvas (sourceCanvas) {
                let that = this;
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                let width = sourceCanvas.width;
                let height = sourceCanvas.height;

                //为了每张图片的大小不超过50k,所以不论裁剪多大，最后上传的，最大宽度不超过90。
                that.width = 270;
                that.height = 270;
                canvas.width = that.width;
                canvas.height = that.height;

                context.imageSmoothingEnabled = true;
                context.drawImage(sourceCanvas, 0, 0, that.width, that.height);
                context.globalCompositeOperation = 'destination-in';
                context.beginPath();
                context.arc(that.width / 2, that.height / 2, Math.min(that.width, that.height) / 2, 0, 2 * Math.PI, true);
                context.fill();

                return canvas;
            },
            //更改名字
            changeNames:function(){
                let that = this;
                commonService.myCenterSet({name:that.name}).then(function (res) {
                });
                this.changeName = true;
                this.setState = 1;
                this.text = '设置';
            },
            //更改简介
            changebriefs:function(){
                if(this.brief == '还没有简介'||this.brief == ''){
                    this.brief = '还没有简介';
                }
                commonService.myCenterSet({descripthion:this.brief}).then(function (res) {
                });
                this.setState = 1;
                this.text = '设置';
            },
            //更改公司
            changeCompanys:function(){
                let that = this;
                that.changeCompany = true;
                if(this.company == '暂无'||this.company == ''){
                    this.company = '暂无'
                }
                commonService.myCenterSet({company:this.company}).then(function(res){
//                    console.log(res)
                })
                this.setState = 1;
                this.text = '设置';
            },
            //更改职位
            changePositions:function(){
                let that = this;
                that.changePosition = true;
                if(that.position == '暂无'||that.position == ''){
                    that.position = '暂无'
                }
                commonService.myCenterSet({job:that.position}).then(function(res){
//                    console.log(res)
                })
                this.setState = 1;
                this.text = '设置';
            }
        },
        components: { VDistpicker },
        watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
            nameNum(val){
                if(val !== ''){
                    this.monitorName = 1;
                    this.hintAddtext1 = ''
                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                }else{
                    this.monitorName = 0;
                    this.hintAddtext1 = '姓名、'
                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                }
            },
            addressNum(val){
                if(val !== ''){
                    this.monitorText = 1;
                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                }else{
                    this.monitorText = 0;
                    this.hintAddtext4 = '详细地址。'
                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                }
            },
            phoneNum(val){
                if(val !== ''){
                    if(!(/^1[34578]\d{9}$/.test(val))){
                        this.monitorPhone = 0;
                        this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick;
                        this.hintAddtext2 = '手机号、'
                        return false;
                    }else{
                        this.monitorPhone = 1;
                        this.hintAddtext2 = ''
                        this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                    }
//                    this.monitorPhone = 1;
//                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorName
                }else{
                    this.monitorPhone = 0;
                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                }
            },
            selectAddress(val){
                if(val !== ''){
                    this.monitorPick = 1;
                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                }else{
                    this.monitorPick = 0;
                    this.hintAddtext4 = '详细地址。'
                    this.monitorBtn = this.monitorName + this.monitorText + this.monitorPhone + this.monitorPick
                }
            },
            monitorBtn(val){
                if(val === 4){
                    this.hintAdd = false;
                    this.saveYes = true;
                }else{
                    this.hintAdd = true;
                    this.saveYes = false;
                }
            },
            passwordNew(val){
                if(val.length >= 0){
                    this.hint = false;
                }
            },
            passwordNew2(val){
                if(val.length >= 0){
                    this.hint = false;
                }
            },
            passwordOld(val){
                if(val.length >= 0){
                    this.hint = false;
                }
            },
            name(val){
                if(val == this.name2){
                    this.changeName = true;
                }else{
                    if(val == ''){
                        this.changeName = true;
                    }else{
                        this.changeName = false;
                    }
                }
            },
            company(val){
                if(val == this.company2){
                    this.changeCompany = true;
                }else{
                    if(val == ''){
                        this.changeCompany = true;
                    }else{
                        this.changeCompany = false;
                    }
                }
            },
            position(val){
                if(val == this.position2){
                    this.changePosition = true;
                }else{
                    if(val == ''){
                        this.changePosition = true;
                    }else{
                        this.changePosition = false;
                    }
                }
            }
        },
    }
</script>

<style lang="less">
    @import url('../../assets/css/theme.less');
    body{
        background:#F9F9F9;
    }
    #setting{
        background:#F9F9F9;
        padding-bottom: 0.2rem;
        margin:auto;
        text-align: center;
    }
    .photoShow{
        padding-bottom:0.3rem;
        background:#F9F9F9;
    }
    .purchased-top{
        width:100%;
        height:1.2rem;
        background:#fff;
        position: relative;
        i{
            float:left;
            font-size:0.8rem;
            line-height:1.2rem;
            margin-left:0.2rem;
            color:#999999;
            display: block;
            position:absolute;
        }
        span{
            /*margin-left:-1rem;*/
            height:1.2rem;
            line-height:1.2rem;
            font-size: 18px;
            color: #333333;
            letter-spacing: 0.3px;
        }
    }
    .header-per{
        width:100%;
        height:3.2rem;
        background:#fff;
        position: relative;
        .header-Img{
            width:2.1rem;
            height:2.1rem;
            position: absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            margin:auto;
            background: rgba(255,255,255,0.50);
            box-shadow: 0 0 10px 0 rgba(0,0,0,0.06);
            border-radius: 100px;
            padding: 1px;
            img{
                width:100%;
                height:100%;
                border-radius: 100%;
                overflow: hidden;
            }
            input{
                width:100%;
                height:2.1rem;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
            .setting-img{
                width:0.64rem;
                height:0.64rem;
                position:absolute;
                right:0;
                bottom:0;
                background:#fff;
                border-radius: 100px;
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.06);
                line-height:0.64rem;
                i{
                    color:#EEEEEE;
                    font-size:14px;
                }
            }
        }
    }
    .settingList{
        width:100%;
        padding-left:0.53rem;
        margin:0.27rem 0;
        background:#fff;
        box-sizing: border-box;
        .setList{
            width:100%;
            min-height:1.2rem;
            box-shadow: inset -1px -1px 0 0 rgba(221, 221, 221, 0.5);
            overflow: auto;
            .setList-left{
                width:30%;
                height:1.2rem;
                line-height:1.2rem;
                float:left;
                text-align: left;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
            }
            .setList-right{
                width:70%;
                min-height:1.2rem;
                float:right;
                text-align: right;
                box-sizing: border-box;
                font-size: 14px;
                color: #999999;
                line-height:1.2rem;
                position: relative;
                i{
                    float: right;
                    font-size: 0.8rem;
                    line-height: 1.2rem;
                    color: #EFEFEF;
                    display: block;
                    transform: rotate(180deg);
                }

            }
            .phone{
                padding-right:0.4rem;
                box-sizing: border-box;
            }
            .brief1{
                width:20%;
            }
            .brief{
                width:80%;
                padding:0.27rem 0;
                line-height:0.53rem;
                font-size:14px;
                div{
                    width:80%;
                    margin-right: 0.75rem;
                    float:right;
                    padding: 0.2rem 0;
                }
                i{
                    position:absolute;
                    top:0;
                    bottom:0;
                    right:0;
                    margin:auto;
                    display: inline-table;
                }
            }
        }
        .setList:last-child{
            box-shadow:none;
        }
    }
    .exit{
        width:92%;
        height:1.07rem;
        line-height:1.07rem;
        text-align: center;
        margin:0.27rem auto 0.27rem;
        background:#fff;
        color: #DF4431;
        font-size: 16px;
    }
    .settingName{
        width:100%;
        height:1.2rem;
        line-height:1.2rem;
        margin:0.27rem 0;
        padding:0 0.53rem;
        box-sizing: border-box;
        background:#fff;
        overflow: hidden;
        input{
            width:90%;
            height:100%;
            border:none;
            outline:none;
            font-size:14px;
        }
        i{
            float:right;
            color:#EEEEEE;
        }
    }
    .password{
        width:100%;
        margin:0.27rem 0 0 0;
        padding:0 0.53rem;
        box-sizing: border-box;
        background:#fff;
        overflow: hidden;
        .passwordNew{
            width: 100%;
            height: 1rem;
            box-sizing: border-box;
        }
        input{
            width:100%;
            height: 1rem;
            line-height: 1rem;
            border:none;
            outline:none;
        }
        input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
            color:#BBBBBB;
            font-size:14px;
        }
        input:-moz-placeholder {
            color:#BBBBBB;
            font-size:14px;
        }
        input::-moz-placeholder,textarea::-moz-placeholder{
            color:#BBBBBB;
            font-size:14px;
        }
        input:-ms-input-placeholder,textarea:-ms-input-placeholder{
            color:#BBBBBB;
            font-size:14px;
        }
    }
    .settingSex{
        width:100%;
        height:2.4rem;
        margin:0.27rem 0;
        padding:0 0.53rem;
        box-sizing: border-box;
        background:#fff;
        .settingSex-list{
            width:100%;
            height:1.2rem;
            line-height:1.2rem;
            text-align:left;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            i{
                float:right;
                color:#6699FF;
            }
        }
    }
    .settingIntro{
        width:100%;
        height:2.4rem;
        margin:0.27rem 0;
        padding:0.1rem 0.53rem;
        box-sizing: border-box;
        background:#fff;
        position: relative;
        textarea{
            width:100%;
            height:100%;
            border:none;
            outline: none;
            resize : none;
            font-size:14px;
        }
        p{
            position: absolute;
            right:0.3rem;
            bottom:0;
            font-size: 14px;
            color: #DDDDDD;
            letter-spacing: 0;
        }
    }
    .newAdress{
        width:100%;
        height:1.2rem;
        line-height:1.2rem;
        margin:0.27rem 0;
        background:#fff;
        font-size: 16px;
        color: #6699FF;
        letter-spacing: 0;
        i{
            margin:0 0.1rem;
            font-size:14px;
        }
    }
    .addressList{
        width:100%;
        padding:0 0.53rem;
        background:#fff;
        margin-bottom:0.27rem;
        box-sizing: border-box;
        .addressList-top{
            width:100%;
            padding:0.32rem 0;
            border-bottom:1px solid #eee;
            div{
                font-size: 14px;
                color: #1F2D3D;
                letter-spacing: 0;
                line-height:0.56rem;
                text-align: left;
                span{
                    margin:0 0.2rem;
                }
            }
        }
        .addressList-bottom{
            width:100%;
            height:1rem;
            background:#fff;
            line-height:1rem;
            .tacitly{
                width:30%;
                text-align: left;
                font-size: 13px;
                color: #666666;
                float:left;
            }
            .checked1{
                /*color:#6699FF;*/
            }
            .compile{
                width:1rem;
                height:1rem;
                line-height:1rem;
                float:right;
                font-size: 13px;
                color: #666666;
            }
        }
    }
    .addressList:nth-child(1){
        margin-top:0.27rem;
    }
    .addAddress{
        width:100%;
        padding-left:0.4rem;
        background:#fff;
        box-sizing: border-box;
        margin-top:0.27rem;
        .addressDetail{
            width:100%;
            border-bottom:1px solid #E5E9F2;
            padding-right:0.4rem;
            box-sizing: border-box;
            border-bottom:none;
            overflow: hidden;
            .addressName-left{
                width:30%;
                height:1.2rem;
                line-height:1.2rem;
                float:left;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: left;
            }
            .select{
                width:70%;
                height:1.15rem;
                line-height:1.2rem;
                text-align: right;
                font-size: 14px;
                color: #999999;
                float:left;
                i{
                    transform: rotate(180deg);
                    display: block;
                    float: right;
                }
                div{
                    span{
                        font-size: 14px !important;
                    }
                }
            }
            input{
                width:70%;
                height:1.15rem;
                text-align: right;
                font-size: 14px;
                color: #333333;
                border:none;
                outline: none;
            }
            textarea{
                width:70%;
                height:1.79rem;
                line-height: 0.6rem;
                padding: 0.3rem 0;
                text-align: right;
                font-size: 14px;
                color: #333333;
                border:none;
                outline: none;
                resize:none;
            }
            input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
                color:#999999;
            }
            input::-moz-placeholder,textarea::-moz-placeholder{
                color:#999999;
            }
            input:-ms-input-placeholder,textarea:-ms-input-placeholder{
                color:#999999;
            }
        }
        .addressName{
            width:100%;
            height:1.2rem;
            border-bottom:1px solid #E5E9F2;
            padding-right:0.4rem;
            box-sizing: border-box;
            overflow: hidden;
            .addressName-left{
                width:30%;
                height:1.2rem;
                line-height:1.2rem;
                float:left;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: left;
            }
            .select{
                width:70%;
                height:1.2rem;
                line-height:1.2rem;
                text-align: right;
                font-size: 14px;
                color: #999999;
                float:left;
                i{
                    transform: rotate(180deg);
                    display: block;
                    float: right;
                }
            }
            input{
                width:70%;
                height:1.15rem;
                text-align: right;
                font-size: 14px;
                color: #333333;
                border:none;
                outline: none;
            }
            textarea{
                width:70%;
                height:1.79rem;
                text-align: right;
                font-size: 14px;
                color: #333333;
                border:none;
                outline: none;
                resize:none;
            }
            input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
                color:#999999;
            }
            input::-moz-placeholder,textarea::-moz-placeholder{
                color:#999999;
            }
            input:-ms-input-placeholder,textarea:-ms-input-placeholder{
                color:#999999;
            }
        }
        .addressName:last-child{
            border-bottom:none;
        }
    }
    .SaveBtn{
        width:100%;
        height:1.2rem;
        line-height:1.2rem;
        background:#fff;
        text-align: center;
        font-size: 16px;
        color: #999999;
        letter-spacing: 0;
        margin:0.53rem 0;
    }
    .okSave{
        width:100%;
        height:1.2rem;
        line-height:1.2rem;
        background:#fff;
        text-align: center;
        font-size: 16px;
        color: #1ba1e2;
        letter-spacing: 0;
        margin: 0.53rem 0;
    }
    .hintpw{
        width:100%;
        height:1rem;
        line-height:1rem;
        font-size: 12px;
        color: #BBBBBB;
        text-align: left;
        padding:0 0.53rem;
        box-sizing: border-box;
    }
    .hint{
        width:80%;
        height:1.2rem;
        line-height:1.2rem;
        color:#fff;
        background:#333;
        opacity: 0;
        position:fixed;
        left:0;
        top:0;
        bottom:0;
        right:0;
        margin:auto;
        font-size:14px;
        animation: show_state 2.5s ease 0s;
    }
    @keyframes show_state{
        0%{
            -webkit-transform: scale(.1);
            -moz-transform: scale(.1);
            -o-transform: scale(.1);
            -ms-transform: scale(.1);
            transform: scale(.1);
            opacity: 0;
        }
        30%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.7;
        }
        50%{
            -webkit-transform: scale(2);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.7;
        }
        90%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.7;
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }
    .distpicker{
        width:100%;
        height:6.4rem;
        position: fixed;
        bottom:0;
        z-index:100;
        .distpicker-top{
            width:100%;
            height:1.07rem;
            line-height:1.07rem;
            font-size: 16px;
            color: #389BFF;
            background:#fff;
            padding:0 0.4rem;
            box-sizing: border-box;
            span:nth-child(1){
                float:left;
            }
            span:nth-child(2){
                float:right;
            }
        }
        .address{
            width:100%;
            height:5.3rem;
            background:#F9FAFC;
            overflow: scroll;
            .address-header{
                width:100%;
                color:#333333;
            }
            div{
                background:#F9FAFC;
                font-size: 14px;
                color: #999999
            }
        }
    }
    .keepOut{
        width:100%;
        background: rgba(0,0,0,0.50);
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin:auto;
    }

    #button {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 80px;
        height: 40px;
        border:none;
        border-radius: 5px;
        background:white;
    }
    .show {
        width: 100px;
        height: 100px;
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        border: 1px solid #d5d5d5;
    }
    .picture {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    #image {
        max-width: 100%;
    }
    .cropper-view-box,.cropper-face {
        border-radius: 50%;
    }
    .container {
        z-index: 10000;
        position: fixed;
        padding-top: 60px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background:rgba(0,0,0,1);
    }
    .cropper-container {
        font-size: 0;
        line-height: 0;

        position: relative;

        -webkit-user-select: none;

        -moz-user-select: none;

        -ms-user-select: none;

        user-select: none;

        direction: ltr;
        -ms-touch-action: none;
        touch-action: none
    }
    .cropper-container img {
        /* Avoid margin top issue (Occur only when margin-top <= -height) */
        display: block;
        min-width: 0 !important;
        max-width: none !important;
        min-height: 0 !important;
        max-height: none !important;
        width: 100%;
        height: 100%;
        image-orientation: 0deg
    }
    .cropper-wrap-box,
    .cropper-canvas,
    .cropper-drag-box,
    .cropper-crop-box,
    .cropper-modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .cropper-wrap-box {
        overflow: hidden;
    }
    .cropper-drag-box {
        opacity: 0;
        background-color: #fff;
    }
    .cropper-modal {
        opacity: .5;
        background-color: #000;
    }
    .cropper-view-box {
        display: block;
        overflow: hidden;

        width: 100%;
        height: 100%;

        outline: 1px solid #39f;
        outline-color: rgba(51, 153, 255, 0.75);
    }
    .cropper-dashed {
        position: absolute;

        display: block;

        opacity: .5;
        border: 0 dashed #eee
    }
    .cropper-dashed.dashed-h {
        top: 33.33333%;
        left: 0;
        width: 100%;
        height: 33.33333%;
        border-top-width: 1px;
        border-bottom-width: 1px
    }
    .cropper-dashed.dashed-v {
        top: 0;
        left: 33.33333%;
        width: 33.33333%;
        height: 100%;
        border-right-width: 1px;
        border-left-width: 1px
    }
    .cropper-center {
        position: absolute;
        top: 50%;
        left: 50%;

        display: block;

        width: 0;
        height: 0;

        opacity: .75
    }
    .cropper-center:before,
    .cropper-center:after {
        position: absolute;
        display: block;
        content: ' ';
        background-color: #eee
    }
    .cropper-center:before {
        top: 0;
        left: -3px;
        width: 7px;
        height: 1px
    }
    .cropper-center:after {
        top: -3px;
        left: 0;
        width: 1px;
        height: 7px
    }
    .cropper-face,
    .cropper-line,
    .cropper-point {
        position: absolute;

        display: block;

        width: 100%;
        height: 100%;

        opacity: .1;
    }
    .cropper-face {
        top: 0;
        left: 0;

        background-color: #fff;
    }
    .cropper-line {
        background-color: #39f
    }
    .cropper-line.line-e {
        top: 0;
        right: -3px;
        width: 5px;
        cursor: e-resize
    }
    .cropper-line.line-n {
        top: -3px;
        left: 0;
        height: 5px;
        cursor: n-resize
    }
    .cropper-line.line-w {
        top: 0;
        left: -3px;
        width: 5px;
        cursor: w-resize
    }
    .cropper-line.line-s {
        bottom: -3px;
        left: 0;
        height: 5px;
        cursor: s-resize
    }
    .cropper-point {
        width: 5px;
        height: 5px;

        opacity: .75;
        background-color: #39f
    }
    .cropper-point.point-e {
        top: 50%;
        right: -3px;
        margin-top: -3px;
        cursor: e-resize
    }
    .cropper-point.point-n {
        top: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: n-resize
    }
    .cropper-point.point-w {
        top: 50%;
        left: -3px;
        margin-top: -3px;
        cursor: w-resize
    }
    .cropper-point.point-s {
        bottom: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: s-resize
    }
    .cropper-point.point-ne {
        top: -3px;
        right: -3px;
        cursor: ne-resize
    }
    .cropper-point.point-nw {
        top: -3px;
        left: -3px;
        cursor: nw-resize
    }
    .cropper-point.point-sw {
        bottom: -3px;
        left: -3px;
        cursor: sw-resize
    }
    .cropper-point.point-se {
        right: -3px;
        bottom: -3px;
        width: 20px;
        height: 20px;
        cursor: se-resize;
        opacity: 1
    }
    @media (min-width: 768px) {

        .cropper-point.point-se {
            width: 15px;
            height: 15px
        }
    }
    @media (min-width: 992px) {

        .cropper-point.point-se {
            width: 10px;
            height: 10px
        }
    }
    @media (min-width: 1200px) {

        .cropper-point.point-se {
            width: 5px;
            height: 5px;
            opacity: .75
        }
    }
    .cropper-point.point-se:before {
        position: absolute;
        right: -50%;
        bottom: -50%;
        display: block;
        width: 200%;
        height: 200%;
        content: ' ';
        opacity: 0;
        background-color: #39f
    }
    .cropper-invisible {
        opacity: 0;
    }
    .cropper-bg {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
    }
    .cropper-hide {
        position: absolute;

        display: block;

        width: 0;
        height: 0;
    }
    .cropper-hidden {
        display: none !important;
    }
    .cropper-move {
        cursor: move;
    }
    .cropper-crop {
        cursor: crosshair;
    }
    .cropper-disabled .cropper-drag-box,
    .cropper-disabled .cropper-face,
    .cropper-disabled .cropper-line,
    .cropper-disabled .cropper-point {
        cursor: not-allowed;
    }
    .successExit{
        width:80%;
        height:4rem;
        padding:0.3rem;
        box-sizing: border-box;
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        text-align: center;
        border:1px solid #eee;
        background:#fff;
        border-radius: 3px;
        z-index:1000;
        .successExit-top{
            height:1.2rem;
            line-height:1.2rem;
            font-size:18px;
            font-weight: bold;
        }
        .successExit-p{
            font-size:14px;
        }
        .successExit-Btn{
            width:2rem;
            height:1rem;
            line-height:1rem;
            color:#fff;
            background:#0089E1;
            font-size:14px;
            margin:0.4rem auto;
            border-radius: 3px;
        }
    }
    .zhezhao{
        width:100%;
        height:100%;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:#333333;
        opacity: 0.85;
    }
    .delectBox{
        width:70%;
        height:3rem;
        box-sizing: border-box;
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        text-align: center;
        border:1px solid #eee;
        background: #FFFFFF;
        box-shadow: 0 2px 20px 0 rgba(0,0,0,0.12);
        border-radius: 12px;
        z-index:1000;
        .delectBox-top{
            width:100%;
            height:1.8rem;
            line-height:1.8rem;
            text-align: center;
            font-size:14px;
            color: #333333;
        }
        .delectBox-btn{
            width:100%;
            height:1.2rem;
            font-size:14px;
            .yes{
                width:50%;
                height:1.2rem;
                line-height:1.2rem;
                float:right;
                color:#007AFF;
            }
            .no{
                width:calc(50% - 1px);
                height:1.2rem;
                line-height:1.2rem;
                float:right;
                color:#999;
            }
        }
    }

</style>
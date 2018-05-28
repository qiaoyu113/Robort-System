(function() {
    CKEDITOR.dialog.add("3rdVoice",
        function(editor) {
            return {
                title : "添加音频",
                minWidth : 500,
                minHeight : 100,
                onOk: function() {
                    var url = this.getValueOf('info','url').toString();

                    var url_html = '';
                    var code = '';
                    // if(url.indexOf("ximalaya.com")>0){
                    //     code = url.substring(url.lastIndexOf("/"),url.length);
                    //     console.log(code);
                    //     url_html = "<iframe width=260 height=36 src='http://www.ximalaya.com/swf/sound/red.swf?id=" + code + "' frameborder=0 'allowfullscreen'></iframe>";
                    //     console.log(url_html);
                    // }else
                    if(url.indexOf("lebo.baidu.com")>0){
                        code = url.substring(url.lastIndexOf("/")+1,url.length);
                        // console.log(code);
                        url_html = "<iframe height='170' width='300' src='http://lebo.baidu.com/widget/album/" + code + "' autoplay=0 frameborder=0 allowfullscreen></iframe>";
                        // console.log(url_html);
                    }else{
                        alert("音频来源不支持！请添加支持的音频链接");
                        return false;
                    }
                    //点击确定按钮后的操作
                    editor.insertHtml(url_html);


                },

                contents :
                    [
                        {
                            id : 'info',
                            elements :
                                [
                                    {
                                        type : 'hbox',
                                        children : [
                                            {
                                                type : 'text',
                                                id : 'url',
                                                label : '音频地址【暂时只支持百度乐播】:',
                                                commit : commitValue,
                                                setup : loadValue
                                            }
                                        ]
                                    }
                                ]
                        }

                    ]
            };

            function commitValue( videoNode, extraStyles )
            {
                debugger;
                var value=this.getValue();

                if ( !value && this.id=='id' )
                    value = generateId();

                videoNode.setAttribute( this.id, value);

                if ( !value )
                    return;
                switch( this.id )
                {
                    case 'poster':
                        extraStyles.backgroundImage = 'url(' + value + ')';
                        break;
                    case 'width':
                        extraStyles.width = value + 'px';
                        break;
                    case 'height':
                        extraStyles.height = value + 'px';
                        break;
                }
            }

            function loadValue( videoNode )
            {
                if ( videoNode )
                    this.setValue( videoNode.getAttribute( this.id ) );
                else
                {
                    if ( this.id == 'id')
                        this.setValue( generateId() );
                }
            }

            function generateId()
            {
                var now = new Date();
                return 'video' + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
            }
        })
})();  
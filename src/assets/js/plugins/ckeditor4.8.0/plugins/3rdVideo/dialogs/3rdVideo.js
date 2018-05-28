(function() {
    CKEDITOR.dialog.add("3rdVideo",
        function(editor) {
            return {
                title : "添加视频",
                minWidth : 500,
                minHeight : 100,
                onOk: function() {
                    var url = this.getValueOf('info','url').toString();

                    var url_html = '';
                    var code = '';
                    if(url.indexOf("v.youku.com")>0){
                        code = url.substring(url.lastIndexOf("id_")+3,url.lastIndexOf(".html"));
                        url_html = "<iframe height=498 width=510 src='http://player.youku.com/embed/" + code + "' frameborder=0 'allowfullscreen'></iframe>";
                    }else if(url.indexOf("v.qq.com")>0){
                        code = url.substring(url.lastIndexOf("/")+1,url.lastIndexOf(".html"));
                        url_html = "<iframe frameborder='0' width='640' height='498' src='https://v.qq.com/iframe/player.html?tiny=0&auto=0&vid=" + code + "' allowfullscreen></iframe>";
                    }else if(url.indexOf("tudou.com")>0){//土豆的格式比较多
                        var regexp = /[a-zA-Z0-9-_]{11}/g;
                        code = url.match(regexp);
                        var l_code = '';
                        if(code.length > 1){
                            l_code = 'lcode=' + code[0] + '&code=' + code[1];
                        }else {
                            l_code = 'lcode=' + code[0];
                        }
                        url_html = "<iframe src='http://www.tudou.com/programs/view/html5embed.action?&" + l_code + "' allowtransparency='true' allowfullscreen='true' allowfullscreenInteractive='true' scrolling='no' border='0' frameborder='0' style='width:480px;height:400px;'></iframe>";
                    }else{
                        alert("视频来源不支持！请添加支持的视频链接");
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
                                                label : '视频地址【暂时只支持优酷，土豆，腾讯视频】:',
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
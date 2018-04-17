/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here.
    // For complete reference see:
    // config.extraPlugins = 'floatpanel,sourcearea';
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config
    // The toolbar groups arrangement, optimized for two toolbar rows.
    config.width = 720; //宽度
    config.height = 330; //高度

    config.toolbarGroups = [ // 定义工具
        { name: 'document', groups: [ 'mode', 'undo', 'doctools', 'document' ] },
        { name: 'links', groups: [ 'links', 'cleanup' ] },
        { name: 'paragraph', groups: [  'blocks', 'align','indent', 'list', 'bidi', 'paragraph' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [  'basicstyles' ] },
        { name: 'basicstyles', groups: [ 'colors' ] },
        // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'clipboard', groups: [ 'clipboard' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'tools', groups: [ 'tools' ] },
    ];

    config.removeButtons = 'Save,Print,NewPage,Templates,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Anchor,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Styles,SelectAll,Find,Replace,Flash,Superscript,Subscript,BidiLtr,BidiRtl';


    // config.font_names = "宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;微软雅黑/微软雅黑;" + config.font_names; // 定义字体;
    config.indentClasses = ['pindent'];// 定义首行缩进的class;

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.

    // Set the most common block elements.
    // config.format_tags = 'p;h1;h2;h3;pre';

    // 本地图片上传功能
    config.image_previewText = '';
    config.removeDialogTabs = 'image:advanced;image:Link';//隐藏超链接与高级选项
    config.filebrowserImageUploadUrl = localStorage.beforeA + "?backUrl=" + localStorage.afterB;//上传图片的地址
};

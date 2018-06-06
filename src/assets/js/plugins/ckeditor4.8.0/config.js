/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here.
    // For complete reference see:
    // config.extraPlugins = 'floatpanel,sourcearea';

    config.extraPlugins = '3rdVideo,sourcearea,lineheight';
    config.allowedContent = true;
    config.extraAllowedContent = 'iframe[*]';

    config.toolbarGroups = [ // 定义工具
        { name: 'document', groups: [ 'mode', 'undo'] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'paragraph', groups: [  'blocks', 'align','indent', 'list', 'bidi', 'paragraph' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'styles'},
        { name: 'colors', groups: [  'basicstyles' ] },
        { name: 'basicstyles', groups: [ 'colors' ] },
        // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        // { name: 'clipboard', groups: [ 'clipboard' ] },
        // { name: 'forms', groups: [ 'forms' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] }
    ];

    config.removeButtons = 'Font,Smiley,Save,Print,NewPage,Templates,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Anchor,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Styles,SelectAll,Find,Replace,Flash,Superscript,Subscript,BidiLtr,BidiRtl';
    config.indentClasses = ['pindent'];// 定义首行缩进的class;

    // 本地图片上传功能
    config.image_previewText = '';
    config.removeDialogTabs = 'image:advanced;image:Link';//隐藏超链接与高级选项
    config.filebrowserImageUploadUrl = localStorage.beforeA + "?backUrl=" + localStorage.afterB;//上传图片的地址
};

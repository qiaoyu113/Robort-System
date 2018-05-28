/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
    config.extraPlugins = 'colorbutton,panelbutton,floatpanel,sourcearea';
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	// The toolbar groups arrangement, optimized for two toolbar rows.
	/*config.toolbarGroups = [
        { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		// { name: 'about' }
	];

*/
   /* config.toolbarGroups = [ // 定义工具
        { name: 'document', groups: [ 'mode', 'undo', 'doctools', 'document' ] },
        { name: 'links'},
       /!* { name: 'paragraph', groups: [ 'align', 'blocks', 'indent', 'list', 'bidi', 'paragraph' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'clipboard', groups: [ 'clipboard' ] },
        { name: 'insert'},
        { name: 'forms'},
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors' },
        { name: 'others' },
        { name: 'tools', groups: [ 'tools' ] },*!/


        { name: 'basicstyles', groups: [ 'colors' ] },
        { name: 'colors', groups: [  'basicstyles' ] },
        { name: 'paragraph', groups: [ 'align', 'blocks', 'indent', 'list', 'bidi', 'paragraph' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'clipboard', groups: [ 'clipboard' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'others', groups: [ 'others' ] }

    ];*/

    // config.removeButtons = 'Save,Print,NewPage,Templates,Scayt,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Anchor,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Styles,SelectAll,Find,Replace,Flash,Superscript,Subscript,BidiLtr,BidiRtl';
    // config.removeButtons = 'Save,Print,NewPage,Templates,Scayt,Checkbox,Radio,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Anchor,SpecialChar,PageBreak,Iframe,ShowBlocks,About,SelectAll,Find,Replace,Flash,Superscript,Subscript,BidiLtr,BidiRtl';


    config.toolbarGroups = [ // 定义工具
        { name: 'document', groups: [ 'mode', 'undo', 'doctools', 'document' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'links', groups: [ 'links', 'cleanup' ] },
        { name: 'about', groups: [ 'about' ] },
        { name: 'tools', groups: [ 'tools' ] },

        { name: 'basicstyles', groups: [ 'colors' ] },
        { name: 'colors', groups: [  'basicstyles' ] },
        { name: 'paragraph', groups: [ 'align', 'blocks', 'indent', 'list', 'bidi', 'paragraph' ]},
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'clipboard', groups: [ 'clipboard' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'others', groups: [ 'others' ] }
    ];

    config.removeButtons = 'Save,Print,NewPage,Templates,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Anchor,Table,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Styles,SelectAll,Find,Replace,Flash,Superscript,Subscript,BidiLtr,BidiRtl';


    config.font_names = "宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;微软雅黑/微软雅黑;" + config.font_names; // 定义字体;
    config.indentClasses = ['pindent'];// 定义首行缩进的class;
    config.format_tags ='p;h1;h2;h3;h4;h5;h6';// 定义段落格式;

    config.line_height = '1;1.5;1.75;2;3;4;5';// 定义行间距;
	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.

	// Set the most common block elements.
	// config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	//config.removeDialogTabs = 'image:advanced;link:advanced';
	// 本地图片上传功能
	config.image_previewText = '';
	config.removeDialogTabs = 'image:advanced;image:Link';//隐藏超链接与高级选项
	config.filebrowserImageUploadUrl = localStorage.beforeA + "?backUrl=" + localStorage.afterB;//上传图片的地址
};

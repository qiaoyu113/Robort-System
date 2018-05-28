/*
 * @file Video plugin for CKEditor
 * Copyright (C) 2011 Alfonso Martínez de Lizarrondo
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 */

(function() {  
    CKEDITOR.plugins.add("3rdVoice", {
        requires: ["dialog"],

        getPlaceholderCss : function()
        {
            return 'img.cke_video' +
                '{' +
                'background-image: url(' + CKEDITOR.getUrl( this.path + 'images/placeholder.png' ) + ');' +
                'background-position: center center;' +
                'background-repeat: no-repeat;' +
                'background-color:gray;'+
                'border: 1px solid #a9a9a9;' +
                'width: 80px;' +
                'height: 80px;' +
                '}';
        },

        onLoad : function()
        {
            // v4
            if (CKEDITOR.addCss)
                CKEDITOR.addCss( this.getPlaceholderCss() );

        },

        init: function(a) {  
            a.addCommand("3rdVoice", new CKEDITOR.dialogCommand("3rdVoice"));
            a.ui.addButton("3rdVoice", {
                label: "添加音频",//调用dialog时显示的名称
                command: "3rdVoice",
                icon : this.path + 'images/audio.png'
   
            });  
            CKEDITOR.dialog.add("3rdVoice", this.path + "dialogs/3rdVoice.js")
   
        }  
   
    })  
   
})();  
"use strict";$(function(){$(".news-nav li").on("mouseover",function(){if(!$(this).hasClass("active")){var a=$(this).attr("name");$(".news-tabs .news-tab").hide(),$('.news-tab[name="'+a+'"]').show(),$(".news-nav li.active").removeClass("active"),$(this).addClass("active"),$("#news .tk_more").attr("href",$(this).attr("data-href")),$(this).index()>2?$(".tk_upload").show():$(".tk_upload").hide()}})});
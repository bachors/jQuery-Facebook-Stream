/***********************************************************
* #### jQuery-Facebook-Streaming v4.0 ####
* Coded by Ican Bachors 2014.
* https://github.com/bachors/jQuery-Facebook-Stream
* Updates will be posted to this site.
***********************************************************/

$.fn.facebook_stream = function(n, o, p) {
    var j = '<div class="facebook-stream">';
    j += '	<div class="modalDialog">';
    j += '		<div>';
    j += '			<a href="#close" title="Close" class="close">X</a>';
    j += '			<p>Image</p>';
    j += '		</div>';
    j += '	</div>';
    j += '</div>', id = ($(this).attr("id") != null || $(this).attr("id") != undefined ? '#' + $(this).attr("id") : '.' + $(this).attr("class")), limit = o + 1;
    $(this).html(j);
    FS_gf(id, limit, 'until=');

    function FS_gf(k, l, m) {
        $.ajax({
            url: 'https://graph.facebook.com/v2.9/' + n + '/feed?limit=' + l + '&fields=from,message,created_time,id,likes,comments,story,link,type,name,picture,caption,description,object_id,shares&access_token=' + p + '&' + m,
            crossDomain: true,
            dataType: 'json'
        }).done(function(h) {
            var j = '';
            $.each(h.data, function(i, a) {
                if (i < o) {
                    j += '<div class="fb_box">';
                    j += '<div class="fb_status"><p><a href="https://facebook.com/' + h.data[i].from.id + '" target="_BLANK"><img src ="https://graph.facebook.com/v2.9/' + h.data[i].from.id + '/picture?access_token=' + p + '" alt="" class="fb_user_foto"> ';
                    j += '' + h.data[i].from.name + '</a><br>';
                    var b = '';
                    if (h.data[i].comments == null || h.data[i].comments == undefined) {
                        b += '0'
                    } else {
                        if (h.data[i].comments.data.length == 25) {
                            b += h.data[i].comments.data.length + '+'
                        } else {
                            b += h.data[i].comments.data.length
                        }
                    }
                    var c = '';
                    if (h.data[i].likes == null || h.data[i].likes == undefined) {
                        c += '0'
                    } else {
                        if (h.data[i].likes.data.length == 25) {
                            c += h.data[i].likes.data.length + '+'
                        } else {
                            c += h.data[i].likes.data.length
                        }
                    }
                    j += '<span class="date"><i class="fa fa-clock-o"></i> ' + relative_time(h.data[i].created_time) + '</span></p>';
                    if (h.data[i].message != null || h.data[i].message != undefined) {
                        j += '<pre>' + htmlEntities(h.data[i].message) + '</pre>'
                    }
                    if (h.data[i].story != null || h.data[i].story != undefined) {
                        j += h.data[i].story + '<br>'
                    }
                    if (h.data[i].name != null || h.data[i].name != undefined && h.data[i].type != 'photo') {
                        j += '<a href="' + h.data[i].link + '" target="_BLANK"><div class="fb_url_share">';
                        if (h.data[i].picture != null || h.data[i].picture != undefined) {
                            j += '<img src="' + h.data[i].picture + '" alst="">'
                        }
                        j += '<h3>' + h.data[i].name + '</h3>';
                        if (h.data[i].caption != null || h.data[i].caption != undefined) {
                            j += '<span>' + h.data[i].caption + '</span><br>'
                        }
                        if (h.data[i].description != null || h.data[i].description != undefined) {
                            j += h.data[i].description
                        }
                        j += '</div></a>'
                    } else {
                        if (h.data[i].picture != null || h.data[i].picture != undefined) {
                            j += '<a href="#openModal" data-popupimg="https://graph.facebook.com/v2.9/' + h.data[i].object_id + '/picture?access_token=' + p + '" class="FS_popup" title="Zoom"><img src="https://graph.facebook.com/v2.9/' + h.data[i].object_id + '/picture?access_token=' + p + '" alt="" class="fb_status_foto"></a><br>'
                        }
                    }
                    var d = '';
                    if (h.data[i].comments != null || h.data[i].comments != undefined) {
                        d += h.data[i].comments.data.length
                    } else {
                        d += 0
                    }
                    var e = '';
                    if (h.data[i].likes != null || h.data[i].likes != undefined) {
                        e += h.data[i].likes.data.length
                    } else {
                        e += 0
                    }
                    var f = h.data[i].id.split('_');
                    var g = '';
                    if (h.data[i].shares != null || h.data[i].shares != undefined) {
                        g += h.data[i].shares.count
                    }
                    j += '</div><div class="tabs"><div class="tab lihatlike" data-liki="' + h.data[i].id + ',' + e + '"><i class="fa fa-thumbs-up"></i> ' + c + '</div><div class="tab lihatkom" data-kom="' + h.data[i].id + ',' + d + '"><i class="fa fa-comment"></i> ' + b + '</div><div class="tab"><a href="http://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/permalink.php?story_fbid=' + f[1] + '&id=' + n + '" target="_BLANK"><i class="fa fa-share"></i> ' + g + '</a></div><div class="tab"><a href="https://www.facebook.com/permalink.php?story_fbid=' + f[1] + '&id=' + n + '" target="_BLANK"><i class="fa fa-external-link-square"></i></a></div></div>';
                    if (h.data[i].likes != null || h.data[i].likes != undefined) {
                        j += '<div class="fb_bls_like FS_like' + h.data[i].id + '" style="display:none"></div>'
                    }
                    if (h.data[i].comments != null || h.data[i].comments != undefined) {
                        j += '<div class="fb_bls_komen FS_blscm' + h.data[i].id + '" style="display:none"></div>'
                    }
                    j += '</div>'
                }
            });
            if (h.paging.next != null || h.paging.next != undefined) {
				j += '<p class="load_more"><a class="btn FS_moregf">More</a></p>';
			}
            $(k + ' .facebook-stream').append(j);
            $('.FS_popup').click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 0);
                $(k + ' .modalDialog p').html('<img src="' + $(this).data('popupimg') + '"/>');
                $(k + ' .modalDialog').css("opacity", "1");
                $(k + ' .modalDialog').css("pointer-events", "auto");
                return false
            });
            $(k + ' .modalDialog .close').click(function() {
                $(k + ' .modalDialog').css("opacity", "0");
                $(k + ' .modalDialog').css("pointer-events", "none");
                return false
            });
            $(k + ' .lihatlike').click(function() {
                var a = $(this).data('liki').split(',');
                if (a[1] > 0) {
                    FS_like(a[0])
                }
                $('.FS_like' + a[0]).css("display", "block");
                $('.FS_blscm' + a[0]).css("display", "none");
                return false
            });
            $(k + ' .lihatkom').click(function() {
                var a = $(this).data('kom').split(',');
                if (a[1] > 0) {
                    FS_morekomen(a[0], '', 'html')
                }
                $('.FS_like' + a[0]).css("display", "none");
                $('.FS_blscm' + a[0]).css("display", "block");
                return false
            });
            $(k + ' .FS_moregf').click(function() {
				if(h.paging.cursors !== undefined){
					var a = 'after=' + h.paging.cursors.after;
					FS_gf(k, l, a);
                    $(k + ' .load_more').remove();
				}else{
					var a = h.paging.next;
					var b = a.split('&');
					for (var i = 0; i < b.length; i++) {
						var c = b[i].split('=');
						if (c[0] == 'until') {
							FS_gf(k, l, 'until=' + c[1]);
							$(k + ' .load_more').remove();
						}
					}
				}
                return false;
            })
        })
    }

    function FS_like(e) {
        $.ajax({
            url: 'https://graph.facebook.com/v2.9/' + e + '/likes?access_token=' + p,
            crossDomain: true,
            dataType: 'json'
        }).done(function(b) {
            var c = '';
            $.each(b.data, function(i, a) {
                c += '<a href="https://facebook.com/' + b.data[i].id + '" target="_BLANK" title="' + b.data[i].name + '"><img src ="https://graph.facebook.com/v2.9/' + b.data[i].id + '/picture?access_token=' + p + '" class="likers_foto" alt=""></a>'
            });
            var d = '';
            if (b.data.length == 25) {
                d += '& more '
            }
            c += '<span class="likers">' + d + 'like this.</span>';
            $('.FS_like' + e).html(c)
        })
    }

    function FS_morekomen(e, g, h) {
        $.ajax({
            url: 'https://graph.facebook.com/v2.9/' + e + '/comments?fields=created_time,from,message,id,like_count&access_token=' + p + '&after=' + g,
            crossDomain: true,
            dataType: 'json'
        }).done(function(c) {
            var d = '';
            $.each(c.data, function(i, a) {
                d += '<div class="fb_komen" id="komen_sub_' + c.data[i].id + '"><div class="box_komen kenca"><a href="https://facebook.com/' + c.data[i].from.id + '" target="_BLANK"><img src ="https://graph.facebook.com/v2.9/' + c.data[i].from.id + '/picture?access_token=' + p + '" alt="" class="user_komen_foto"></a></div>';
                d += '<div class="box_komen katuhu"><a href="https://facebook.com/' + c.data[i].from.id + '" target="_BLANK">' + c.data[i].from.name + '</a>';
                if (c.data[i].message.length > 0) {
                    d += '<p></p><pre>' + htmlEntities(c.data[i].message) + '</pre>'
                } else {
                    d += '<br><p></p>'
                }
                var b = c.data[i].id;
                d += '<p class="fb_komen_foto FS_comg' + b + '"></p>';
                FS_gambarg(b);
                d += '<span class="date"><i class="fa fa-clock-o"></i> ' + relative_time(c.data[i].created_time) + '</span><span class="strong like_bls"><i class="fa fa-thumbs-up"></i> ' + c.data[i].like_count + '</span></div>';
                d += '</div>';
                FS_subkomen(c.data[i].id, '')
            });
            if (c.paging != undefined) {                
				if (c.paging.next != undefined) {
					d += '<p class="load_more_komen"><span class="strong fcm_more' + e + '">View more comments</span></p>'
				}
            }
            if (h == 'html') {
                $('.FS_blscm' + e).html(d)
            } else {
                $('.FS_blscm' + e).append(d)
            }
            $('.fcm_more' + e).click(function() {
                var a = c.paging.cursors.after;
                if (a != null || a != undefined) {
                    FS_morekomen(e, a, 'append');
                    $('.FS_blscm' + e + ' .load_more_komen').remove();
                    return false
                }
            })
        })
    }

    function FS_subkomen(e, g) {
        $.ajax({
            url: 'https://graph.facebook.com/v2.9/' + e + '/comments?fields=created_time,from,message,id,like_count&access_token=' + p + '&after=' + g,
            crossDomain: true,
            dataType: 'json'
        }).done(function(c) {
            var d = '';
            $.each(c.data, function(i, a) {
                d += '<div class="fb_komen_sub"><div class="box_komen kenca"><a href="https://facebook.com/' + c.data[i].from.id + '" target="_BLANK"><img src ="https://graph.facebook.com/v2.9/' + c.data[i].from.id + '/picture?access_token=' + p + '" alt="" class="user_komen_foto"></a></div>';
                d += '<div class="box_komen katuhu"><a href="https://facebook.com/' + c.data[i].from.id + '" target="_BLANK">' + c.data[i].from.name + '</a>';
                if (c.data[i].message.length > 0) {
                    d += '<p></p><pre>' + htmlEntities(c.data[i].message) + '</pre>'
                } else {
                    d += '<br><p></p>'
                }
                var b = c.data[i].id;
                d += '<p class="fb_komen_foto FS_comg' + b + '"></p>';
                FS_gambarg(b);
                d += '<span class="date"><i class="fa fa-clock-o"></i> ' + relative_time(c.data[i].created_time) + '</span><span class="strong like_bls"><i class="fa fa-thumbs-up"></i> ' + c.data[i].like_count + '</span></div>';
                d += '</div>'
            });
            if (c.paging != undefined) {
				if (c.paging.next != undefined) {
					d += '<p class="load_more_komen_sub"><span class="strong fcm_moresub">View more comments</span></p>'
				}
            }
            $('#komen_sub_' + e).append(d);
            $('.fcm_moresub').click(function() {
                var a = c.paging.cursors.after;
                if (a != null || a != undefined) {
                    FS_subkomen(e, a);
                    $('#komen_sub_' + e + ' .load_more_komen_sub').remove();
                    return false
                }
            });
        })
    }

    function FS_gambarg(c) {
        $.ajax({
            url: 'https://graph.facebook.com/v2.9/' + c + '?fields=attachment&access_token=' + p,
            crossDomain: true,
            dataType: 'json'
        }).done(function(a) {
            var b = '';
            if (a.attachment != null || a.attachment != undefined) {
                b += '<a data-popupimg="' + a.attachment.media.image.src + '" class="FS_popup" title="Zoom"><img src="' + a.attachment.media.image.src + '" alt=""></a>'
            }
            $('.FS_comg' + c).html(b);
            $('.FS_popup').click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 0);
                $(id + ' .modalDialog p').html('<img src="' + $(this).data('popupimg') + '"/>');
                $(id + ' .modalDialog').css("opacity", "1");
                $(id + ' .modalDialog').css("pointer-events", "auto");
                return false
            });
            $(id + ' .modalDialog .close').click(function() {
                $(id + ' .modalDialog').css("opacity", "0");
                $(id + ' .modalDialog').css("pointer-events", "none");
                return false
            })
        })
    }

    function htmlEntities(a) {
        return FS_urltag(String(a).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'))
    }

    function relative_time(a) {
        if (!a) {
            return
        }
        a = $.trim(a);
        a = a.replace(/\.\d\d\d+/, "");
        a = a.replace(/-/, "/").replace(/-/, "/");
        a = a.replace(/T/, " ").replace(/Z/, " UTC");
        a = a.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        var b = new Date(a);
        var c = (arguments.length > 1) ? arguments[1] : new Date();
        var d = parseInt((c.getTime() - b) / 1000);
        d = (d < 2) ? 2 : d;
        var r = '';
        if (d < 60) {
            r = 'Just now'
        } else if (d < 120) {
            r = 'a min'
        } else if (d < (45 * 60)) {
            r = (parseInt(d / 60, 10)).toString() + ' mins ago'
        } else if (d < (2 * 60 * 60)) {
            r = 'an hr'
        } else if (d < (24 * 60 * 60)) {
            r = '' + (parseInt(d / 3600, 10)).toString() + ' hrs ago'
        } else if (d < (48 * 60 * 60)) {
            r = 'a day'
        } else {
            r = (parseInt(d / 86400, 10)).toString() + ' days ago'
        }
        return r
    }

    function FS_urltag(c, d) {
        var e = {
            lt: {
                regex: /(<)/g,
                template: '&lt;'
            },
            gt: {
                regex: /(>)/g,
                template: '&gt;'
            },
            dq: {
                regex: /(")/g,
                template: '&quot;'
            },
            sq: {
                regex: /(')/g,
                template: '&#x27;'
            },
            link: {
                regex: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                template: "<a href=\"$1\" target='_BLANK'>$1</a>"
            },
            hash: {
                regex: /(^|\s)#(\w+)/g,
                template: '$1<a href="https://www.facebook.com/hashtag/$2" target="_BLANK">#$2</a>'
            },
            email: {
                regex: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
                template: '<a href=\"mailto:$1\">$1</a>'
            }
        };
        var f = $.extend(e, d);
        $.each(f, function(a, b) {
            c = c.replace(b.regex, b.template)
        });
        return c
    }
}

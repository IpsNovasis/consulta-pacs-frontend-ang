/*
	Archivo de funciones custom
*
*/
//variables globales region

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split("&");
    for (var i = 0;i <  sURLVariables.length;i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return '';
}

var menuSwiper, contador = 0, widthInicial,
	colores = ["#2e88b4", "#00466c", "#00244a", "#2e88b4"],
	isIE8 = !+'\v1',
        hoy = new Date(),
        bs1, 
        bs2,
        indicesNames = ["tramites", "certificados", "consultas", "pagos"];
        //indicesNames = ["pagos", "tramites", "consultas", "certificados"];
        //indicesNames = ["pagos"];
//variables globales endregion

//funciones custom region
function infoMail(selector, selectorDestino) {
    if (selector.val().length > 7 && checkCaracteresMail(selector.val()) == true) {
        selectorDestino.html(selector.val())
        if (selectorDestino.prop('scrollWidth') > selectorDestino.width()) {
            selectorDestino.html(selector.val().split("@")[0] + "@<br/>" + selector.val().split("@")[1]);
            if (selectorDestino.prop('scrollWidth') > selectorDestino.width()) {
                selectorDestino.html(selector.val().split("@")[0] + "@<br/>" + selector.val().split("@")[1].split(".")[0] + ".<br/>" + selector.val().split("@")[1].split(".")[1]);
            }
        }
    }

}

function toggleSiNo(SiONo, ConSioNo, objetivo, objetivoSecundario, claseSecundaria, botonAccion, textoObjetivo, textoString){
		function toggleOn(){
			$(objetivo).fadeIn();
            //if( claseSecundaria != "val-fecha-dd-mm-aaaa"){
			 $(objetivoSecundario).addClass(claseSecundaria);
            /*} else {
                $( objetivoSecundario ).datepicker({
                    onSelect: function(){ validarOnFocusOut($(objetivoSecundario), "formatear"); }
                });
            }
			*/
			$(objetivoSecundario).on("focusout", function(){
				  validarOnFocusOut($(this), "formatear", botonAccion);
			});
			if(textoObjetivo != undefined && textoString != undefined){
				$(textoObjetivo).find(".texto").text(textoString)
				$(textoObjetivo).fadeIn(textoString)
			}
		}
		
		function toggleOff(){
			$(objetivo).fadeOut();
			$(objetivoSecundario).removeClass(claseSecundaria);
			$(objetivoSecundario).off("focusout");
			if(textoObjetivo != undefined && textoString != undefined){
				$(textoObjetivo).fadeOut(function(){ $(textoObjetivo).find(".texto").text() })
				
			}
		}
		switch(SiONo){
			case "si":
				if(ConSioNo == "si"){
					toggleOn()
				} else {
					toggleOff()
				}
				break;
			case "no":
				if(ConSioNo == "no"){
					toggleOn()
				} else {
					toggleOff()
				}
				break;
		}
	}

function toggleSiNoEspecial(SiONo, ConSioNo, objetivo, arrayObjetivosSecundarios, arrayClasesSecundarias, botonAccion){
		function toggleOn(){
			$(objetivo).fadeIn();
			for(i=0; i<arrayObjetivosSecundarios.length; i++){
				$(arrayObjetivosSecundarios[i]).addClass(arrayClasesSecundarias[i]);
				$(arrayObjetivosSecundarios[i]).on("focusout", function(){
					  validarOnFocusOut($(this), "formatear", botonAccion);
				});
			}
		}
		
		function toggleOff(){
			$(objetivo).fadeOut();
			for(i=0; i<arrayObjetivosSecundarios.length; i++){
				$(arrayObjetivosSecundarios[i]).removeClass(arrayClasesSecundarias[i]);
				$(arrayObjetivosSecundarios[i]).off("focusout");
			}
		}
		switch(SiONo){
			case "si":
				if(ConSioNo == "si"){
					toggleOn()
				} else {
					toggleOff()
				}
				break;
			case "no":
				if(ConSioNo == "no"){
					toggleOn()
				} else {
					toggleOff()
				}
				break;
		}
	}

function ocultarIzquierda(selector){
	var elm = selector;
	elm.closest(".swiper-slide").css({"height": elm.closest(".swiper-slide").css("height"), "oveflow": "hidden"});
	elm.find("*").fadeOut(350);
	elm.delay(350).animate({
		"width": 0,
		"opacity": 0
	}, function(){ elm.hide(); elm.closest(".swiper-slide").css({"height": "auto", "overflow": "auto"}) });
}

function mostrarIzquierda(selector){
     var elm = selector,
         widthFinal = elm.attr("data-width-inicial");
	elm.show();
	elm.animate({
		"width": widthFinal,
		"opacity": 1
	}, function(){ elm.find("*").fadeIn(350) });
}

function pasoTerminado(){
    var tope = $("#progress li.active").index();
    for(i=0; i<$("#progress li").length; i++){
        if( $("#progress li").eq(i).index() < tope ){
            $("#progress li").eq(i).addClass("terminado");
        }
    }
}
 
//generar menu touch a partir de los archivos personas-home-______ y plugin swiper (js y css)
function generarMenuTouch(paginaInicial) {
    //La funcion busca el elemento .modulo-[nombre de la pagina] y lo agrega al slider,
    //y agrega por medio de ajax desde los otros archivos los div con el formato .modulo-[nombre de la pagina]
    //Para agregar p�gina, agregar a indicesNames el nombre de la pagina
    //(tener cuidado con el orden, que mostrara en ese orden los divs).
    //El archivo [prefijo] + [nombre de la pagina] + [extension] debe existir.
    //Se buscara el div .modulo-[nombre de la pagina] dentro de la pagina para agregarlo al slider.

    var valorInicial = paginaInicial,
        prefijo = "personaHome",
        extension = ".jsf";

    //SE DESCRIBEN LAS FUNCIONES SECUNDARIAS Y AL FINAL SE INVOCA
 
    //llamar a los elementos que no est�n en la p�gina actual   
    function ajaxOtros(url, esteIndice) {
    
        $.ajax({
            type: "GET",
            url: url,
            datatype: "html",
            timeout: 50000,
            success: function(data) {
                var obj = data,
                    dataId = "modulo-" + Math.floor(Math.random() * 99999);
                    console.log("Llamando a " + estaUrl);
                if(estaUrl == "/Certificados/web/personas-home-tramites.jsf"){ console.log(obj) }
                $(".contenedor-menu-touch .swiper-wrapper").append("<div class='swiper-slide' data-id='" + dataId + "' data-indice='" + esteIndice + "'></div>");
                $(".contenedor-menu-touch .swiper-wrapper .swiper-slide[data-id=" + dataId + "]").html($(obj).find( ".modulo-" + indicesNames[esteIndice]) );
                var esteTexto = "textos_" + indicesNames[esteIndice] + "()";
                eval(esteTexto);
                contador++;
                listo(contador, valorInicial);
                $(".swiper-slide[data-id=" + dataId + "]").removeAttr("data-id");                
            },
            error: function(){
            	console.log('Error llamando a ' + url + ' - Indice: ' + esteIndice);
                dataId = "modulo-" + Math.floor(Math.random() * 99999);
                $(".contenedor-menu-touch .swiper-wrapper").append("<div class='swiper-slide' data-id='" + dataId + "' data-indice='" + esteIndice + "'></div>");
                html_error = '<div><span class="modulo-'+indicesNames[esteIndice]+'"><h2 style="text-align:center;">El m&oacute;dulo <u>'+indicesNames[esteIndice]+'</u> se encuentra temporalmente deshabilitado. ' +
                '</br>Intente refrescando la página (F5)';
                $(".contenedor-menu-touch .swiper-wrapper .swiper-slide[data-id=" + dataId + "]").html($(html_error).find( ".modulo-" + indicesNames[esteIndice]));
                var esteTexto = "textos_" + indicesNames[esteIndice] + "()";
                eval(esteTexto);
                contador++;
                listo(contador, valorInicial);
                $(".swiper-slide[data-id=" + dataId + "]").removeAttr("data-id");
                
                console.log("error:" + esteIndice);
            }
        });
    }

    //envolver elementos
    function wrapEl(ind) {
        $(".contenedor-menu-touch").addClass("swiper-container");
        $(".modulo-" + indicesNames[ind]).wrap("<div class='swiper-wrapper'><div class='swiper-slide' data-indice='" + ind + "'></div></div>")
        
        console.log("IpsEnLinea - function wrapEl " + ind);
        
        if(indicesNames.length==1){
            listo(ind, ind);
        }
    }

    //ordenar los elementos por su indice de ser necesario
    function ordenar() {
        var elem = $(".swiper-container .swiper-slide"),
            ordenActual = [],
            ordenarNecesario = 0;
        for(j=0; j < $(".swiper-container .swiper-slide").length; j++){
            ordenActual.push( parseInt(elem.eq(j).attr("data-indice")) );
            if(ordenActual[j-1] >= ordenActual[j]){
                ordenarNecesario ++;
            }
        } 
        if (ordenarNecesario != 0) {
            var arrayOrden = [];
            for (i = 0; i < ordenActual.length; i++) {
                arrayOrden.push("<div class='swiper-slide' data-indice='" + elem.eq(i).attr("data-indice") + "'>" + elem.eq(i).html() + "</div>")
            }
            arrayOrden.sort()
            $(".swiper-wrapper").html(arrayOrden);
        }
    }

    //ejecutar funciones para inicializar el slider y asignar funciones secundarias
    function listo(count, valorInicial) {
    	console.log("function listo - IpsEnLinea (count-> " + count + ", valorInicial-> " + valorInicial +")");
        if ( count == (indicesNames.length - 1) && $("body").hasClass("sub") == false ){
            //Remarcado de link actual 
            var marksLeft = [], marksWidth = [],
                top = $("#navbar li").eq(0).offset().top + $("#navbar li").eq(0).height() - 5;
            for(k=0; k< $("#navbar li").length; k++){
                marksLeft.push( $("#navbar li").eq(k).find("a").offset().left );
                marksWidth.push( $("#navbar li").eq(k).find("a").innerWidth() );
            }
            $(window).on("resize", function() {
                marksLeft = [];
                marksWidth = [];
                top = $("#navbar li").eq(0).offset().top + $("#navbar li").eq(0).height() - 5;
                for(k=0; k< $("#navbar li").length; k++){
                    marksLeft.push( $("#navbar li").eq(k).find("a").offset().left );
                    marksWidth.push( $("#navbar li").eq(k).find("a").innerWidth() );
                }
                $(".over-link").css({
                    "width": marksWidth[menuSwiper.activeIndex],
                    "left": marksLeft[menuSwiper.activeIndex],
                    "top": top
                });
            });
            
            //acciones iniciales
            var oculto = isIE8 == true ? "display: none;" : "opacity: 0;";
            $(".container-fluid").append("<div class='over-link' style='top: " + top + "px; width:" + marksWidth[valorInicial] + "px; left:" + marksLeft[valorInicial] + "px;" + oculto + "'></div>");
            $("#navbar li").eq(valorInicial).find("a").addClass("over-link-activo");
            
            //verificar y si es necesario ordenar los divs
            ordenar();
            
            //Acciones de swiper y enlaces
            menuSwiper = new Swiper('.swiper-container', {
                calculateHeight:true,
                onSlideChangeStart: function(menuSwiper) {
                    $("body").css("background-color", colores[menuSwiper.activeIndex]);
                    $(".over-link").css("top", top + "px");
                    $(".over-link").animate({
                        "width": marksWidth[menuSwiper.activeIndex],
                        "left": marksLeft[menuSwiper.activeIndex]
                    });
                    $("#navbar li a").removeClass("over-link-activo");
                    $("#navbar li").eq(menuSwiper.activeIndex).find("a").addClass("over-link-activo");

                    //cambiar la ayuda<
                    var estaClase = "personas-home" + indicesNames[menuSwiper.activeIndex];
                    if( $("body").hasClass(estaClase) == true ){
                        parcialAyuda(indicesNames[menuSwiper.activeIndex], "reescribir");
                    }
                }
            });

            //Establecer slide inicial
            menuSwiper.swipeTo(valorInicial, 1, false);
            
            $("#navbar a").on("click", function(event) {
                event.preventDefault();
                var indice = $(this).parent().index(),
                    velocidad = 500;
                menuSwiper.swipeTo($(this).parent().index(), velocidad, true);
                if( $(window).width() <= 802 ){
                    setTimeout(function(){
                        $(".navbar-toggle").click()
                    }, 200);
                }
            });
            $(".modulo-pagos, .modulo-tramites, .modulo-consultas, .modulo-certificados, .contenedor-menu-touch div[class*='modulo-']").animate({
                "opacity": 1
            });
            $("body").css("background-color", colores[paginaInicial]);
            
            callbackSlider();
            
            var tab = GetURLParameter('tab');
            console.log('Pestana -> ' + tab);
			
            if(tab)
            {
                    $('.navbar-nav .item-menu-' + tab + ' a').trigger('click');
            }


            //recalcula el top de over-link
            $(document).ready(function(){
                    var	delayMultiplier = isIE8 == true ? 8 : 1;
                    setTimeout(
                            function(){
                                    marksLeft = [];
                                    marksWidth = [];
                                    top = $("#navbar li").eq(0).offset().top + $("#navbar li").eq(0).height() - 5;
                                    for(k=0; k< $("#navbar li").length; k++){
                                        marksLeft.push( $("#navbar li").eq(k).find("a").offset().left );
                                        marksWidth.push( $("#navbar li").eq(k).find("a").innerWidth() );
                                    }
                                    $(".over-link").css({
                                            "top": top,
                                            "left": marksLeft[menuSwiper.activeIndex]
                                    })
                                    if(isIE8 == true){
                                            $(".over-link").fadeIn();
                                    } else{
                                            $(".over-link").animate({"opacity": 1});
                                    }
                            }, 340 * delayMultiplier
                    );
            });
        }
    }
    
    console.log("IpsEnLinea - indicesNames.length -> " + indicesNames.length);

    //invocar todo
    for(i=0; i < indicesNames.length; i++){
        if(i != valorInicial){
            var nombreCapitalize =  indicesNames[i].substr(0, 1).toUpperCase() + indicesNames[i].substr(1, indicesNames[i].length - 1),
                estaUrl = prefijo + nombreCapitalize + extension;
            if(i == 0){
                estaUrl = "/Tramites/web/personaHomeTramites.jsf";
            }
            if(i == 1){
                estaUrl = "/Certificados/web/personas-home-certificados.jsf";
            }
            if(i == 2){
                estaUrl = "/Tramites/web/personaHomeConsultas.jsf";
            }
            if(i == 3){
                estaUrl = "/Pagos/web/personaHomePagos.jsf";
            }
            console.log("IpsEnLinea - Pestaña -> " + estaUrl);
            
            ajaxOtros(estaUrl, i);
        } else {
            wrapEl(valorInicial);
        }
    } 
 
};

//adjuntar parcial de menú lateral de usuario. También llama al parcial de ayuda con el contenido correspondiente.
function parcialMenu(alternativa) {
    $.ajax({
        type: "GET",
        url: "_menu-usuario.jsf",
        datatype: "html",
        cache: false,
        success: function(data) {
            var obj = data;
            if($(".contenedor-menu-touch").length != 0){
                $(".contenedor-menu-touch").after(obj);
            } else {
                $("body .container-fluid").first().append(obj);
            }
            if(alternativa == "sin-usuario"){
                $(".sidebar .nav-sidebar").find(".ml-usuario, .ml-alertas, .ml-cerrar-sesion").remove();
            }
            
            //llamar a divs de ayuda y de accesibilidad
            parcialAccesibilidad();
            
            if ($("body").hasClass("personas-home-pagos") == true) {
                parcialAyuda("pagos")
            } else if ($("body").hasClass("personas-home-tramites") == true) {
                parcialAyuda("tramites")
            } else if ($("body").hasClass("personas-home-certificados") == true) {
                parcialAyuda("certificados")
            } else if ($("body").hasClass("registro-personas") == true) {
                parcialAyuda();
            } else if ($("body").hasClass("datos-personales") == true) {
                parcialAyuda();
            } else if ($("body").hasClass("consulta-solicitudes") == true) {
                parcialAyuda();
            } else { //En revision
                parcialAyuda();
            }
            $(document).ready(function(){
                svgeezy.init('nocheck', 'png');
                $(".ml-usuario .camel").text( $(".ml-usuario .camel").text().toLowerCase() );
                if( $(window).width() <= 802 ){
                    $(".menu-lateral").removeClass("flowtype");
                }
            });
        }
    });
}

//adaptar menu para las interacciones nuevas
function adaptarMenuEnDestktop(metodo){
	/*if(metodo == "animar"){
		$(".menu-lateral").css("top", "8.5em");
		$(".menu-lateral").animate({"top": ($(window).height() - $(".menu-lateral").height()) / 2});
	} else {
		$(".menu-lateral").css("top", ($(window).height() - $(".menu-lateral").height()) / 2);
	}*/
}

function adaptarMenuEnMobile(){
	/*var obj = $(".navbar-header button"),
		targ = $(".menu-lateral"),
		estado = obj.hasClass("collapsed") == false && obj.length != 0 ? "open" : "closed";
	targ.css("top", "8.5em");
	if(estado == "open"){
		targ.css("top", "22.75em");
	}
/*	if(estado == "closed" && $("body").hasClass("personas-home-tramites") == false && $("body").hasClass("personas-home-pagos") == false && $("body").hasClass("personas-home-certificados") == false ){
		targ.css("top", "5.5em");
	}*/
}

//traer la parcial de ayuda y accesibilidad
function parcialAccesibilidad() {            
    $.ajax({
        type: "GET",
        url: "_accesibilidad.jsf",
        datatype: "html",
        cache: false,
        success: function(data) {
            var obj = data;
            $("body").append(obj);
            //llamar a las funciones de ayuda y accesibilidad
            
            $(".callcenter").on("click", function() {
                var xs = $(window).width() <= 767 ? 1 : 0,
                    esteLi = $(this).parent(),
                    top = esteLi.closest(".menu-lateral").position().top + esteLi.position().top + "px",
                    left = esteLi.offset().left + esteLi.width() + "px",
                    width = "18em",
                    height = esteLi.height() + "px",
                    cerrar = "<span class='fa fa-times'></span>",
                    estilo = xs == 1 ? "top:18em; left: 0; height: auto; width: 100%; padding: 0 1.1em;" : "top:" + top + "; left:" + left + "; width:1px; height:" + height + "; padding:0; background: white; box-shadow: 3px 0 12px rgba(0, 0, 0, 0.31);",
                    contenido = xs == 1 ? "<p style='display: none; text-align: center; font-size: 1.0em; padding: 0.5em;'><span class='fa fa-times'></span> Para mayor información llamar al Call Center <a href='tel:101' style='white-space: nowrap;'>101</a><br>De lunes a jueves entre 08:00 y 20:00 horas y Viernes entre 08:00 y 18:00 horas.</p>" : "<p style='display: none; margin: 0; height: 100%; width: 100%; padding: 0.3em 1em;'><span class='fa fa-times'></span>Para mayor información llamar al<br> Call Center <a href='tel:101'> 101</a><br><span style='font-size: 0.8em; font-weight:bold;'> De lunes a jueves entre 08:00 y 20:00 horas y Viernes entre 08:00 y 18:00 horas.</span></p>",
                    div = "<div class='overlay-callcenter' style='position:fixed; z-index: 9999999999;" + estilo + "opacity;0'>" + contenido + "</div>";
                if ($(this).hasClass("activo") == true) {
                    $(".overlay-callcenter p").fadeOut();
                    if (xs == 0) {
                        $(".overlay-callcenter").animate({
                            "opacity": 0,
                            "width": 1
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                    } else {
                        $(".overlay-callcenter").animate({
                            "opacity": 0
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                        $(".callcenter").closest(".sidebar").next("div").animate({
                            "top": "0"
                        }, function() {
                            $(".callcenter").closest(".sidebar").next("div").removeAttr("style")
                        })
                    }
                }
                if ($(this).hasClass("anadido") == false) {
                    $("body").append(div);
                    $(".callcenter").addClass("activo anadido");
                    if (xs == 0) {
                        $(".overlay-callcenter").animate({
                            "opacity": 1,
                            "width": width
                        }, function() {
                            $(".overlay-callcenter p").fadeIn()
                        });
                    } else {
                        $(".callcenter").closest(".sidebar").next("div").animate({
                            "top": "5.5em"
                        })
                        $(".overlay-callcenter").animate({
                            "opacity": 1
                        }, function() {
                            $(".overlay-callcenter p").fadeIn()
                        });
                    }
                }
                $(".overlay-callcenter .fa.fa-times").on("click", function(){
                    $(".overlay-callcenter p").fadeOut();
                    if (xs == 0) {
                        $(".overlay-callcenter").animate({
                            "opacity": 0,
                            "width": 1
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                    } else {
                        $(".overlay-callcenter").animate({
                            "opacity": 0
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                        $(".callcenter").closest(".sidebar").next("div").animate({
                            "top": "0"
                        }, function() {
                            $(".callcenter").closest(".sidebar").next("div").removeAttr("style")
                        })
                    }
                });
            });
            
            /*$(".callcenter").on("focusout", function() {
                var xs = $(window).width() <= 767 ? 1 : 0;
                if ($(this).hasClass("activo") == true) {
                    $(".overlay-callcenter p").fadeOut();
                    if (xs == 0) {
                        $(".overlay-callcenter").animate({
                            "opacity": 0,
                            "width": 1
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                    } else {
                        $(".overlay-callcenter").animate({
                            "opacity": 0
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                        $(".callcenter").closest(".sidebar").next("div").animate({
                            "top": "0"
                        }, function() {
                            $(".callcenter").closest(".sidebar").next("div").removeAttr("style")
                        })
                    }
                }
            });*/
            $(window).on("resize", function() {
                var xs = $(window).width() <= 767 ? 1 : 0;
                if ($(".callcenter").hasClass("activo") == true) {
                    $(".overlay-callcenter p").fadeOut();
                    if (xs == 0) {
                        $(".overlay-callcenter").animate({
                            "opacity": 0,
                            "width": 1
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                    } else {
                        $(".overlay-callcenter").animate({
                            "opacity": 0
                        }, function() {
                            $(".overlay-callcenter").remove();
                            $(".callcenter").removeClass("activo anadido");
                        });
                        $(".callcenter").closest(".sidebar").next("div").animate({
                            "top": "0"
                        }, function() {
                            $(".callcenter").closest(".sidebar").next("div").removeAttr("style")
                        })
                    }
                }
            });
            //$(document).ready(function() {
            bs1 = $('a[data-id=menu-link-1]').bigSlide({
                'menu': ('#inclusividad'),
                'push': ('.flowtype'),
                'side': 'left',
                'menuWidth': '15.625em',
                'speed': '300',
                'state': 'closed',
                'activeBtn': 'active',
                'easyClose': false,
                'beforeOpen': function(){
                    $("#inclusividad").css("visibility", "visible");
                    if ($('a[data-id=menu-link-2]').hasClass("active") == true) {
                        bs2.bigSlideAPI.view.toggleClose();
                    }
                },
                'afterClose': function(){
                    setTimeout( function(){ $("#inclusividad").css("visibility", "hidden"); }, 200);
                }
                
            });
            svgeezy.init('nocheck', 'png');
            //});
            $('#inclusividad a.cerrar').on("click", function() {
                $('.nav-sidebar a[data-id=menu-link-1]').click();
                //$(".text-inclusividad").trigger("click");
            });
            /*$('a[data-id=menu-link-1]').mouseup(function() {
                if ($('a[data-id=menu-link-2]').hasClass("active") == true) {
                    $("#ayuda .cerrar").trigger("click")
                }
            });*/
            
            (function(factory) {
                    if (typeof define === 'function' && define.amd) {
                        define(['jquery'], factory)
                    } else {
                        factory(jQuery)
                    }
                }
                (function($) {
                    var pluses = /\+/g;

                    function raw(s) {
                        return s
                    }

                    function decoded(s) {
                        return decodeURIComponent(s.replace(pluses, ' '))
                    }

                    function converted(s) {
                        if (s.indexOf('"') === 0) {
                            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
                        }
                        try {
                            return config.json ? JSON.parse(s) : s
                        } catch (er) {}
                    }
                    var config = $.cookie = function(key, value, options) {
                        if (value !== undefined) {
                            options = $.extend({}, config.defaults, options);
                            if (typeof options.expires === 'number') {
                                var days = options.expires,
                                    t = options.expires = new Date();
                                t.setDate(t.getDate() + days)
                            }
                            value = config.json ? JSON.stringify(value) : String(value);
                            return (document.cookie = [config.raw ? key : encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
                        }
                        var decode = config.raw ? raw : decoded;
                        var cookies = document.cookie.split('; ');
                        var result = key ? undefined : {};
                        for (var i = 0, l = cookies.length; i < l; i++) {
                            var parts = cookies[i].split('=');
                            var name = decode(parts.shift());
                            var cookie = decode(parts.join('='));
                            if (key && key === name) {
                                result = converted(cookie);
                                break
                            }
                            if (!key) {
                                result[name] = converted(cookie)
                            }
                        }
                        return result
                    };
                    config.defaults = {};
                    $.removeCookie = function(key, options) {
                        if ($.cookie(key) !== undefined) {
                            $.cookie(key, '', $.extend({}, options, {
                                expires: -1
                            }));
                            return true
                        }
                        return false
                    }
                })
            );
            
            /** AÑADE FONTICON AL HTML **/
            $(".texto-inclusividad.en-linea.texto-grises").prepend('<span class="fa fa-spinner"></span>');
            $("#accesibilidad > :nth-child(6) a").attr('href', '#');
            $("#accesibilidad > :nth-child(6) a").attr('id', 'restaurar');
            /*** RESTAURAR ACCESIBILIDAD ***/
            $("#restaurar").on("click", function() {
                    location.reload();
                    //$.removeCookie('contraste');
                    $.removeCookie('contraste');
                    $.removeCookie('link');
                    $(".filter-check").prop("checked", false);
                    $("input.underline-check").prop("checked", false);
                })
                /** CARGA CHECKBOX ESCALA GRISES **/
            $(".fa-spinner").hide();
            $('.filter-check').on('change', function(e) {
                if ($.cookie('contraste') === null) {
                    $.cookie('contraste', 'on');
                    escalaGrises("to");
                    $('a').css('box-shadow', 'none');
                    $("body").addClass("grayscale");
                    e.preventDefault();
                    return false
                } else {
                    if ($.cookie('contraste') == 'on') {
                        $.cookie('contraste', 'off');
                        escalaGrises("from");
                        $('a').css('box-shadow', '')
                        $("body").removeClass("grayscale");        
                        e.preventDefault();
                        return false
                    } else {
                        $.cookie('contraste', 'on');
                        $("body").css({
                            "pointer-events": "none"
                        });
                        $(".filter-check").hide(100, function() {
                            $(".fa-spinner").addClass("fa-spin").fadeIn(2000, function() {
                                $("body").css({
                                    "pointer-events": "auto"
                                });
                                $(".fa-spinner").removeClass("fa-spin").hide();
                                $(".filter-check").show()
                                escalaGrises("to");
                                $('a').css('box-shadow', 'none')
                                $("body").addClass("grayscale");
                                e.preventDefault();
                                return false
                            });
                        });
                    }
                }
            });
            /** CARGA CHECKBOX LINK SUBRAYADOS**/
            $('input.underline-check').on('change', function(e) {
                if ($.cookie('link') === null) {
                    $.cookie('link', 'on');
                    $('a').css('text-decoration', 'underline');
                    e.preventDefault();
                    return false
                } else {
                    if ($.cookie('link') == 'on') {
                        $.cookie('link', 'off');
                        $('a').css('text-decoration', 'none');
                        e.preventDefault();
                        return false
                    } else {
                        $.cookie('link', 'on');
                        $('a').css('text-decoration', 'underline');
                        e.preventDefault();
                        return false
                    }
                }
            });
            /*** CHECKBOX GRISES Y SUBRAYADAS MARCADOS ***/
            if ($.cookie('link') == 'on' && $.cookie('contraste') == 'on') {
                $(".filter-check").prop("checked", true);
                escalaGrises("to");
                $('a').css('box-shadow', 'none');
                $("body").addClass("grayscale");
                $("input.underline-check").prop("checked", true);
                $('a').css('text-decoration', 'underline');
                //return false
            } else if ($.cookie('contraste') == 'on') {
                $(".filter-check").prop("checked", true);
                escalaGrises("to");
                $('a').css('box-shadow', 'none')
                $("body").addClass("grayscale");
                    //return false
            } else if ($.cookie('link') == 'on') {
                $("input.underline-check").prop("checked", true);
                $('a').css('text-decoration', 'underline');
                //return false
            }
        }
    });
}

//traer la parcial de ayuda
function parcialAyuda(seccion, metodo) {
	if( seccion == undefined){ seccion = "generica" }
    $.ajax({
        type: "GET",
        url: "_ayuda-" + seccion + ".jsf",
        datatype: "html",
        async: true,
        success: function(data) {
            var obj = data;
			if(metodo == "reescribir"){
				$("#ayuda").html( $(obj).find(".child.contRelative") );
				$('#ayuda a.cerrar').on("click", function() {
					$('a[data-id=menu-link-2]').click();
				});
				$('a[data-id=menu-link-2]').mouseup(function() {
					if ($('a[data-id=menu-link-1]').hasClass("active") == true) {
						$("#inclusividad .cerrar").trigger("click")
					}
				});
				
				$("#ayuda ul li a").click(function(event) {
					event.stopPropagation();
					event.preventDefault();
					var enlace = $(this).attr("href");
					$("body").append("<div class='overlay' style='top:" + $(this).offset().top + "px; left:" + $(this).offset().left + "px; width: 1vw; height: 1vw'></div>");
					$(".overlay").animate({
						"top": 0,
						"left": 0,
						"width": "100%",
						"height": "100%",
						"opacity": "1"
					}, function() {
						window.open(enlace, '_self');
					});
				});
			} else {
            	$("body").append(obj);
				//llamar a las funciones de ayuda y accesibilidad
				$(document).ready(function() {
					bs2 = $('a[data-id=menu-link-2]').bigSlide({
						'menu': ('#ayuda'),
						'push': ('.flowtype'),
						'side': 'left',
						'menuWidth': '15.625em',
						'speed': '300',
						'state': 'closed',
						'activeBtn': 'active',
						'easyClose': false,
                                                'beforeOpen': function(){
                                                    $("#ayuda").css("visibility", "visible");
                                                    if ($('a[data-id=menu-link-1]').hasClass("active") == true) {
                                                        bs1.bigSlideAPI.view.toggleClose();
                                                    }
                                                },
                                                'afterClose': function(){
                                                    setTimeout(function(){ $("#ayuda").css("visibility", "hidden"); }, 200);
                                                }
					});
					
				});
				$('#ayuda a.cerrar').on("click", function() {
					$('a[data-id=menu-link-2]').click();
				});
				$('a[data-id=menu-link-2]').mouseup(function() {
					if ($('a[data-id=menu-link-1]').hasClass("active") == true) {
						$("#inclusividad .cerrar").trigger("click")
					}
				});
				$("#ayuda ul li a").click(function(event) {
					event.stopPropagation();
					event.preventDefault();
					var enlace = $(this).attr("href");
					$("body").append("<div class='overlay' style='top:" + $(this).offset().top + "px; left:" + $(this).offset().left + "px; width: 1vw; height: 1vw'></div>");
					$(".overlay").animate({
						"top": 0,
						"left": 0,
						"width": "100%",
						"height": "100%",
						"opacity": "1"
					}, function() {
						window.open(enlace, '_self');
					});
				});
			}
        }
    });
}

//parcial header
function parcialHeader(){
	$.ajax({
		type: "GET",
		url: "_header.jsf",
		datatype: "html",
		success: function(data){
			var obj = data;
			$(".container-fluid").prepend(obj);
		}
	});
}

function addSalto(selector, caracter){
    var salto = "<br class='hidden-xs'/>",
        el = $(selector),
        texto = el.text(),
        separado = texto.split(caracter),
        output = "";
    for(i = 0; i < separado.length; i++){
        if(i != separado.length - 1){
            output += separado[i] + caracter
        } else {
            output += salto + separado[i]
        }
    }
    el.html(output);
}

function addPhone(selector, arrayCortes){
    var texto = selector.text(),
        numeros = "0123456789",
        textoLimpio = texto.replace(/\ /g, "").replace(/\-/g, ""),
        num = "",
        numEspaciado = "",
        numEnlace = "",
        indiceInsertar = 0,
        indiceTerminar = 0,
        nuevoTexto;
    for(i=0; i<texto.length; i++){
        if( numeros.indexOf(texto.split("")[i]) != -1 && indiceInsertar == 0 ){
            indiceInsertar = i;
        }
        if( numeros.indexOf(texto.split("")[i]) != -1 && indiceInsertar != 0 ){
            indiceTerminar = i;
        }
    }
    for(i=0; i < textoLimpio.length; i++){
        if( numeros.indexOf(textoLimpio.split("")[i]) != -1 ){
            num += textoLimpio.split("")[i];
        }
    }
    if(arrayCortes != undefined){
        for(i=0; i < arrayCortes.length; i++){
            if(i==0){
                numEspaciado += num.slice(0, arrayCortes[i]) + " ";
            } else if(i != arrayCortes.length -1){
                numEspaciado += num.slice(arrayCortes[i- 1], arrayCortes[i]) + " ";
            } else {
                numEspaciado += num.slice(arrayCortes[i- 1], arrayCortes[i]) + " " + num.slice(arrayCortes[i], num.length);
            }
        }
    } else {
        numEspaciado = num;
    }
    numEnlace = "<a href='tel:" + num + "' class='enlace-telefono'>" + numEspaciado + "</a>";
    nuevoTexto = texto.slice(0, indiceInsertar) + numEnlace + texto.slice(indiceTerminar + 1, texto.length);
    selector.html(nuevoTexto)
}

//funciones custom endregion

//llamadas region
function callbackSlider(){
    
    //ejecutar funciones luego de terminar de cargar el menu slider del home
    
    llamarContenidoExterno( "/Certificados/web/personas-home-consultas.jsf", ".modulo-consultas .row .md-destacado-afp", $(".modulo-consultas .row").eq(1), "prepend", function(){ quitarOffset(".modulo-consultas .row .md-destacado-afp") });
    
    llamarContenidoExterno( "/Certificados/web/personas-home-pagos.jsf", ".modulo-pagos .row .cap-1-1-1" , $(".modulo-pagos .row ").eq(0), "preppend", function(){ quitarOffset(".modulo-pagos .row .md-destacado") });
    llamarContenidoExterno( "/Certificados/web/personas-home-pagos.jsf", ".modulo-pagos .row .cap-1-1-2" , $(".modulo-pagos .row ").eq(0), "preppend", function(){ quitarOffset(".modulo-pagos .row .md-destacado") });
    llamarContenidoExterno( "/Certificados/web/personas-home-pagos.jsf", ".modulo-pagos .row .cap-1-1-3" , $(".modulo-pagos .row ").eq(0), "preppend", function(){ quitarOffset(".modulo-pagos .row .md-destacado") });
    llamarContenidoExterno( "/Certificados/web/personas-home-pagos.jsf", ".modulo-pagos .row .cap-1-1-4" , $(".modulo-pagos .row ").eq(0), "preppend", function(){ quitarOffset(".modulo-pagos .row .md-destacado") });
    
    $('#personaHomeTramitesSub').click(function(){
        $('#goSub').click();
    });
    
    if(detectIE()==false){
        $('#pdfIncl').attr("href","pdfIncumplimiento.jsf").attr("target","_new");
    }else{
        $('#pdfIncl').click(function(){
            $('#comprobanteIncumplimientoIE\\:pdfIncumplimientoIE').trigger("click");
        });
    }
}

	$(document).ready(function(){
		if( $("body").hasClass("fade-in") == true ){
			$("body .container, body .container-fluid").animate({ "opacity": 1 });
		}
		if($("#consultaExpress\\:output").text()==""){
			if($(".consulta-pagos .respuesta").length>0){
				consultar(1);
			}
		}
		if($('div[data-provide=datepicker]').length > 0){
			$('div[data-provide=datepicker]').not(".p11").datepicker({
				format: 'dd/mm/yyyy', language: 'es',
                                endDate: hoy.toLocaleDateString()
                                
			}).on("changeDate", function(e) {
				guardarALocalStorage( $(this).find("input"));
		        	
			}).on("focusout", function(){
                                
				var valor = $(this).find("input").val(),
		        		valorFecha = new Date(valor.split("/")[1] + "/" + valor.split("/")[0] + "/" + valor.split("/")[2]),
		        		valorTiempo = valorFecha.getTime(),
		        		timeHoy = new Date().getTime();
		        	if( valorTiempo > timeHoy || valorFecha == "Invalid Date"){
		        		$(this).find("input").val("");
                                        localStorage.removeItem($(this).find("input").attr("id") );
		        	}
			});
		}
                
                setTimeout(function(){
                    addPhone($(".agregar-telefono-1"), [3, 6]);
                    addPhone($(".pago-mandatario"), [3, 6]);
                }, 500);
	});

	 //llamadas rellenar con JSON region
	 
	//inicio
	 if( $("body").hasClass("inicio") == true){
	 	var arrInicio = [
						["title_capsule_persona", ".persona h2"],
                        ["text_informacion_persona", ".persona-txt .info"],
                        //["message_capsule_persona", ".persona-txt .collapse p"],
						["btn_capsule_persona", ".persona-txt .info-ico-footer a"],
                        ["title_capsule_empresa", ".empresa h2"],
                        ["text_informacion_empresa", ".empresa-txt .info"],
                        //["message_capsule_empresa", ".empresa-txt .collapse p"],
                        ["btn_capsule_empresa", ".empresa-txt .info-ico-footer a"],
                        ["title_capsule_consultaexpress1",".consulta h2 .uno"],
						["title_capsule_consultaexpress2",".consulta h2 .dos"],					
						["text_informacion_consultaexpress", ".consulta-txt .info"],
						//["message_capsule_consultaexpress", ".consulta-txt .collapse p"]
                        ["btn_capsule_consultaexpress", ".consulta-txt .info-ico-footer a"],
                        ["title_modal_personas", ".txt-modal-personas h2"],
                        ["txt_modal_personas", ".txt-modal-personas p"],
                        ["title_modal_empresa", ".txt-modal-empresa h2"],
                        ["txt_modal_empresa", ".txt-modal-empresa p"],
                        ["title_modal_consulta", ".txt-modal-consulta h2"],
                        ["txt_modal_consulta", ".txt-modal-consulta p"],
                        ["sub_title_tres_modal", ".subtitle-modal"],
                        ["capsule_modal_tramitesyconsultas", ".cap-tramite"],
                        //["txt_modal_tramitesyconsultas", "."],
                        ["capsule_modal_pagosyconsultas", ".cap-pagos"],
                        //["txt_modal_pagosyconsultas", "."],
                        ["capsule_modal_certificados", ".cap-certificados"],
                        //["txt_modal_certificados", "."],
                        ["capsule_modal_notificaciones", ".cap-notificaciones"]
                        //["txt_modal_notificaciones", ""]
					];
		rellenarJSON("/Tramites/web/properties.jsf", arrInicio);
	 }
	
    //registro-personas
	 if( $("body").hasClass("registro-personas") == true){
	 	var arrRegistroPersonas = [
    
                        ["title_page_registropersonas", "h2.titulo-light .uno"],
                        ["title_page_registropersonas2", "h2.titulo-light .dos"],
                        ["run_registropersonas", "label[for=login\\:run]"],
                        ["numeroserie_numerodocumento_registropersonas", "label[for=login\\:nSerieCedula]"],
                        ["cedulaactual_registropersonas", ".margin-top-20.collapse > p:first-child"],
                        ["cedulaantigua_registropersonas", ".margin-top-20.collapse .text-apoyo.text-ca"],
                        ["btn_ingresar_registropersonas", ".btn-ingresar"]
                    ];
		rellenarJSON("/Tramites/web/properties.jsf", arrRegistroPersonas);
	 }    


	//personas-home-pagos
        function textos_pagos(){
            var arrHomePagos = [
                        ["title_page_pagos", ".navbar-nav .item-menu-4 a"],
                        ["title_capsule_pagos", ".modulo-pagos .txt-pagos"],
                        ["mesage_capsule_pagos", ".modulo-pagos .descripcion"],
                        ["title_capsule_consultapagos", ".consulta-cartola-pago h3"],
                        ["title_capsule_liqpagoemail", ".liquidaciones-pago-por-email h3"],
                        ["title_capsule_consultafechapago", ".consulta-fecha-pago h3"],
                        ["title_capsule_consultapagospendientes", ".consulta-pagos-pendientes h3"]
                    ];
		rellenarJSON("/Tramites/web/properties.jsf", arrHomePagos);
        }
	if( $("body").hasClass("personas-home-pagos") == true){
	 	textos_pagos()
	 }

	//personas-home-tramites
        function textos_tramites(){
            var arrHomeTramites = [
                    ["title_page_tramites", ".navbar-nav .item-menu-1 a"],
                    ["title_capsule_tramites", ".modulo-tramites-titulo"],
                    //["mesage_capsule_tramites", ".descripcion"],
                    //["title_capsule_solicitudbeneficio", ".mod1"],
                    //["title_capsule_solicitudbeneficio1", ".md-destacado-izquierda .md-titulo h3"],
                    ["title_capsule_solicitudbeneficio2", ".md-destacado-izquierda .md-titulo h3 .title-dos"],
                    //["title_capsule_solicitudbeneficio3", ".md-destacado-izquierda .md-titulo h3"],
                    //["title_capsule_aportefamiliar", ".md-destacado-derecha .md-texto p"],//agregar
                    ["title_capsule_consultasolicitudes", ".md-regular-izquierda .md-titulo h3"],//agregar
                    ["text_capsule_consultasolicitudes", ".md-regular-izquierda .md-texto p"],//agregar
                    ["title_capsule_solicitudpormuerte1", ".md-regular-derecha .md-titulo .t-uno"],
                    ["title_capsule_solicitudpormuerte2", ".md-regular-derecha .md-titulo .t-dos"],
                    ["text_capsule_solicitudpormuerte", ".md-regular-derecha .md-texto p"],
                    ["li_solicitudbeneficio_pensionvejez",".texto-beneficio-1"],
                    ["li_solicitudbeneficio_aportevejez",".texto-beneficio-2"],
                    ["li_solicitudbeneficio_pensioninvalidez",".texto-beneficio-3"],
                    ["li_solicitudbeneficio_aporteinvalidez",".texto-beneficio-4"],
                    ["li_solicitudbeneficio_bonoporhijo",".texto-beneficio-5"],
                    
                    ["title_solicitudbeneficio_beneficiosdestacados",".t-bd"],
                    ["li_solicitudbeneficio_bonoporhijo",".t-bono-por-hijo"],
                    ["li_solicitudbeneficio_asignacionfamiliar",".t-asig-familiar"],
                    ["title_solicitudbeneficio_pilarsolidario",".t-pilar-solidario"],
                    ["li_solicitudbeneficio_aportevejez1",".t-aporte-vejez-1"],
                    ["li_solicitudbeneficio_aportevejez2",".t-aporte-vejez-2"],
                    ["li_solicitudbeneficio_aporteinvalidez1",".t-aporte-invalidez-1"],
                    ["li_solicitudbeneficio_aporteinvalidez2",".t-aporte-invalidez-2"],
                    ["li_solicitudbeneficio_pensionvejez1",".t-pension-vejez-1"],
                    ["li_solicitudbeneficio_pensionvejez2",".t-pension-vejez-2"],
                    ["li_solicitudbeneficio_pensioninvalidez1",".t-pension-invalidez-1"],
                    ["li_solicitudbeneficio_pensioninvalidez2",".t-pension-invalidez-2"]
						
                ];
		rellenarJSON("/Tramites/web/properties.jsf", arrHomeTramites);
        }
	    if( $("body").hasClass("personas-home-tramites") == true){
            textos_tramites()
        }


        //personas-home-consultas
        function textos_consultas(){
            var arrHomeConsultas = [
                    ["title_page_consultas", ".navbar-nav .item-menu-3 a"],
                    ["title_capsule_consultas", ".modulo-consultas-titulo"],
                    //["mesage_capsule_tramites", ".descripcion"],
                    //["title_capsule_solicitudbeneficio", ".mod1"],
                    //["title_capsule_solicitudbeneficio1", ".md-destacado-izquierda .md-titulo h3"],
                    ["title_capsule_solicitudbeneficio2", ".md-consulta-solicitudes .md-titulo h3 .title-dos"],
                    //["title_capsule_solicitudbeneficio3", ".md-destacado-izquierda .md-titulo h3"],
                    //["title_capsule_aportefamiliar", ".md-destacado-derecha .md-texto p"],//agregar
                    ["title_capsule_consultasolicitudes", ".md-consulta-solicitudes .md-titulo h3"],//agregar
                    ["text_capsule_consultasolicitudes", ".md-consulta-solicitudes .md-texto p"],//agregar
                    //["title_capsule_solicitudpormuerte1", ".md-regular-derecha .md-titulo .t-uno"],
                    //["title_capsule_solicitudpormuerte2", ".md-regular-derecha .md-titulo .t-dos"],
                    //["text_capsule_solicitudpormuerte", ".md-regular-derecha .md-texto p"],
                    ["li_solicitudbeneficio_pensionvejez",".texto-beneficio-1"],
                    ["li_solicitudbeneficio_aportevejez",".texto-beneficio-2"],
                    ["li_solicitudbeneficio_pensioninvalidez",".texto-beneficio-3"],
                    ["li_solicitudbeneficio_aporteinvalidez",".texto-beneficio-4"],
                    ["li_solicitudbeneficio_bonoporhijo",".texto-beneficio-5"]
						
                ];
		rellenarJSON("/Tramites/web/properties.jsf", arrHomeConsultas);
        }
	    if( $("body").hasClass("personas-home-consultas") == true){
            textos_consultas()
        }
    
        //personas-home-certificado
        function textos_certificados(){
            var arrHomeCertificados = [
                                ["title_page_certificados", ".navbar-nav .item-menu-2 a"],
                                ["title_capsule_certificados", ".modulo-certificados .txt-certificados"],
                                ["mesage_capsule_certificados", ".modulo-certificados .descripcion"],
                                ["title_capsule_certificadorenta", ".modulo-certificados .mod1"],
                                ["title_capsule_certificadopensionado", ".modulo-certificados .mod2"],
                                ["title_capsule_certificadopension", ".modulo-certificados .mod3"]
					];
        	rellenarJSON("/Tramites/web/properties.jsf", arrHomeCertificados);
        }
	if( $("body").hasClass("personas-home-certificados") == true){
             textos_certificados()
	 }


	//pagos-pendientes y consulta-pagos
	if( $("body").hasClass("consulta-pagos") == true){
	 	var arrConsultaPagos = [
						["title_consultapago", ".consulta-cp > div > form > div > div:nth-child(2) > h2"],
					 	["mensaje_consultapago", ".consulta-cp > div > form > div > div:nth-child(2) > p"],
					 	["label_run_consultapago", ".consulta-cp label[for=rut]"],
					 	["boton_volver_consultapago", ".consulta-cp .btn-volver"],
					 	["boton_consultar_consultapago", ".consulta-cp .consultar"],
                        
			
						["title_pagoregistrado", ".respuesta1 div.col-xs-12.titulo h1"],
						["mensaje_uno_pagoregistrado",".respuesta1 .titulo > p"],
						["mensaje_dos_pagoregistrado",".respuesta1 .importante .texto2.detalles-1"],
						["info_title_uno_pagoregistrado",".respuesta1 .detalles .texto1 strong"],
						["info_mensaje_uno_pagoregistrado",".respuesta1 .detalles .texto1 span"],
						["info_title_dos_pagoregistrado",".respuesta1 .detalles .texto2 strong"],
						["info_title_tres_pagoregistrado",".respuesta1 .detalles .texto3 strong"],
						["info_mensaje_tres_pagoregistrado","append.respuesta1 .detalles .texto3 strong"],
						["boton_otrorun_pagoregistrado",".btn-otro-run"],
			
						["title_nohaypago",".respuesta2 h1"],
						["descripcion_nohaypago",".respuesta2 .texto"],
						["info_title_tres_pagoregistrado",".respuesta2 .texto2"],
						["info_mensaje_tres_pagoregistrado","append.respuesta2 .texto2"],
					];
		rellenarJSON("/Tramites/web/properties.jsf", arrConsultaPagos);
	 }

	//apsi
	var primeraParte, segundaParte, string2_1, string4_1, string4_2, string5_1, string7_1;
	if( $("body").hasClass("apsi") == true){
	 	var arrAPSI = [
                            ["li_solicitudbeneficio_aporteinvalidez", ".titulo-pagina"],
                            ["text_title_cuestionario_uno", ".formulario-apsi > h4"],
                            ["text_subtitle_cuestionario", ".paso1 h3"],
                            ["text_subtitle_cuestionario", "varprimeraParte"],
                            ["text_preg_uno", ".pregunta1 .pregunta-cuestionario"],
                            ["text_preg_dos", ".pregunta2 .pregunta-cuestionario"],
                            ["text_preg_dos_subpregunta_1", "label.fecha-diagnostico-lb"],
                            ["text_recomendacion",  ".recomendacion2 .recomendacion .titulo-r"],
                            ["text_subtitle_cuestionario_2", ".title-segunda-parte"],
                            ["text_preg_dos_recomendacion", "varstring2_1"],
                            ["text_preg_tres", ".pregunta3 .pregunta-cuestionario"],
                            ["text_preg_tres_uno", ".pregunta3 label.centro-medico-lb"],
                            ["text_preg_tres_dos", ".pregunta3 label.nombre-doctor-lb"],
                            ["text_preg_tres_tres", ".pregunta3 label.otro-lb"],
                            ["text_preg_cuatro", ".pregunta4 .pregunta-cuestionario"],
                            ["text_recomendacion", ".recomendacion4 .titulo-r"],
                            ["text_recomendacion_detalle_cuatro", "varstring4_1"],
                            ["text_recomendacion_detalle_cuatro_dos", "varstring4_2"],
                            ["text_subtitle_custionario_3", ".title-tercera-parte"],
                            ["text_preg_cinco", ".pregunta5 .pregunta-cuestionario"],
                            ["text_preg_cinco_dos", ".pregunta5 label.cuanto-tiempo-lb"],
                            ["text_preg_cinco_tres", ".pregunta-5-2 label"],
                            ["text_recomendacion", ".recomendacion5 .titulo-r"],
                            ["text_recomendacion_detalle_cinco", "varstring5_1"],
                            ["text_preg_seis", ".pregunta6 .pregunta-cuestionario"],
                            ["text_recomendacion", ".pregunta6 .titulo-r"],
                            ["text_recomendacion_detalle_seis", ".pregunta6 .recomendacion .texto"],
                            ["text_subtitle_cuestionario_4", ".title-cuarta-parte"],
                            ["text_preg_siete", ".pregunta7 .pregunta-cuestionario"],
                            ["text_recomendacion", ".pregunta7 .titulo-r"],
                            ["text_recomendacion_detalle_siete", "varstring7_1"],
                            ["text_recomendacionfinal_title", ".recomendacion-final .recomendacion .titulo-rf"],
                            ["text_recomendacionfinal_subtitle", ".recomendacion-final .descripcion-rf"],
                            ["text_recomendacionfinal_li_uno", ".recomendacion-final .lista-item1-rf"],
                            ["text_recomendacionfinal_li_dos", ".recomendacion-final .lista-item2-rf"],
                            ["text_recomendacionfinal_li_tres", ".recomendacion-final .lista-item3-rf"],
                            ["text_title_cuestionario_2", "varsegundaParte"],
                            ["text_subtitle_cuestionario_5", ".title-quinta_parte"],
                            ["text_preg_ocho", ".pregunta8 .pregunta-cuestionario"],
                            ["text_checkbox_analfabeto", ".pregunta8 .multi-radio .nivel-educacional-1"],
                            ["text_checkbox_edbasica", ".pregunta8 .multi-radio .nivel-educacional-2"],
                            ["text_checkbox_edmedia", ".pregunta8 .multi-radio .nivel-educacional-3"],
                            ["text_checkbox_edsuperior", ".pregunta8 .multi-radio .nivel-educacional-4"],
                            ["text_preg_nueve", ".pregunta9 .pregunta-cuestionario"],
                            ["text_subtitle_cuestionario_6", ".title-sexta-parte"],
                            ["text_preg_diez", ".pregunta10 .pregunta-cuestionario"],
                            ["text_preg_once", ".pregunta11 .pregunta-cuestionario"],
                            ["text_preg_once_fecha", "label[for='ficha\\:fechaPresentaEvaluacionInvalidez']"],
                            ["text_preg_once_aproximadamente", ".hace-aprox"],
                            ["text_preg_once_anios", "label[for='ficha\\:aniosPresentaEvaluacionInvalidez']"],
                            ["text_preg_once_meses", "label[for='ficha\\:mesesPresentaEvaluacionInvalidez']"],
                            ["text_preg_once_semanas", "label[for='ficha\\:semanasPresentaEvaluacionInvalidez']"],   
                            ["text_subtitle_cuestionario_7", ".title-septima-parte"],
                            ["text_preg_doce", ".pregunta12 .pregunta-cuestionario"],
                            ["text_preg_doce_sub_item_title", ".confirmacion-12 h6"],
                            ["text_preg_doce_sub_item_subtitle", ".confirmacion-12 .sub"],
                            ["text_preg_doce_sub_item_pregunta_2", ".confirmacion-12 .subsub"],
                            ["text_uno_notificacionapsi", ".confi-uno-notificacion"],
                            ["text_uno_notificacionapsi_subuno", ".confi-uno-notificacion-subuno"],
                            ["text_uno_notificacionapsi_subdos", ".confi-uno-notificacion-subdos"],
                            ["text_uno_notificacionapsi_subtres", ".notificacion-aceptar"],
                            ["text_dos_notificacionapsi", ".confi-dos-notificacion"],
                            ["text_dos_notificacionapsi_subuno", ".confi-dos-notificacion-subuno"],
                            ["text_dos_notificacionapsi_subdos", ".confi-dos-notificacion-subdos"],
                            ["text_tres_notificacionapsi", ".config-tres"]
					];
			rellenarJSON("/Tramites/web/properties.jsf", arrAPSI);
	 }

	//pbsi
	if( $("body").hasClass("pbsi") == true){
	 	var arrPBSI = [
						["text_tab_pensioninvalidez", ".titulo-pagina"],
					 	["text_title_cuestionario_uno", ".formulario-apsi > h4"],
						["text_subtitle_cuestionario", ".formulario h5"],
						["text_subtitle_cuestionario", "varprimeraParte"],
						["text_preg_uno", ".pregunta1 .pregunta-cuestionario"],
						["text_preg_dos", ".pregunta2 .pregunta-cuestionario"],
						["text_preg_dos_subpregunta_1", "label.fecha-diagnostico-lb"],
						["text_recomendacion",  ".recomendacion2 .recomendacion .titulo-r"],
						["text_preg_dos_recomendacion", "varstring2_1"],
						["text_preg_tres", ".pregunta3 .pregunta-cuestionario"],
						["text_preg_tres_uno", ".pregunta3 label.centro-medico-lb"],
						["text_preg_tres_dos", ".pregunta3 label.nombre-doctor-lb"],
						["text_preg_tres_tres", ".pregunta3 label.otro-lb"],
						["text_preg_cuatro", ".pregunta4 .pregunta-cuestionario"],
						["text_recomendacion", ".recomendacion4 .titulo-r"],
						["text_recomendacion_detalle_cuatro", "varstring4_1"],
						["text_recomendacion_detalle_cuatro_dos", "varstring4_2"],
						["text_preg_cinco", ".pregunta5 .pregunta-cuestionario"],
						["text_preg_cinco_dos", ".pregunta5 label.cuanto-tiempo-lb"],
						["text_preg_cinco_tres", ".pregunta-5-2 > label"],
						["text_recomendacion", ".recomendacion5 .titulo-r"],
						["text_recomendacion_detalle_cinco", "varstring5_1"],
						["text_preg_seis", ".pregunta6 .pregunta-cuestionario"],
						["text_recomendacion", ".pregunta6 .titulo-r"],
						["text_recomendacion_detalle_seis", ".pregunta6 .recomendacion .texto"],
						["text_preg_siete", ".pregunta7 .pregunta-cuestionario"],
						["text_recomendacion", ".pregunta7 .titulo-r"],
						["text_recomendacion_detalle_siete", "varstring7_1"],
						["text_recomendacionfinal_title", ".recomendacion-final .recomendacion .titulo-rf"],
						["text_recomendacionfinal_subtitle", ".recomendacion-final .descripcion-rf"],
						["text_recomendacionfinal_li_uno", ".recomendacion-final .lista-item1-rf"],
						["text_recomendacionfinal_li_dos", ".recomendacion-final .lista-item2-rf"],
						["text_recomendacionfinal_li_tres", ".recomendacion-final .lista-item3-rf"],
						["text_subtitle_cuestionario_2", "varsegundaParte"],
						["text_preg_ocho", ".pregunta8 .pregunta-cuestionario"],
						["text_checkbox_analfabeto", ".pregunta8 .multi-radio .nivel-educacional-1"],
						["text_checkbox_edbasica", ".pregunta8 .multi-radio .nivel-educacional-2"],
						["text_checkbox_edmedia", ".pregunta8 .multi-radio .nivel-educacional-3"],
						["text_checkbox_edsuperior", ".pregunta8 .multi-radio .nivel-educacional-4"],
						["text_preg_nueve", ".pregunta9 .pregunta-cuestionario"],
						["text_preg_diez", ".pregunta10 .pregunta-cuestionario"],
						["text_preg_once", ".pregunta11 .pregunta-cuestionario"],
						["text_preg_doce", ".pregunta12 .pregunta-cuestionario"],
						["text_preg_doce_sub_item_title", ".confirmacion-12 h6"],
						["text_preg_doce_sub_item_subtitle", ".confirmacion-12 .sub"],
						["text_preg_doce_sub_item_pregunta_2", ".confirmacion-12 .subsub"]
					];
			rellenarJSON("/Tramites/web/properties.jsf", arrPBSI);
	 }

	//datos personales
	if( $("body").hasClass("datos-personales") == true){
	 	var arrDP = [
					 	["title_datospersonales", ".titulo-pagina"],
						["label_rut_datospersonales", "label[data-name-for=rut]"],
						["label_nombre_datospersonales", "label[data-name-for=nombres]"],
						["label_apellpaterno_datospersonales", "label[data-name-for=apellido-paterno]"],
						["label_apellmaterno_datospersonales", "label[data-name-for=apellido-materno]"],
						["label_fechanacimiento_datospersonales", "label[data-name-for=fecha-nacimiento]"],
						["label_sexo_datospersonales", "label[data-name-for=sexo]"],
						["label_edad_datospersonales", "label[data-name-for=edad]"],
						["select_nacionalidad_datospersonales", "label[data-name-for=nacionalidad]"],
						["select_estadocivil_datospersonales", "label[data-name-for=estado-civil]"],
						["label_calle_datospersonales", "label[data-name-for=calle]"],
						["label_numero_datospersonales", "label[data-name-for=numero]"],
						["label_block_datospersonales", "label[data-name-for=block]"],
						["label_depto_datospersonales", "label[data-name-for=depto]"],
						["label_pobacionvilla_datospersonales", "label[data-name-for=poblacion]"],
						["select_region_datospersonales", "label[data-name-for=region]"],
						["select_comuna_datospersonales", "label[data-name-for=comuna]"],
						["label_ciudad_datospersonales", "label[data-name-for=ciudad-localidad]"],
						["label_fono_datospersonales", "label[data-name-for=telefono]"],
						["label_email_datospersonales", "label[data-name-for=email]"],
						["label_emailmensaje_datospersonales", ".info-mail p"],
						["label_formapago_titulo_datospersonales", ".lugares-de-pago h4"],
						["label_formapago1_datospersonales", "label[data-name-for=pagos-1]"],
						["label_formapago2_datospersonales", "label[data-name-for=pagos-2]"],
						["label_formapago3_datospersonales", "label[data-name-for=pagos-3]"],
						["label_formapago4_datospersonales", "label[data-name-for=pagos-4]"],
						["text_info1_datospersonales", ".modalidades-de-pago-1"],
						["text_info2_datospersonales", ".modalidades-de-pago-2"],
						["text_info3_datospersonales", ".modificar-pago"],
						["text_info4_datospersonales", ".pago-mandatario"],
						["label_uno_datospersonales", "h4.informa"],
						["label_dos_datospersonales", ".informa-div-1 div p"],
						["label_tres_datospersonales", ".informa-div-2 div p"],
						["radiobutton_nobonohijo_datospersonales", "label[data-name-for='bono-por-hijo-1'] span"],
						["radiobutton_sibonohijo_datospersonales", "label[data-name-for='bono-por-hijo-2'] span"]
						/*["radiobutton_si_datospersonales", "label[for='pregunta1-si']"],
						["radiobutton_no_datospersonales", "label[for='pregunta1-no']"],
						["radiobutton_si_datospersonales", "label[for='pregunta2-si']"],
						["radiobutton_no_datospersonales", "label[for='pregunta2-no']"]*/
						
					];
			rellenarJSON("/Tramites/web/properties.jsf", arrDP);
	 }

	//bono por hijo
	if( $("body").hasClass("bono-por-hijo") == true){
	 	var arrBDP = [
						["title_bonoporhijo", ".titulo-pagina"],
						["title_hijoconrun", ".hijos-con-run h4"],
						["th_run_hijoconrun", ".hijos-con-run .th-run"],
						["th_apellidopaterno_hijoconrun", ".hijos-con-run .th-ap"],
						["th_apellidomaterno_hijoconrun", ".hijos-con-run .th-am"],
						["th_nombres_hijoconrun", ".hijos-con-run .th-nom"],
						["th_fechanacimiento_hijoconrun", ".hijos-con-run .th-fdn"],
						["title_agregarhijoconrut", ".agregar-hijo-1 h5"],
						["label_run_agregarhijoconrut", ".agregar-hijo-1 label.run-agregar-hijo-run, #run-hijo"],
						["label_apellpaterno_agregarhijoconrut", ".agregar-hijo-1 .apellido-paterno"],
						["label_apellmaterno_agregarhijoconrut", ".agregar-hijo-1 .apellido-materno"],
						["label_nombre_agregarhijoconrut", ".agregar-hijo-1 .nombres"],
						["label_nacimiento_agregarhijoconrut", ".agregar-hijo-1 .fecha-de-nacimiento"],
						["title_hijosinrun", ".hijos-sin-run h4"],
						["title_agregarhijosinrut", ".agregar-hijo-2 h5"],
						["label_nombre_agregarhijoconrut", ".hijos-sin-run .th-nom, .agregar-hijo-2 label.sr-nombres, .asr-nombres"],
						["label_apellpaterno_agregarhijoconrut", ".hijos-sin-run .th-ap, .agregar-hijo-2 label.sr-apellido-paterno, .asr-am"],
						["label_apellmaterno_agregarhijoconrut", ".hijos-sin-run .th-am, .agregar-hijo-2 label.sr-apellido-materno, .asr-ap"],
						["label_region", ".agregar-hijo-2 label[for=region-s], .asr-reg, .th-reg"],
						["label_insnacimiento", ".hijos-sin-run .th-in, .agregar-hijo-2 label.sr-inscripcion-nacimiento, .asr-in"],
						["label_numinscripcionnac", ".hijos-sin-run .th-nin, .agregar-hijo-2 label.sr-num-insc-nacimiento, .asr-nin"],
						["label_anioinscripcionnaci", ".hijos-sin-run .th-ain, .agregar-hijo-2 label.sr-anno-insc-nacimiento, .asr-ain"],
						["label_inscdefuncion", ".hijos-sin-run .th-id, .agregar-hijo-2 label.sr-inscripcion-defuncion, .asr-id"],
						["label_numinscripciondefu", ".hijos-sin-run .th-nid, .agregar-hijo-2 label.sr-num-insc-defuncion, .asr-nid"],
						["label_anioinscripciondefu", ".hijos-sin-run .th-aid, .agregar-hijo-2 label.sr-anno-insc-defuncion, .asr-aid"],
						["text_uno_bonoporhijo", ".hijos-biologicos"],
						["text_instrucciones", ".recomendacion h5"],
						["text_instrucciones_uno", ".recomendacion .inst-1"],
						["text_instrucciones_dos", ".recomendacion .inst-2"],
						["text_instrucciones_tres", ".recomendacion .inst-3"],
						["text_uno_finalizar", ".confirmacion h5"],
						["text_dos_finalizar", ".texto-dos-finalizar"],
						["text_tres_finalizar", ".confirmacion .info1"],
						["text_cuatro_finalizar", ".confirmacion .info2"]
					];
			rellenarJSON("/Tramites/web/properties.jsf", arrBDP);
	 }
    
    //personaasignacionfamiliar
	if( $("body").hasClass("personas-asignacion-familiar") == true){
	 	var arrAsignacionFamiliar = [
                        ["tile_text_paf", ".titulo-pagina"],
                        ["text_paf_uno", ".paf-1"],
                        ["text_paf_dos", ".paf-2"],
                        ["text_label_tipobeneficiario", "label[for='tipoBenef']"],
                        ["text_label_rutbeneficiario", "label[for='rut']"],
                        ["text_label_numero", "label[for='numero']"],
                        ["text_label_email", "label[for='email']"],
                        ["text_label_fono", "label[for='telefono']"],
                        ["tipocausafamiliar", "label[for='tipoCausf']"],
                        ["text_label_rutcausa", "label[for='rutCausante']"],
                        ["text_label_rutempleador", "label[for='rutEmpleador']"],
                        ["text_boton_ingsolicitud", ".ing-solicitud"],
                        ["mensaje_ingsolicitud", ".txt-ingresar"],
                        ["text_boton_ingextinguido", ".ing-extinguido"],
                        ["mensaje_ingextinguido", ".txt-extinguido"],
                        ["mensaje_aprobacion", ".txt-solicitud-aprobada"],
                        ["mensaje_excepcion", ".txt-excepcion"],
                        ["mensaje_final_uno", ".msj-uno"],
                        ["mensaje_final_dos", ".msj-dos"],
                        ["mensaje_final_dos_click", ".msj-click a"]
					];
		rellenarJSON("/Tramites/web/properties.jsf", arrAsignacionFamiliar);
	 }

	//beneficio solicitado
	if( $("body").hasClass("beneficio-solicitado") == true){
	 	var arrBeneficio = [
						["title_page_beneficiosdetallesrespuestas", "h2.check-text"],
						["label_numsolicitud_detallesrespuestas", ".dt-1"],
						["label_fechaingreso_detallesrespuestas", ".dt-2"],
						["label_tiposolicitud_detallesrespuestas", ".dt-3"],
						["label_observaciones_detallesrespuestas", ".dt-4"],
						["label_fecharesolucion_detallesrespuestas", ".dt-5"],
						["label_archivodigital_detallesrespuestas", ".dt-6"]
					];
		rellenarJSON("/Tramites/web/properties.jsf", arrBeneficio);
	 }

     //tramites-tabla-consulta
    if( $("body").hasClass("tramites-tabla-consulta") == true){
        var arrTramiteConsulta = [
                        ["title_consulta_solicitud", ".title-consulta-solicitud"],
                        ["th_consulta_solicitud_run", ".th-run"],
                        ["th_consulta_solicitud_ap", ".th-ap"],
                        ["th_consulta_solicitud_am", ".th-am"],
                        ["th_consulta_solicitud_fdn", ".th-fdn"],
                        ["th_consulta_solicitud_detalle", ".detalle"],
                        ["btn_consulta_solicitud", ".txt-consulta-volver"]
                    ];
        rellenarJSON("/Tramites/web/properties.jsf", arrTramiteConsulta);
     }

     //sin-beneficios
    if( $("body").hasClass("sin-beneficios") == true){
        var arrSinBeneficios = [
                        ["title_uno_sin_beneficio", ".title-respuesta-verif"],              
                        ["title_dos_sin_beneficio", ".title-recomendacion"]             
                    ];
        rellenarJSON("/Tramites/web/properties.jsf", arrSinBeneficios);
     }

	//datos personales + bono por hijo
	if( $("body").hasClass("bono-por-hijo") == true && $("body").hasClass("datos-personales")){
	 	var arrDTBPH1 = [
						["title_datospersonales", ".titulo-1"],
					];
		rellenarJSON("/Tramites/web/properties.jsf", arrDTBPH1);
		var arrDTBPH2 = [
						["title_bonoporhijo", ".titulo-2"],
					];
		rellenarJSON("/Tramites/web/properties.jsf", arrDTBPH2);
	 }
         
     //express-n-documento
	if( $("body").hasClass("express-n-documento") == true){
	 	var arrExpressNDocumento = [
                        ["title_consultarfolio_uno", ".title-consulta-uno"],
                        ["title_consultarfolio_dos", ".title-consulta-dos"],
                        ["numsolicitud_consultarfolio", "label[for='consultaExpress\\:numeroSolicitud']"],
                        ["codigo_verificador_consultarfolio", "label[for='consultaExpress\\:codigoVerificacion']"],
                        ["title_respuesta_consultarfolio", ".respuesta-consulta"],
                        ["label_numsolicitud_consultarfolio", ".num-sol"],
                        ["label_fechaingreso_consultarfolio", ".fecha-ing"],
                        ["label_tiposolicitud_consultarfolio", ".tipo-soli"],
                        ["label_estadoactual_consultarfolio", ".estado-act"],
                        ["label_fecharesolucion_consultarfolio", ".fecha-res"]
           
					];
		rellenarJSON("properties/configuracion.properties", arrExpressNDocumento);
	 }
         
	 //llamadas rellenar con JSON endregion

	//llamadas generales region
	//guardar valores cambiados en local storage
	$("input").not("input[readonly]").on("focusout", function(){
		guardarALocalStorage( $(this) );
	});

	$("select").not("select[readonly]").on("change", function(){
		guardarALocalStorage( $(this) );
	});

	$(document).ready(function(){
            setTimeout(function(){
		$("input[type=text], input[type=email]").not("input[readonly]").each(function(i){
			$(this).val( localStorage.getItem( $(this).attr("id") ) );
		});
		
		$("select").each(function(i){
                       
			if( localStorage.getItem( $(this).attr("id") ) != undefined && localStorage.getItem( $(this).attr("id") ) != "" && localStorage.getItem( $(this).attr("id") ) != null ){
				$(this).val( localStorage.getItem( $(this).attr("id") ) );
                                var vl = localStorage.getItem( $(this).attr("id")), aidi = $(this).attr("id"), largo = $(this).find("option").length;
				if( $(this).hasClass("select-chosen") ){
					$(this).trigger("chosen:updated");
				}
			}
		});
		
		$("input[type=radio]").each(function(i){
			if(  localStorage.getItem($(this).attr("name")) == $(this).attr("id") ){
				$(this).prop("checked", true);
			} else {
				$(this).prop("checked", false);
			}
		});
                }, 500)
		
	});
	//llamadas generales endregion

	//llamadas registro de personas region
	if( $("body").hasClass("registro-personas") == true ){
            $(".val-rut	").Rut({
                    format_on: 'keyup'
            });
            $(".val-rut, .val-numero-documento").on("focusout", function(){
                    validarOnFocusOut($(this), "formatear")
            });
                   
            $(".val-rut, .val-numero-documento").on("keyup", function(event){
                if(event.keyCode == 190){
                    $(this).val( $(this).val().substr(0, $(this).val().length - 1) )
                }
            });
            // Validacion de login
            $(".btn.btn-accion.btn-ingresar").on("click", function(e){
                    mostrarCargando();
                    e.preventDefault();
                    validarTodos(".form-group.formulario-sin-fondo");
                    if( validezEste == 1 ){
                        $('#login\\:ingresar').trigger('click');
                    }else{
                        eliminarCargando();
                    }
            });
            // Fin Validacion de login
	}
	//llamadas registro de personas endregion

	 //llamadas datos personales region

	validarOnFocusOut($(".val-rut-dv"))
	
    $(".formulario-datos-personales input").on("focusout", function () {
		if(desactivarValidacion == 0){
        	validarOnFocusOut($(this), "formatear", ".boton-siguiente");
		}
    });

    $(".formulario-datos-personales select").on("change, focusout", function () {
        if(desactivarValidacion == 0){
            if( $(this).find("option").length > 1 ){
                validarOnFocusOut($(this), "formatear", ".boton-siguiente");
            }   
        }
    });

    $(".formulario-datos-personales .val-correo").on("focusout", function () {
		if(desactivarValidacion == 0){
        	infoMail($(this), $(".info-mail h5"))
		} 
    }); 

    $(".formulario-datos-personales-i .boton-siguiente").click(function () {
        validarTodos(".formulario-datos-personales-i");
        if(validezEste == 1){
            lightBox("mostrar", ".confirmacion");
        }
    });

    $(".comuna, .pagos-2").addClass("select-chosen");
	
	if($("body").hasClass("chosen")){
		$(".comuna").chosen({
			no_results_text: "No hay coincidencias."
		});
		 $(".pagos-2").chosen({
			no_results_text: "No hay coincidencias."
		});
	}	

	//if($("body").hasClass("formas-de-pago")){
		$(".comuna").on("change", function(){
			var valor =  $(this).val();
			$(".pagos-2").val( valor );
			$(".pagos-2").trigger("chosen:updated");
		});
	 	$(".region").on("change", function(){
			var valor =  $(this).val();
			$(".pagos-1").val( valor );
		});
	//} 

    $(".comuna").on('chosen:hiding_dropdown', function () {
		if(desactivarValidacion == 0){
        	validarOnFocusOut($(".comuna"), "formatear", ".boton-siguiente", "chosen");
		}
    });
	 //llamadas datos personales endregion

	 //llamadas cuestionario apsi region
	 $(".formulario-cuestionario.formulario-apsi input").on("focusout", function(){
		 if(desactivarValidacion == 0){
			 validarOnFocusOut($(this), "formatear", ".boton-siguiente, .boton-anterior");
		 }
	 });
	
	 
	 $(".formulario-cuestionario.formulario-apsi input[name=pregunta-2]").on("change", function(){
		if(desactivarValidacion == 0){
			var tog = $(this).val() == "true" ? "si" : "no";
                        arrSec = [".pregunta-11-1", ".pregunta-11-2-1", ".pregunta-11-2-2", ".pregunta-11-2-3"];
                        arrClassSec = ["val-requerido", "val-numero", "val-numero", "val-numero"];
			toggleSiNo(tog, "si", ".pregunta-2-1", ".fecha-diagnostico", "val-requerido", ".boton-siguiente, .boton-anterior");
			toggleSiNo(tog, "si", ".pregunta-3", ".centro-medico, .nombre-doctor", "val-texto-1-o-mas", ".boton-siguiente, .boton-anterior");
			toggleSiNo(tog, "no", "", "", "", "", ".recomendacion2", string2_1);
                        /*
			toggleSiNoEspecial(tog, "si", ".pregunta-11", arrSec, arrClassSec, ".boton-siguiente");

                        $('.p11[data-provide=datepicker]').datepicker({format: 'dd/mm/yyyy', language: 'es'}).on("changeDate", function(e) {
				if( $(this).find("input").hasClass("con-error") == false && $(this).find("input").val().length > 0){
					$("*[data-emparentado]").attr("disabled", "").attr("placeholder", "Vacie los otros campos para ocupar este").attr("title", "Vacie los otros campos para ocupar este").attr("data-validez", "1").removeClass("con-error");
					$(this).find("input").removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
				 } else if( $(this).find("input").val() == 0 ){
					$("*[data-emparentado]").removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
				 }
			});

			 $("*[data-emparentado]").on("focusout", function(){
				 if( $(this).hasClass("con-error") == false && $(this).val().length > 0){
					$("*[data-emparentado]").attr("disabled", "").attr("placeholder", "Vacie los otros campos para ocupar este").attr("title", "Vacie los otros campos para ocupar este").attr("data-validez", "1").removeClass("con-error");
					$(this).removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
				 } else if( $(this).val() == 0 ){
					$("*[data-emparentado]").removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
				 }
			   });
                        */   
		 }
	 });

	$(".formulario-cuestionario.formulario-apsi input[name=pregunta-4]").on("change", function(){
		if(desactivarValidacion == 0){
			var tog = $(this).val() == "true" ? "si" : "no";
			if(tog=="si"){
				toggleSiNo(tog, "si", "", "", "", "", ".recomendacion4", string4_1);
			} else if(tog=="no"){
				toggleSiNo(tog, "no", "", "", "", "", ".recomendacion4", string4_2);
			}
		}
	 });

	$(".formulario-cuestionario.formulario-apsi input[name=pregunta-5]").on("change", function(){
		if(desactivarValidacion == 0){
			var tog = $(this).val() == "true" ? "si" : "no";
			toggleSiNo(tog, "si", ".pregunta-5-1", ".5-cuanto-tiempoo", "val-mixto", ".boton-finalizar");
			toggleSiNo(tog, "si", ".pregunta-6", ".pregunta-6-1", "val-texto-1-o-mas", ".boton-finalizar");
			toggleSiNo(tog, "no", ".pregunta-5-2", ".porque-lb", "val-texto-1-o-mas", ".boton-finalizar", ".recomendacion5", string5_1);
		}
	 });

	$(".formulario-cuestionario.formulario-apsi input[name=pregunta-7]").on("change", function(){
		if(desactivarValidacion == 0){
			var tog = $(this).val() == "true" ? "si" : "no";
			toggleSiNo(tog, "si", "", "", "", "", ".recomendacion7", string7_1);
		}
	 });
         
        $(".formulario-cuestionario.formulario-apsi input[name=pregunta-10]").on("change", function(){
            var tog = $(this).val() == "true" ? "si" : "no";
                arrSec = [".pregunta-11-1", ".pregunta-11-2-1", ".pregunta-11-2-2", ".pregunta-11-2-3"];
                arrClassSec = ["val-requerido", "val-numero", "val-numero", "val-numero"];
                toggleSiNoEspecial(tog, "si", ".pregunta-11", arrSec, arrClassSec, ".boton-siguiente, .boton-anterior");

                $('.p11[data-provide=datepicker]').datepicker({format: 'dd/mm/yyyy', language: 'es', endDate: hoy.toLocaleDateString()}).on("changeDate", function(e) {

                        if( $(this).find("input").hasClass("con-error") == false && $(this).find("input").val().length > 0){
                                $("*[data-emparentado]").attr("disabled", "").attr("placeholder", "Vacie los otros campos para ocupar este").attr("data-validez", "1").removeClass("con-error").next(".mensaje-error").remove();
                                $("*[data-emparentado]").not("#ficha\\:fechaPresentaEvaluacionInvalidez").val("");
                                $("*[data-emparentado]").parent().attr("data-toggle", "tooltip").attr("data-placement", "top");
                                $("*[data-emparentado]").parent().attr("title", "Vacie los otros campos para ocupar este");
                                $(this).removeAttr("data-toggle");
                                $('*[data-toggle="tooltip"]').tooltip({container: 'body'})
                                $(this).find("input").removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
                                localStorage.setItem("ficha:fechaPresentaEvaluacionInvalidez", $('.p11[data-provide=datepicker] input').val());
                         } else if( $(this).find("input").val() == 0 ){
                                $("*[data-emparentado]").removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
                                $("*[data-emparentado]").removeAttr("data-toggle");
                                $("*[data-emparentado]").parent().tooltip('destroy');
                         }
                }).on("focusout", function(){
					var valor = $(this).find("input").val(),
			        		valorFecha = new Date(valor.split("/")[1] + "/" + valor.split("/")[0] + "/" + valor.split("/")[2]),
			        		valorTiempo = valorFecha.getTime(),
			        		timeHoy = new Date().getTime();
			        	if( valorTiempo > timeHoy || valorFecha == "Invalid date"){
			        		$(this).find("input").val("");
                                                localStorage.removeItem("ficha:fechaPresentaEvaluacionInvalidez");
			        	}
				});	

                 $("*[data-emparentado]").on("focusout", function(){
                         if( $(this).hasClass("con-error") == false && $(this).val().length > 0){
                                $("*[data-emparentado]").attr("disabled", "").attr("placeholder", "Vacie los otros campos para ocupar este").attr("title", "Vacie los otros campos para ocupar este").attr("data-validez", "1");
                                $("*[data-emparentado]").removeClass("con-error");
                            	$("*[data-emparentado]").parent().attr("data-toggle", "tooltip").attr("data-placement", "top");
                            	$("*[data-emparentado]").parent().attr("title", "Vacie los otros campos para ocupar este");
                            	$(this).parent().removeAttr("data-toggle");
                            	$('*[data-toggle="tooltip"]').tooltip({container: 'body'})
                                $('.p11[data-provide=datepicker] input').removeClass("val-requerido");
                                $(this).removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
                                $("*[data-emparentado]").not(this).val("").next(".mensaje-error").remove();
                                if( $(this).parent().hasClass("date") == false ){ localStorage.removeItem("ficha:fechaPresentaEvaluacionInvalidez") }
                         } else if( $(this).val() == 0 ){
                                $("*[data-emparentado]").removeAttr("disabled").removeAttr("data-validez").attr("placeholder","").attr("title","");
                                $('.p11[data-provide=datepicker] input').addClass("val-requerido");
                                $("*[data-emparentado]").removeAttr("data-toggle");
                                $("*[data-emparentado]").parent().tooltip('destroy')
                         }
                 });
            if(tog == "no"){
                $(".pregunta-11-2-1, .pregunta-11-2-2, .pregunta-11-2-3").removeClass("con-error").val("");
                $(".btn btn-primary.form-control.boton-siguiente, .boton-anterior").removeAttr("disabled");
                $(".pregunta-11-2-1, .pregunta-11-2-2, .pregunta-11-2-3").next(".mensaje-error").remove();
                }
        
        });

	$(".formulario-cuestionario.formulario-apsi input[name='pregunta-12']").on("change", function(){
		var tog = $(this).val() == "true" ? "si" : "no";
		if(tog == "si"){
			lightBox("mostrar", ".confirmacion-12");
			$(".confirmacion-12 .aceptar").click(function(){
				$(".confirmacion-12").closest(".lightbox").find(".cerrar").trigger("click");
			});
			$(".confirmacion-12 .cancelar").click(function(){
				$(".pregunta-12-si").prop("checked", false);
				$(".confirmacion-12").closest(".lightbox").find(".cerrar").trigger("click");
			});
			
		}
	});
	
	var indiceApsi = 1, validadoHasta = 0;
	/*$(".formulario-cuestionario.formulario-apsi .nav-tabs a").click(function(){
			if( $(this).parent().index() < validadoHasta && $(this).attr("data-toggle") == "tab" ){
				$(".boton-siguiente").attr("disabled", "").attr("title", "Vuelva al paso actual para seguir avanzando");
			} else if($(this).attr("data-toggle") == "tab"){
				$(".boton-siguiente").removeAttr("disabled").removeAttr("title");
			}
		}
	)*/
        
        $(".formulario-cuestionario.formulario-apsi .nav-tabs a").click(function(event){ event.preventDefault(); });

	$(".formulario-cuestionario.formulario-apsi .boton-siguiente").click(function(){
		if(desactivarValidacion == 0){
			validarTodos(".paso1");
			if(validezEste == 1){
				validadoHasta = indiceApsi;
				indiceApsi++;
				validezEste = 0;
				$("a[href='#paso" + indiceApsi + "']").tab('show');
				//$("a[href='#paso" + indiceApsi + "']").attr("role", "tab").attr("data-toggle", "tab");
                                if(indiceApsi > 1){
                                    $(".formulario-cuestionario.formulario-apsi .boton-anterior").removeAttr("disabled");
                                }
                        pasoTerminado();
			}
		} else {
			indiceApsi++;
			$("a[href='#paso" + indiceApsi + "']").tab('show');
			//$("a[href='#paso" + indiceApsi + "']").attr("role", "tab").attr("data-toggle", "tab");
		}
	});
        
        $(".formulario-cuestionario.formulario-apsi .boton-anterior").click(function(){
            indiceApsi--;
            $("a[href='#paso" + indiceApsi + "']").tab('show');
            if(indiceApsi == 1){
                $(".formulario-cuestionario.formulario-apsi .boton-anterior").attr("disabled", "");
            }
        });


	$(".formulario-cuestionario.formulario-apsi .nav-tabs li").on("show.bs.tab", function(){ 
		var indice = $(this).index();
		if( indice >= 4 ){
			$(".container-fluid.formulario.formulario-cuestionario.formulario-apsi > h5").text(segundaParte);
		} else {
			$(".container-fluid.formulario.formulario-cuestionario.formulario-apsi > h5").text(primeraParte);
		}
		if(indice == 6){
			$(".boton-siguiente").html("Finalizar  <span class='fa fa-check'></span>").addClass("finalizar btn-finalizar");
		} else {
			$(".boton-siguiente").html("Siguiente  <span class='fa fa-angle-right'></span>").removeClass("btn-finalizar");
		}
		$(".boton-siguiente").off("click");
		$(".boton-siguiente").click(function () {
			if(desactivarValidacion == 0){
				validarTodos(".paso" + (indiceApsi));
				if(validezEste == 1){
					validadoHasta = indiceApsi;
					indiceApsi++;
					validezEste = 0;
					$("a[href='#paso" + indiceApsi + "']").tab('show');
					//$("a[href='#paso" + indiceApsi + "']").attr("role", "tab").attr("data-toggle", "tab");
					if( indiceApsi >= 5 ){
						$(".container-fluid.formulario.formulario-cuestionario.formulario-apsi > h5").text(segundaParte);
					}
					if(indiceApsi == 7){
                                            $(".boton-siguiente").html("Finalizar  <span class='fa fa-check'></span>").addClass("finalizar btn-finalizar");
					} else {
                                            //$(".boton-siguiente").html("Siguiente  <span class='fa fa-angle-right'></span>");
                                        }
					if(indiceApsi == 8 && $(this).hasClass("finalizar") == true){
						//window.open("bono-por-hijo.html", "_self");
                                                $('#ficha\\:enviarFicha').click();
					}
                                        if(indiceApsi > 1){
                                            $(".formulario-cuestionario.formulario-apsi .boton-anterior").removeAttr("disabled");
                                        }
                                        pasoTerminado();
				}
			} else {
				if($(".boton-siguiente").hasClass("finalizar") == true && $(".paso7").hasClass("active") == true){
					//window.open("bono-por-hijo.html", "_self");
                                        $('#ficha\\:enviarFicha').click();
				}
				validadoHasta = indiceApsi;
				indiceApsi++;
				$("a[href='#paso" + indiceApsi + "']").tab('show');
				$("a[href='#paso" + indiceApsi + "']").attr("role", "tab").attr("data-toggle", "tab");
				if( indiceApsi >= 5 ){
					$(".container-fluid.formulario.formulario-cuestionario.formulario-apsi > h5").text(segundaParte);
				}
				if(indiceApsi == 7){
					$(".boton-siguiente").html("Finalizar  <span class='fa fa-check'></span>").addClass("finalizar btn-finalizar");
				}
			}
		});
	});
        
        $(".formulario-cuestionario.formulario-apsi .tab-pane input").on("change", function(){
            var indActual = $(this).closest(".tab-pane").index()
            if( indActual == $(".terminado.active").index() ){
                var btnAc = "Actualizar  <span class='fa fa-refresh'></span>";
                $(".boton-siguiente").html(btnAc);
            } else {
                if(indiceApsi == 7){
                    var btnFn = "Finalizar  <span class='fa fa-check'></span>";
                    $(".boton-siguiente").html(btnFn).addClass("btn-finalizar");
                } else {
                    var btnSig = "Siguiente  <span class='fa fa-angle-right'></span>";
                    $(".boton-siguiente").html(btnSig).removeClass("btn-finalizar");
                }
            }
        });
        
        $("select.codigo-area-2").on("change", function(){
            if( $(this).val() == "2" || $(this).val() == "9" ){
                $(".input-codigo-area").attr("maxlength", "9");
                if( $(".input-codigo-area").val().length >= 5){
                    var valor = "";
                    for(i=0; i<$(".input-codigo-area").val().length; i++){
                        if($(".input-codigo-area").val().split("")[i] != "-"){
                            valor+= $(".input-codigo-area").val().split("")[i]
                        }
                    }
                    $(".input-codigo-area").val( valor );
                    $(".input-codigo-area").val( $(".input-codigo-area").val().substr(0, 4) + "-" + $(".input-codigo-area").val().substr(4, $(".input-codigo-area").val().length) )
                }
            } else {
                $(".input-codigo-area").attr("maxlength", "8");
                if( $(".input-codigo-area").val().length >= 4){
                    var valor = "";
                    for(i=0; i<$(".input-codigo-area").val().length; i++){
                        if($(".input-codigo-area").val().split("")[i] != "-" && i != 8){
                            valor+= $(".input-codigo-area").val().split("")[i]
                        }
                    }
                    $(".input-codigo-area").val( valor );
                    $(".input-codigo-area").val( $(".input-codigo-area").val().substr(0, 3) + "-" + $(".input-codigo-area").val().substr(3, $(".input-codigo-area").val().length) )
                }
            }
        });
    
        $(".input-codigo-area").on("keydown", function(event){
            if(event.keyCode != 8 && event.keyCode != 46){
                var l = $(this).val().length;
                if( $(this).attr("maxlength") == "9" ){
                    if(l == 4){
                        $(this).val($(this).val() + "-")
                    }
                } else if( $(this).attr("maxlength") == "8" ){
                    if(l == 3){
                        $(this).val($(this).val() + "-")
                    }
                }
            }
        });
    
        $(".input-codigo-area").on("keyup", function(event){
            if(
               event.keyCode != 48 &&
               event.keyCode != 49 &&
               event.keyCode != 50 &&
               event.keyCode != 51 &&
               event.keyCode != 52 &&
               event.keyCode != 53 &&
               event.keyCode != 54 &&
               event.keyCode != 55 &&
               event.keyCode != 56 &&
               event.keyCode != 57 &&
               event.keyCode != 57 &&
               event.keyCode != 8 &&
               event.keyCode != 46
              ){
                $(this).val( $(this).val().substr(0, $(this).val().length - 1) )
            }
        });
    
        $(".input-codigo-area, select.codigo-area-2").on("focusout", function(){
            var v1 = $("select.codigo-area-2").val(),
                v2 = $(".input-codigo-area").val(),
                v2_1 = "";
            for(i=0; i < v2.length; i++){
                if( v2.split("")[i] != "-"){
                    v2_1+= v2.split("")[i]
                }
            }
            $(".telefono-real").val(v1 + v2_1);
        });

        //ciudad localidad
        $("input[id*=ciudadLocalidad]").on("keyup", function(event){
            var admitidos = "abcdefghijklmnñopqrstuvwxyzáéíóúàèìòùäëïöü" + "- '",
                el = $(this),
                ultimo = el.val().toLowerCase().substr($(this).val().length - 1, 1);
            if( admitidos.indexOf(ultimo) == -1){
                el.val( el.val().substr(0, el.val().length -1) );
            }
        });
        
        //poblaci�n
        $("input[name*=j_idt29], input[name*=j_idt28], label[for=poblacion] + input").on("keyup", function(event){
            var admitidos = "abcdefghijklmnñopqrstuvwxyzáéíóúàèìòùäëïöü" + "- '" + "0123456789",
                el = $(this),
                ultimo = el.val().toLowerCase().substr($(this).val().length - 1, 1);
            if( admitidos.indexOf(ultimo) == -1){
                el.val( el.val().substr(0, el.val().length -1) );
            }
        });




	 //llamadas cuestionario apsi endregion

	 //llamadas bono por hijo region
	 $(".bono-por-hijo .agregar-con-rut").click(function(){
            var count=0;
            $('#formBonoPorHijos\\:tableHijosConRut tbody tr').each(function( index ) {
               if ($(this).find("input[type=checkbox]").is(':checked')){
                count++;
               };
            });
            
            $('#formBonoPorHijos\\:tableHijosSinRut tbody tr').each(function( index ) {
               if ($(this).find("input[type=checkbox]").is(':checked')){
                count++;
               };
            });
            
            if (count == 20){
                generarLightbox(generarMensaje("Ya a alcanzaco el máximo de hijos"));
            }
            else{
		  lightBox("mostrar", ".agregar-hijo-1");
		  $(".agregar-hijo-1").closest(".lightbox").find(".cerrar").hide();
		  $("input.run-agregar-hijo-run").addClass("val-rut");
		  $("input.run-agregar-hijo-run").on("focusout", function(){
			  if(desactivarValidacion == 0){
				validarOnFocusOut($(this), "formatear", ".agregar-hijo-run");
			  }
		  });
		  $("input.run-agregar-hijo-run").Rut({
				format_on: 'keyup',
				on_success: function(){
				},
				on_error: function(){
					$("input.run-agregar-hijo-run").parent().parent().find(".texto-1,.texto-2,.texto-3,.texto-4").text("--");
				}
		  });
		  $("input.run-agregar-hijo-run").on("focusin", function(){
				$("input.run-agregar-hijo-run").val("");
                                $("input.run-agregar-hijo-run").parent().parent().find(".texto-1,.texto-2,.texto-3,.texto-4").text("--");
		  });
            }
	 });
	
	function agregarSinRut(metodo, selectorEditar){
			lightBox("mostrar", ".agregar-hijo-2");
			$(".agregar-hijo-2").closest(".lightbox").find(".cerrar").hide();


         } 
         
         $(".agregar-hijo-2 select, .agregar-hijo-2 input").on("focusout", function(){
				if(desactivarValidacion == 0){
					validarOnFocusOut($(this), "formatear", ".agregar-hijo-sin-run");
				}
	});

	$(".bono-por-hijo .agregar-sin-rut").click(function(){
            var count=0;
            $('#formBonoPorHijos\\:tableHijosConRut tbody tr').each(function( index ) {
               if ($(this).find("input[type=checkbox]").is(':checked')){
                count++;
               };
            });
            
            $('#formBonoPorHijos\\:tableHijosSinRut tbody tr').each(function( index ) {
               if ($(this).find("input[type=checkbox]").is(':checked')){
                count++;
               };
            });
            
            if (count == 20){
                generarLightbox(generarMensaje("Ya a alcanzaco el máximo de hijos"));
            }
            else{
                agregarSinRut();
            }
	});

	$(".formulario.formulario-bph .finalizar-bph").click(function(){
		lightBox("mostrar", ".confirmacion");
		$(".confirmacion").closest(".lightbox").find(".cerrar").hide();
		if ($('#formConfirmacion\\:chcAceptar').is(':checked')) {
                    $('#formConfirmacion\\:chcAceptar').trigger('click');
                }
                $(".aceptar-conformidad").click(function(){ window.open("beneficios-detalles-respuesta.html", "_self") });
		$(".conformidad").on("change", function(){
			$(this).is(":checked") == true ? $(".aceptar-conformidad").removeAttr("disabled") : $(".aceptar-conformidad").attr("disabled", "");
		});
		$(".cancelar-conformidad").click(function(){
			$(".confirmacion").closest(".lightbox").find(".cerrar").trigger("click");
		});
	});


	//llamadas personas-home-tramites region
	$('.home-tramites #collapseDiv1').on('shown.bs.collapse', function () {
		$(this).parent().find(".fa").removeClass("fa-chevron-circle-down").addClass("fa-chevron-circle-up");
	});

	$('.home-tramites #collapseDiv1').on('hidden.bs.collapse', function () {
		$(this).parent().find(".fa").removeClass("fa-chevron-circle-up").addClass("fa-chevron-circle-down");
	});


	$('.home-tramites #collapseDiv2').on('shown.bs.collapse', function () {
		$(this).parent().find(".fa").removeClass("fa-chevron-circle-down").addClass("fa-chevron-circle-up");
	});

	$('.home-tramites #collapseDiv2').on('hidden.bs.collapse', function () {
		$(this).parent().find(".fa").removeClass("fa-chevron-circle-up").addClass("fa-chevron-circle-down");
	});


	$('.home-tramites #collapseDiv3').on('shown.bs.collapse', function () {
		$(this).parent().find(".fa").removeClass("fa-chevron-circle-down").addClass("fa-chevron-circle-up");
	});

	$('.home-tramites #collapseDiv3').on('hidden.bs.collapse', function () {
		$(this).parent().find(".fa").removeClass("fa-chevron-circle-up").addClass("fa-chevron-circle-down");
	});

	var abierto = 0;
		$(".home-tramites .item-menu").first().click(function(event){
			event.stopPropagation();
			var corte = $(window).width() < 768 ? "xs" : "sm";
			if( $(this).hasClass("open") == false ){
				$(this).addClass("open");
				function ida(selector){
					$("body").css("overflow-y", "hidden")
					corte == "xs" ? selector.animate({"width": "100%"}) : selector.delay(1250).animate({"width": "41.66666667%"});
					selector.find(".color-1").animate({
						"height": "385px"
					}, function(){ $(this).find(".menu-lista-desplegable").fadeIn(); });

					if(corte == "xs"){
						selector.find(".text-center").animate({ "width": "10em" });
						selector.find(".text-center").css("margin", "auto")
					} else {
						selector.find(".text-center").animate({ "width": "25%",	"margin-left": "35%" })
					}
					corte == "xs" ? selector.find("h3").animate({ "bottom": "63%" }) : selector.find("h3").animate({ "bottom": "69%" });
					abierto = 1;
				}
				setTimeout( function(){ ocultarIzquierda($(".modulo-tramites .explain-div").parent()); }, 355 );
				ida($(".item-menu").first());
				$(this).find(".menu-lista-desplegable > li.con-hijo > a").not(".atras").on("click", function(event){
					event.stopPropagation();
					event.preventDefault();
					$(this).closest("ul").animate({"left": "-100%"});
					$(this).parent().find("ul").fadeIn();
				});

				$(this).find(".menu-lista-desplegable > li.con-hijo .atras").on("click", function(event){
					event.stopPropagation();
					event.preventDefault();
					$(this).closest(".menu-lista-desplegable").animate({"left": "0"});
					$(this).parent().find("ul").fadeOut();
				});
			} else {
				$(this).removeClass("open");
				$(this).find("ul").fadeOut( function(){
					var este = $(this).closest(".item-menu");
					corte == "xs" ? este.animate({"width": "50%"}) : este.animate({"width": "25%"});
					
					este.find("h3").animate({
						"bottom": "10px"
					});
					este.find(".text-center").delay(300).animate({
						"width": "81%",
						"margin-left": "3.5%"
					});
					este.find(".color-1").delay(200).animate({
						"height": "185px"
					});
					abierto = 0;
				})
				setTimeout( function(){ mostrarIzquierda($(".modulo-tramites .explain-div").parent()); $("body").removeAttr("style") }, 700)
				$(this).find(".menu-lista-desplegable > li.con-hijo > a").not(".atras").off("click");
				$(this).find(".menu-lista-desplegable > li.con-hijo .atras").off("click");
			}
			
	});

	$(".home-tramites .item-menu ul li").not(".con-hijo").find("a").not(".atras").click(function(event){
		event.stopPropagation();
		event.preventDefault();
		var enlace = $(this).attr("href");
		$("body").append("<div class='overlay'></div>");
		$(".overlay").animate({
			"top": "0",
			"left": "0",
			"width": "100%",
			"height": "100%",
			"opacity": "1"
		}, function(){
			window.open(enlace, '_self');
		});
	});

	$(document).ready(function(){
		setTimeout(
			function(){
				widthInicial = $(".modulo-tramites .explain-div").parent().width() - 1;
				$(".modulo-tramites .explain-div").parent().attr("data-width-inicial", widthInicial);
			}, 1000
		)
	});

	$(window).resize(function(){
		setTimeout(
			function(){
				widthInicial = $(".modulo-tramites .explain-div").parent().width() - 1;
				$(".modulo-tramites .explain-div").parent().attr("data-width-inicial", widthInicial);
			}, 500
		)
	});
	//llamadas personas-home-tramites endregion

	//llamada desactivar validacion region
	var llaves = [], desactivarValidacion = 0;
	function checkKeys(){
		if(llaves.indexOf(17) != -1 && llaves.indexOf(48) != -1){
			 if (confirm("¿Desactivar validación?") == true) {
				 desactivarValidacion = 1;
				 llaves.pop();llaves.pop();
				 
				 $(".boton-siguiente, .agregar-hijo-run, .agregar-hijo-sin-run").removeAttr("disabled")
				 $(".con-error").removeClass("con-error");
				 $(".mensaje-error").remove();
				 
			} else {
				desactivarValidacion = 0;
				llaves.pop();llaves.pop();
			}
		}
	}

	$(window).on("keydown", function (e) {
		if( $("body").hasClass("datos-personales bono-por-hijo") == false ){
	        if (e.which == 17) {
				llaves.push(e.which);
				checkKeys();
	        }
			if (e.which == 48) {
				llaves.push(e.which);
				checkKeys();
			}
		}
    });
	
	$(window).on("keyup", function(e){
		llaves.pop();
	});

	
	//llamada desactivar validacion endregion

	//llamadas consulta pagos region
	if( $("body").hasClass("consulta-pagos") == true){
		var div = "<div class='simular-casos' style='display: none; padding: 1em'><h2>Simular Caso</h2><select class='seleccionar-caso form-control' name='seleccionar-caso'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option></select></div>";
		$("body").append(div);
	};
	function mensajeError(mensaje){
		var ze = $(".consulta-pagos .mensaje-error p");
		ze.text(mensaje);
		ze.slideDown();
		$('.consulta-pagos .rut-n').addClass("con-error").removeClass("success").removeClass("vacio");
		//$(".consulta-pagos .consultar").attr("disabled", "");
	}
		
	function ocultarMensaje(){
		var ze = $(".consulta-pagos .mensaje-error p");
		ze.slideUp();
		ze.text("");
		$('.consulta-pagos .rut-n').removeClass("con-error").removeClass("vacio").addClass("success");
		//(".consulta-pagos .consultar").removeAttr("disabled");
	}
		
	function consultar(response){
		var c = $(".consulta-pagos .consulta-cp"),
			r = $(".consulta-pagos .respuesta");
		c.animate({
			"left": "-150%"
		});
		r.animate({
			"left": $(window).width() < 768 ? "1em" : 0
		});
		switch (response){
			case 1:
				$(".consulta-pagos .respuesta1").fadeIn()
				$(".consulta-pagos .respuesta1 .detalles-1").fadeIn()
				$(".consulta-pagos .respuesta1 .detalles-2").hide()
				$(".col-xs-12.importante").show();
				break;
			case 2:
				$(".consulta-pagos .respuesta1").fadeIn()
				$(".col-xs-12.importante").hide();
				break;
			case 3:
				$(".consulta-pagos .respuesta2").fadeIn()
				break;
		}
	}
		
	function volver(){
		var c = $(".consulta-pagos .consulta-cp"),
			r = $(".consulta-pagos .respuesta"),
			rt = $(".consulta-pagos #rut");
		$(".consulta-pagos .respuesta1, .consulta-pagos .respuesta2").fadeOut();
		c.animate({
			"left": 0
		});
		r.animate({
			"left": "100%"
		});
		rt.val("");
		rt.addClass("vacio");
	}
	
	if( $('.consulta-pagos .rut-n').length != 0 ){
		$('.consulta-pagos .rut-n').Rut({
			format_on: 'keyup',
			on_error: function(){ mensajeError("El formato del RUN es incorrecto") },
			on_success: function(){ ocultarMensaje() }
		});
	}
		
	$(".consulta-pagos .consultar").click(function(){
		if( $("body").hasClass("express-n-documento") == false ){
			var c = $(".consulta-pagos #rut");
			if( c.hasClass("vacio") == false && c.hasClass("con-error") == false ){
				consultar(esteSwitch);
			} else if(c.hasClass("vacio") == true){
				mensajeError("Debe ingresar un RUN a consultar");
			}
		} else if( $("body").hasClass("express-n-documento") == true ){
			var objetos = $("input[class*='val-']"),
				iteraciones = objetos.length,
				contador = 0;
			for(i=0; i< iteraciones ; i++){
				if(objetos.eq(i).attr("data-validez") == "1"){
					contador++;
				}
			}
			if(iteraciones == contador){
				ocultarMensaje();
				//consultar(esteSwitch);
                                $('#consultaExpress\\:enviarConsultaExpress').click();
			} else {
				mensajeError("No ha ingresado los datos correctamente");
			}
		}
	});
		
	$(".consulta-pagos .boton-volver").click(function(){
		//volver()
                window.location.href = "consultaExpress.jsf";
	});
		
	var arrayKeys = [],
		esteSwitch = 1;

	if( $("body").hasClass("consulta-pagos") == true){
		$(window).on("keydown", function (e) {
			if (e.which == 17) {
				arrayKeys.push(e.which);
				checkearLlaves();
			}
			if (e.which == 57) {
				arrayKeys.push(e.which);
				checkearLlaves();
			}
		});

		$(window).on("keyup", function (e) {
			arrayKeys.pop();
		});
	}

	function checkearLlaves(){
		if(arrayKeys.indexOf(17) != -1 && arrayKeys.indexOf(57) != -1){
			lightBox("mostrar", ".simular-casos");
			$(".seleccionar-caso").off("change");
			$(".seleccionar-caso").off("focusout");
			$(".seleccionar-caso").on("change", function(){
				esteSwitch = parseInt($(this).val());
			});
			$(".seleccionar-caso").on("focusout", function(){
				$(this).closest(".lightbox").find(".cerrar").click();
			});
			arrayKeys.pop();
			arrayKeys.pop();
		}
	}


	//llamadas consulta pagos endregion

	//llamadas certificados enviar mail region
	if( $("body").hasClass("certificado-enviar-mail") == true){
		$(".btn-usar-otro-correo").on("click", function(){
			var input = $(".confirmar-email"),
				actual = $(".correo-actual"),
				usarEste = $(".btn-usar-este-correo");
			if( $(this).hasClass("editando") == false ){
				$(this).addClass("editando");
				$(this).text("Deseo ocupar este correo");
				//input.val( actual.text() );
				input.addClass("val-correo");
				input.on("focusout", function(){
					validarOnFocusOut($(this), "formatear", ".btn-usar-otro-correo");
				});
				input.show();
				actual.hide();
				usarEste.hide();
			} else {
				$(this).removeClass("editando");
				$(this).text("No, usar otro Email");
				actual.text( input.val() );
				input.hide();
				input.removeClass("val-correo");
				input.off("focusout");
				actual.show();
				usarEste.show();
			}
		});
	}
	//llamadas certificados enviar mail endregion

	//llamadas express-n-documento region
	if( $("body").hasClass("express-n-documento") == true ){
		$(".val-numero").on("focusout", function(){
			validarOnFocusOut( $(this), "formatear", ".btn-consultar" )
		});
		$(".btn-consultar.consultar").on("click", function(){
			validarTodos(".margin-top-menos-30");
		});
	}
	//llamadas express-n-documento endregion
	
	//llamada cargando region
	$(".btn-mostrar-cargando").on("click", function(){ mostrarCargando() });
	//llamada cargando endregion

	//llamada para compatibilidad con ie8 y safari region
	$(document).ready(function(){
		svgeezy.init('nocheck', 'png');
		var isIE8 = !+'\v1';
		if(isIE8 == true){
			var anadir = ".personas-home-tramites:after, .personas-home-pagos:after, .personas-home-certificados:after{ content: none; }" +
						 ".personas-home-tramites, .personas-home-pagos, .personas-home-certificados{ background-image: url(../img/bg_frios.png); background-size: cover; -ms-behavior: url(js/backgroundsize.min.htc); }";
			$("head").append("<style>" + anadir + "</style>");
                        $(".contenedor-menu-touch").css("top", "16px");
		}
	});
	var anadidoie8modal = 0;
	$("#myModal").on("shown.bs.modal", function(){
		if(anadidoie8modal == 0){
			$("head").append("<style>.modal-content { -ms-behavior: url(js/backgroundsize.min.htc); }</style>");
			anadidoie8modal = 1;
		}
	});
        
	//manejar svg deformados y forzar remplazo por png en safari
	$(document).ready(function(){
		var isSafari = /constructor/i.test(window.HTMLElement);
		if(isSafari == true){
			setTimeout(function(){
				for(i=0; i< $(".nav-sidebar img").length; i++){
					if( $(".nav-sidebar img").eq(i).attr("src").indexOf("svg") != -1){
						$(".nav-sidebar img").eq(i).attr("src", $(".nav-sidebar img").eq(i).attr("src").replace("svg", "png") );
					}
				}
				for(i=0; i< $(".btn_zoom").length; i++){
					if( $(".btn_zoom img").eq(i).attr("src").indexOf("svg") != -1){
						$(".btn_zoom img").eq(i).attr("src", $(".btn_zoom img").eq(i).attr("src").replace("svg", "png") );
					}
				}
			}, 1000)
		}
	});

	//llamada para compatibilidad con ie8 endregion

	//llamada mostrar mensaje error consulta express region
	$(document).ready(function(){

            var el = $("#consultaExpress\\:output");
            if(el.text().length > 1){
                    el.parent().parent().fadeIn();

            }
	});

	//llamada mostrar mensaje error consulta express endregion

	//funciones de accesibilidad region
	/*** FUNCION COOKIE ***/
	
	(function(factory){
            if(typeof define==='function'&&define.amd){
                    define(['jquery'],factory)
            }else{
                    factory(jQuery)
            }
            }
        (function($){
            var pluses=/\+/g;
            function raw(s){
                return s
            }
            function decoded(s){
                return decodeURIComponent(s.replace(pluses,' '))
            }
            function converted(s){
                if(s.indexOf('"')===0){
                    s=s.slice(1,-1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
                }try{
                    return config.json?JSON.parse(s):s} catch(er){}
                }
                var config=$.cookie=function(key,value,options){
                    if(value!==undefined){
                        options=$.extend({},config.defaults,options);
                        if(typeof options.expires==='number'){
                            var days=options.expires,t=options.expires=new Date();
                            t.setDate(t.getDate()+days)
                        }
                        value=config.json?JSON.stringify(value):String(value);
                        return(document.cookie=[config.raw?key:encodeURIComponent(key),'=',config.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''))
                    }
                    var decode=config.raw?raw:decoded;
                    var cookies=document.cookie.split('; ');
                    var result=key?undefined:{};
                    for(var i=0,l=cookies.length;i<l;i++){
                        var parts=cookies[i].split('=');
                        var name=decode(parts.shift());var cookie=decode(parts.join('='));
                        if(key&&key===name){
                            result=converted(cookie);break
                        }
                        if(!key){
                            result[name]=converted(cookie)
                        }
                    }
                    return result
                };
                config.defaults={};
                $.removeCookie=function(key,options){
                    if($.cookie(key)!==undefined){
                        $.cookie(key,'',$.extend({},options,{expires:-1}));
                        return true
                    }
                    return false
                }
            })
        );


	/** AÑADE FONTICON AL HTML **/
	$(".texto-inclusividad.en-linea.texto-grises").prepend('<span class="fa fa-spinner"></span>');
	$("#accesibilidad > :nth-child(6) a").attr('href', '#'); 
	$("#accesibilidad > :nth-child(6) a").attr('id', 'restaurar');

		/*** RESTAURAR ACCESIBILIDAD ***/
		$("#restaurar").on("click", function(){

			location.reload();

			//$.removeCookie('contraste');
			$.removeCookie('contraste');
			$.removeCookie('link');        

			$(".filter-check").prop("checked", false);
			$("input.underline-check").prop("checked", false);

		})   


		/** CARGA CHECKBOX ESCALA GRISES **/
		$(".fa-spinner").hide();
		$('.filter-check').on('change',function(e){
			if($.cookie('contraste')===null){
				$.cookie('contraste','on');
				escalaGrises("to");
				$('a').css('box-shadow','none')
				$("body").addClass("grayscale");
				e.preventDefault();
				return false
			}else{
				if($.cookie('contraste')=='on'){
					$.cookie('contraste','off');
					escalaGrises("from");
					$('a').css('box-shadow','')
					$("body").removeClass("grayscale");        
					e.preventDefault();
					return false
				}else{
					$.cookie('contraste','on');
					$("body").css({"pointer-events":"none"});
					$(".filter-check").hide(100,function(){             
						$(".fa-spinner").addClass("fa-spin").fadeIn(2000,function(){
							$("body").css({"pointer-events":"auto"});                        
							$(".fa-spinner").removeClass("fa-spin").hide();
							$(".filter-check").show()
							escalaGrises("to");
							$('a').css('box-shadow','none')
							$("body").addClass("grayscale");
							e.preventDefault();
							return false
						});
					});
				}
			}
		});

		/** CARGA CHECKBOX LINK SUBRAYADOS**/
		$('input.underline-check').on('change',function(e){
			if($.cookie('link')===null){
				$.cookie('link','on');

				$('a').css('text-decoration','underline');

				e.preventDefault();            
				return false
			}else{
				if($.cookie('link')=='on'){
					$.cookie('link','off');
					$('a').css('text-decoration','none');               
					e.preventDefault();
					return false
				}else{
					$.cookie('link','on');
					$('a').css('text-decoration','underline');                
					e.preventDefault();
					return false
				}
			}
		});

		/*** CHECKBOX GRISES Y SUBRAYADAS MARCADOS ***/
		if($.cookie('link')=='on' && $.cookie('contraste')=='on'){
			$(".filter-check").prop("checked", true);
			escalaGrises("to");
			$('a').css('box-shadow','none')
			$("body").addClass("grayscale");
			$("input.underline-check").prop("checked", true);
			$('a').css('text-decoration','underline');
			//return false
		}else if($.cookie('contraste')=='on'){
			$(".filter-check").prop("checked", true);
			escalaGrises("to");
			$('a').css('box-shadow','none')
			$("body").addClass("grayscale");
			//return false
		}else if($.cookie('link')=='on'){
			$("input.underline-check").prop("checked", true);
			$('a').css('text-decoration','underline');
			//return false
		}

	//funciones de accesibilidad endregion


//llamada a generador de slider en home region
function cb(str){
    for(i=0;i<indicesNames.length;i++){
        if(str==indicesNames[i]){
            return i;
        }
    }
}

if ($("body").hasClass("personas-home-pagos") == true && $("body").hasClass("sub") == false) {
    generarMenuTouch(cb("pagos"));
} else if ($("body").hasClass("personas-home-tramites") == true && $("body").hasClass("sub") == false) {
    generarMenuTouch(cb("tramites"));
} else if ($("body").hasClass("personas-home-consultas") == true && $("body").hasClass("sub") == false) {
    generarMenuTouch(cb("consultas"));
} else if ($("body").hasClass("personas-home-certificados") == true && $("body").hasClass("sub") == false) {
    generarMenuTouch(cb("certificados"));
}

//llamada a generador de slider en home endregion

//llamar al menú, que al finalizar llama a los laterales de accesibilidad y ayuda region

if ($("body").hasClass("consulta-pagos") == false && $("body").hasClass("registro-personas") == false) {
    parcialMenu();
    if ($("body").hasClass("personas-home-pagos") == true ||
        $("body").hasClass("personas-home-tramites") == true ||
        $("body").hasClass("personas-home-consultas") == true ||
        $("body").hasClass("personas-home-certificados") == true ||
        $(".contenedor-menu-touch").length > 0) {
            parcialHeader();
    }
} else{
    parcialMenu("sin-usuario");
}
//llamar al menú, que al finalizar llama a los laterales de accesibilidad y ayuda endregion
//llamadas endregion


function llamarContenidoExterno(url, elemento, destino, appendOprepend, callback){
    var aop = appendOprepend == undefined ? "append" : appendOprepend;
    $.ajax({
        url: url,
        type: "GET",
        datatype: "html",
        success: function(data){
            var obj = data;
            if(appendOprepend == "prepend"){
                destino.prepend( $(obj).find(elemento) );
            } else {
                destino.append( $(obj).find(elemento) );
            }
            if(callback != undefined){
                callback()
            }
        }
    });
}

function quitarOffset(elemento){
    var e = $(elemento),
        c = e.attr("class").split(" "),
        s = "";
    for(i=0; i < c.length; i++){
        if( c[i].indexOf("offset") == -1 ){
            s += c[i] + " "; 
        }
    }
    
    for(i=0; i < c.length; i++){
        if( c[i].indexOf("margin") == -1 ){
            s += c[i] + " "; 
        }
    }
    s = $.trim(s);
    e.attr("class", s);
}
//llamarContenidoExterno( "/Certificados/web/personas-home-tramites.jsf", ".modulo-tramites .md-destacado", $(".modulo-consultas .row").eq(1), "prepend", function(){ quitarOffset(".modulo-consultas .row .md-destacado") });

function mostrarModalIrCerRenta(boton)
{        
	  console.log("function custom.js - Certificados(Facilita)-> mostrarModalIrCerRenta(" + boton + ")");
	  $('#formClaveUnica\\:boton').val(boton);
	  
	  console.log("log_level_2 -> " + '#{log_level_2}');
    if ('#{log_level_2}'  == '' || '#{log_level_2}'  == 'false') 
    {
  	  console.log("Dentro del if log_level_2");
  	  if ('#{MbHomeCertificados.mostrarModalIrCerRenta()}' == 'true')
  	  {
  		  console.log("MbHomeCertificados.mostrarModalIrCerRenta() -> " + '#{MbHomeCertificados.mostrarModalIrCerRenta()}');
      	  
  		  $('#claveUnica').modal('show');
  	  }  
  	  else
 		  {
  		  console.log("Else 1");
 		  	$('#formHomeCertificado\\:irCerRenta').trigger('click');
 		  }
    }
    else
    {
  	  console.log("Else 2");
        $('#formHomeCertificado\\:irCerRenta').trigger('click');                       
    }
}

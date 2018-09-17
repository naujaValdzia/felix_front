$(document).ready(() => {
    $('.user-guide').hide();
    $('#small-dropdown').hide();
    $('#big-dropdown').hide();
        $.ajax({
            url: "api/system",
            method: 'PUT',
            success: function(response) {
                $('#System-row').html(response);
                    console.log("veikia");
                    $(".systems-select").click(function() {
                    $(".systems-select-active").removeClass('systems-select-active');
                    $(this).addClass("systems-select-active");
                    let sysName = $(this).attr("value");
                    $('#inpSystem').val(sysName);
                    });
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });

        
        
        
        
        $('#add').on('click', function() {
            $.ajax({
                url: "api/system/add",
                method: 'GET',
                success: function(response) {
                    $('#content').html(response);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        });


        $('#upd').on('click', function() {
            $.ajax({
                url: "api/system/add",
                method: 'PUT',
                data: {
                    "dssystem": {
                        "ttsystem": [
                            {
                                "systemName": document.getElementById('sysName').value,
                                "localSourcePath": document.getElementById('sysPath').value,
                                "systemPropath": document.getElementById('sysPropath').value,
                                "systemDBparameters": document.getElementById('dbPar').value,
                                "entryPoints": document.getElementById('entryPoint').value,
                                "hasErrors": null,
                                "systemLocation": document.getElementById('sysLocation').value,
                                "id": null
                            }
                        ]
                    }
                },
                
                success: function(response) {
                    //$('#content').html(response);
                    console.log(data);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            
            
        });
    });


	$('#testai').on('click', function() {
    	$('#myModal').modal('show');
    });
	$('#btn1').on('click', function() {
        $('.btn, .elements, .w-100').removeClass('active');
    	$('#btn1').addClass('active');
        $('#inpFiles').val('yes');
        $('.btn-dropdown').removeClass('active-drp');
        $('#small-dropdown').show();
        $('#small-dropdown').addClass('active-drp');
        $('#big-dropdown').hide();
    });
    $('#btn2').on('click', function() {
        $('.btn, .elements, .w-100').removeClass('active');
    	$('#btn2').addClass('active');
        $('#inpDBstruct').val('yes');
        $('.btn-dropdown').removeClass('active-drp');
        $('#small-dropdown').hide();
        $('#big-dropdown').show();
        $('#big-dropdown').addClass('active-drp');
    });
    $('#btn3').on('click', function() {
        $('.btn, .elements, .w-100').removeClass('active');
    	$('#btn3').addClass('active');
        $('#inpUnused').val('yes'); 
        $('.btn-dropdown').removeClass('activ-drp');
        $('#small-dropdown').show();
        $('#big-dropdown').addClass('active-drp');
        $('#big-dropdown').hide();
       
    });
	// $('.elements').on('click', function(){
	// 	$('.active').removeClass('active');
	// 	$(this).addClass('active');
	// });
    // $('#btn1-1').on('click', function() {
    // 	$('#btn1').addClass('active');
    // 	$('#btn21').addClass('active');
    //     $('#btn21').html($(this).attr('type'));
    //     $('#btn21').attr($(this).attr('type'));
    //     $('#inpType').val('11');
    // });
    // $('#btn1-2').on('click', function() {
    // 	$('#btn1').addClass('active');
    // 	$('#btn21').addClass('active');
    // 	$('#btn21').html('Class');
    //     $('#inpType').val('12');
    // });
    // $('#btn1-3').on('click', function() {
    // 	$('#btn1').addClass('active');
    // 	$('#btn21').addClass('active');
    // 	$('#btn21').html('Include');
    //     $('#inpType').val('13');
    // });
    // $('#btn1-4').on('click', function() {
    // 	$('#btn1').addClass('active');
    // 	$('#btn21').addClass('active');
    // 	$('#btn21').html('All');
    //     $('#inpType').val('14');
    // });  
    // $('#btn2-1').on('click', function() {
    // 	$('#btn2').addClass('active');
    // 	$('#btn22').addClass('active');
    // 	$('#btn22').html('DB: access');
    //     $('#inpType').val('21');
    // });
    // $('#btn2-2').on('click', function() {
    // 	$('#btn2').addClass('active');
    // 	$('#btn22').addClass('active');
    // 	$('#btn22').html('DB: update');
    //     $('#inpType').val('22');
    // });
    // $('#btn2-3').on('click', function() {
    // 	$('#btn2').addClass('active');
    // 	$('#btn22').addClass('active');
    // 	$('#btn22').html('DB: delete');
    //     $('#inpType').val('23');
    // });
    // $('#btn2-4').on('click', function() {
    // 	$('#btn2').addClass('active');
    // 	$('#btn22').addClass('active');
    // 	$('#btn22').html('DB: reference');
    //     $('#inpType').val('24');
    // });
    // $('#btn2-5').on('click', function() {
    // 	$('#btn2').addClass('active');
    // 	$('#btn22').addClass('active');
    // 	$('#btn22').html('DB: index');
    //     $('#inpType').val('25');
    // });
    // $('#btn2-6').on('click', function() {
    // 	$('#btn2').addClass('active');
    // 	$('#btn22').addClass('active');
    // 	$('#btn22').html('DB: all');
    //     $('#inpType').val('26');
    // });
    // $('#btn3-1').on('click', function() {
    // 	$('#btn3').addClass('active');
    // 	$('#btn23').addClass('active');
    // 	$('#btn23').html('Un: procedures');
    //     $('#inpType').val('31');
    //     $('#inpUnused').empty();
    //     $('#inpUnused').val('PROCEDURE');
    //     $(this).closest('form').submit();
    // });
    // $('#btn3-2').on('click', function() {
    // 	$('#btn3').addClass('active');
    // 	$('#btn23').addClass('active');
    // 	$('#btn23').html('Un: classes');
    //     $('#inpType').val('32');
    //     $('#inpUnused').empty();
    //     $('#inpUnused').val('CLASS');
    //     $(this).closest('form').submit();
    // });
    // $('#btn3-3').on('click', function() {
    // 	$('#btn3').addClass('active');
    // 	$('#btn23').addClass('active');
    // 	$('#btn23').html('Un: includes');
    //     $('#inpType').val('33');
    //     $('#inpUnused').empty();
    //     $('#inpUnused').val('INCLUDE');
    //     $(this).closest('form').submit();
    // });
    // $('#btn3-4').on('click', function() {
    // 	$('#btn3').addClass('active');
    // 	$('#btn23').addClass('active');
    // 	$('#btn23').html('Un: all');
    //     $('#inpType').val('34');
    //     $('#inpUnused').empty();
    //     $('#inpUnused').val('*');
    //     $(this).closest('form').submit();
    // });
//    $('#btn3-1').on('click', function() {
//    	$('#btn3').addClass('active');
//    	$('#btn23').addClass('active');
//    	$('#btn23').html('Un:procedures');
//        $('#inpType').val('31');
//    });
//    $('#btn3-2').on('click', function() {
//    	$('#btn3').addClass('active');
//    	$('#btn23').addClass('active');
//    	$('#btn23').html('DB: update');
//        $('#inpType').val('32');
//    });
//    $('#btn3-3').on('click', function() {
//    	$('#btn3').addClass('active');
//    	$('#btn23').addClass('active');
//    	$('#btn23').html('DB: delete');
//        $('#inpType').val('33');
//    });
//    $('#btn3-4').on('click', function() {
//    	$('#btn3').addClass('active');
//    	$('#btn23').addClass('active');
//    	$('#btn23').html('DB: reference');
//        $('#inpType').val('34');
//    });
    $('#btn4').on('click', function() {
    	$('.about').hide();
        $('.user-guide').show();
        $('.form-holder').empty();
    });
    
    
    $('.elements').on('click', function(){
    	$('#btn2').html('DB structure');
    });
    $('.elements').on('click', function(){
    	$('#btn3').html('Unused');
    });

    $(".systems-list").on('click', '.errbtn', function( event ) {
        event.preventDefault();

        $(".systems-select-active").removeClass('systems-select-active');
        $(this).parents('li').addClass("systems-select-active");

        $.ajax({
            url: "api/error",
            method: 'PUT',
            data: {
                "systemName": $(this).attr("sysName")
            },
           
            success: function(response) {
                $('#content').html(response);
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });        
    });

    $(".systems-list").on('click', '.edit-system', function( event ){ 
        event.preventDefault();
        $.ajax({
            url: "api/system/edit",
            method: 'PUT',
            data: {"pcSystem": $(this).attr("sysName")},
            success: function(response) {
                $('#content').html(response);
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });

      
        
    });

    $("#btnReport").on('click', function( event ) {
        let fValid = true;
        let button = $(".btn, .elements, .w-100, .active").id();


        // if ($('#inpName').val() == "") {
        //     $('#invFeedbackName').show();
        //     fValid = false;
        // };
        // if ($('#inpType').val() == "0") {
        //     $('#invFeedbackType').show();
        //     fValid = false;
        // };
        // fValid = true;
        if (fValid) {
            $('.invalid-feedback').hide();
            $('#inpDetails').val('no');
            event.preventDefault();
            if(button = "btn1"){
                $.ajax({
                        url: "/api/system/fileReport",
                        method: 'PUT',
                        data: {
                                "pcSystem": $('.systems-select-active').attr("sysName"),
                                "pcFileName": $('#inpName').val(),
                                "pcType": $('.active-drp').val()
                        },
                        success: function(response) {
                            $('#content').html(response);
                            
                        },
                        error: function(xhr) {
                            console.log(xhr);
                        }
                    });
                }
                if(button = "btn2"){
                    $.ajax({
                            url: "/api/system/fieldReport",
                            method: 'PUT',
                            data: {
                                    "pcSystem": $('.systems-select-active').attr("sysName"),
                                    "pcFileName": $('#inpName').val(),
                                    "pcType": $('.active-drp').val()
                            },
                            success: function(response) {
                                $('#content').html(response);
                                
                            },
                            error: function(xhr) {
                                console.log(xhr);
                            }
                        });
                    }
                    if(button = "btn3"){
                        $.ajax({
                                url: "/api/system/UnusedReport",
                                method: 'PUT',
                                data: {
                                        "pcSystem": $('.systems-select-active').attr("sysName"),
                                        "pcFileName": $('#inpName').val(),
                                        "pcType": $('.active-drp').val()
                                },
                                success: function(response) {
                                    $('#content').html(response);
                                    
                                },
                                error: function(xhr) {
                                    console.log(xhr);
                                }
                            });
                        }
        } 
    });

    $("#btnTree").click(function( event ) {
        let fValid = true;
        if ($('#inpName').val() == "") {
            $('#invFeedbackName').show();
            fValid = false;
        };
        if (fValid) {
        	console.log('Tree button submitted');
            $('.invalid-feedback').hide();
            $('#inpTree').val('yes');
            $("#xrefForm").submit();
        } else {
        event.preventDefault();
        }
    });
    
    

    $(".tree-bucket-entries").click(function() {
    	$(this).closest('form').submit();
    });

    /*--------- SCROLL BACK TO TOP ARROW:   ----------*/

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 200) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    });
    $('#return-to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

    /*--------- HIGHLIGHT ACTIVE BUTTON:   ----------*/
    
    var header = document.getElementById("elements-holder");
    var btns = header.getElementsByClassName("elements");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    };
});
$(document).ready(() => {
    $('#small-dropdown').hide();
    $('#big-dropdown').hide();
        $.ajax({
            url: "api/system",
            method: 'PUT',
            success: function(response) {
                $('#System-row').html(response);
                
                $('.errbtn').hide();

                $('[hasErr="true"]').find('.errbtn').show();

                $(".systems-select").click(function() {
                $(".systems-select-active").removeClass('systems-select-active');
                $(this).addClass("systems-select-active");
                let sysName = $(this).attr("value");
                $('#inpSystem').val(sysName);
                })
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });

        $(".list-group").on('click','#add', function() {
            event.preventDefault();
            $.ajax({
                url: "/api/system/add",
                method: 'POST',
            success: function(response) {
                $('#content').html(response);
            },
            error: function(xhr) {
                console.log(xhr);
            }
            });
        })

        $(".form-holder").on('click','#addSys', function() {
            event.preventDefault();
            $.ajax({
                url: "/api/system/add",
                method: 'PUT',
                data: {
                        "systemName": document.getElementById('sysName').value,
                        "localSourcePath": document.getElementById('sysPath').value,
                        "systemPropath": document.getElementById('sysPropath').value,
                        "systemDBparameters": document.getElementById('dbPar').value,
                        "entryPoints": document.getElementById('entryPoint').value,
                        "systemLocation": "",
                        "id": null
                },
                success: function(response) {
                    $('#content').html(response);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        });

        $(".form-holder").on('click','#upd', function() {
            event.preventDefault();
            $.ajax({
                url: "/api/system/update",
                method: 'PUT',
                data: {
                        "systemName": document.getElementById('sysName').value,
                        "localSourcePath": document.getElementById('sysPath').value,
                        "systemPropath": document.getElementById('sysPropath').value,
                        "systemDBparameters": document.getElementById('dbPar').value,
                        "entryPoints": document.getElementById('entryPoint').value,
                        "systemLocation": "",
                        "id": null
                        },
                success: function(response) {
                    $('#content').html(response);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
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
            $('#small-dropdown').addClass('active-drp');
            $('#big-dropdown').hide();
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

        $(".form-holder").on('click','#btnDelete', function() {
            event.preventDefault();
            $.ajax({
                url: "api/system/delete",
                method: 'PUT',
                data: {"pcSystem": $(".systems-select-active").attr("sysName")},
                success: function(response) {
                    $('#content').html(response);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
            $(".systems-select-active").hide();
        });


        $(".form-holder").on('click', '.showLine', function( event ) {
            event.preventDefault();
            let id = $(this).attr('id');
            let tableId = $(this).attr('tableNum');

            $.ajax({
                url: "/api/system/fileReportDetail",
                method: 'PUT',
                data: {
                        "pcCompileUnit": document.getElementById(id).getAttribute("value"),
                        "pcSystem": $('.systems-select-active').attr("sysName"),
                        "pcType": $('.active-drp').val(),
                        "pcFileName": $('#inpName').val()
                },
                success: function(response) {
                    $(tableId).html(response);
                    $('.table-holder').hide();
                    $(tableId).show();
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        });

        $(".form-holder").on('click', '.showFieldLine', function( event ) {
            event.preventDefault();
            let id = $(this).attr('id');
            let tableId = $(this).attr('tableNum');

            $.ajax({
                url: "/api/system/fieldDetailedReport",
                method: 'PUT',
                data: {
                        "pcCompileUnit": document.getElementById(id).getAttribute("value"),
                        "pcSystem": $('.systems-select-active').attr("sysName"),
                        "pcDbFieldName": $('#inpName').val(),
                        "pcType": $('.active-drp').val()
                },
                success: function(response) {
                    $(tableId).html(response);
                    $('.table-holder').hide();
                    $(tableId).show();
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        });

        $("#btnReport").on('click', function( event ) {
            let fValid = true;
            event.preventDefault();
            let whichButton = $(".active").attr('id');

            //Validation
            if ($('#inpName').val() == "") {
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').hide();
                $('#invFeedbackName').show();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').hide();
                fValid = false;
            };

            if ($('.systems-select-active').attr("sysName") == undefined) {
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').show();
                $('#invFeedbackName').hide();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').hide();
                fValid = false;
            };

            if ($('.active-drp').val() == undefined) {
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').hide();
                $('#invFeedbackName').hide();
                $('#invFeedbackType').show();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').hide();
                fValid = false;
            };

            if ($('.active-drp').val() == undefined && $('#inpName').val() == "") {
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').hide();
                $('#invFeedbackName').hide();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').show();
                $('#invFeedbackNameSystemType').hide();
                fValid = false;
            };

            if ($('.systems-select-active').attr("sysName") == undefined && $('#inpName').val() == "") {
                $('#invFeedbackSystemAndName').show();
                $('#invFeedbackSystem').hide();
                $('#invFeedbackName').hide();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').hide();
                fValid = false;
            };

            if ($('.systems-select-active').attr("sysName") == undefined && $('#inpName').val() == "" && $('.active-drp').val() == undefined) {
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').hide();
                $('#invFeedbackName').hide();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').show();
                fValid = false;
            };

            if(whichButton == "btn3" && $('.systems-select-active').attr("sysName") != undefined){
                $('#invFeedbackName').hide();
                fValid = true;
            }

            if(whichButton == "btn3" && $('.systems-select-active').attr("sysName") == undefined){
                $('#invFeedbackName').hide();
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').show();
                fValid = false;
            }
            
            if (fValid) {
                $('.invalid-feedback').hide();
                if(whichButton == "btn1"){
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
                            $('.table-holder').hide();
                        },
                        error: function(xhr) {
                            console.log(xhr);
                        }
                    });
                }
                else if(whichButton == "btn2"){
                    $.ajax({
                        url: "/api/system/fieldReport",
                        method: 'PUT',
                        data: {
                                "pcSystem": $('.systems-select-active').attr("sysName"),
                                "pcDbFieldName": $('#inpName').val(),
                                "pcType": $('.active-drp').val()
                        },
                        success: function(response) {
                            $('#content').html(response);
                            $('.table-holder').hide();
                        },
                        error: function(xhr) {
                            console.log(xhr);
                        }
                    });
                }
                else if(whichButton == "btn3"){
                    $.ajax({
                        url: "/api/system/unusedReport",
                        method: 'PUT',
                        data: {
                                "pcSystem": $('.systems-select-active').attr("sysName"),
                                "pcType": $('.active-drp').val()
                        },
                        success: function(response) {
                            $('#content').html(response)
                        },
                        error: function(xhr) {
                            console.log(xhr);
                        }
                    });
                };
            };
        });

        $("#btn4").on('click', function( event ) {
            event.preventDefault();
            $.ajax({
                url: "/api/system/userGuide",
                success: function(response) {
                    $('#content').html(response);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            })

        });

        $("#btnTree").on('click', function( event ) {
            event.preventDefault();
            let fValid = true;

            if ($('#inpName').val() == "") {
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').hide();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').hide();
                $('#invFeedbackName').show();
                fValid = false;
            };
            if ($('.systems-select-active').attr("sysName") == undefined) {
                $('#invFeedbackSystemAndName').hide();
                $('#invFeedbackSystem').show();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').hide();
                $('#invFeedbackName').hide();
                fValid = false;
            };
            if ($('.systems-select-active').attr("sysName") == undefined && $('#inpName').val() == "") {
                $('#invFeedbackSystemAndName').show();
                $('#invFeedbackSystem').hide();
                $('#invFeedbackType').hide();
                $('#invFeedbackTypeAndName').hide();
                $('#invFeedbackNameSystemType').hide();
                $('#invFeedbackName').hide();
                fValid = false;
            };
            if (fValid) {
                $.ajax({
                    url: "/api/system/treeView",
                    method: 'PUT',
                    data: {
                        "pcSystem": $('.systems-select-active').attr("sysName"),
                        "pcFileName": $('#inpName').val()
                    },
                    success: function(response) {
                        $('#content').html(response);
                        console.log(response);
                    },
                    error: function(xhr) {
                        console.log(xhr);
                    }
                });
            }
        }
    );
});

function validationErrors() {
    $('#invFeedbackSystemAndName').hide();
    $('#invFeedbackSystem').hide();
    $('#invFeedbackName').hide();
    $('#invFeedbackType').hide();
    $('#invFeedbackTypeAndName').hide();
    $('#invFeedbackNameSystemType').hide();
};
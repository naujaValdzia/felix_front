$(document).ready(() => {
    $('#small-dropdown').hide();
    $('#big-dropdown').hide();
        $.ajax({
            url: "api/system",
            method: 'PUT',
            success: function(response) {
                $('#System-row').html(response);
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
        
        $(".list-group").on('click','#add', function() {
            console.log("adddddinas");
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
                        "systemLocation": document.getElementById('sysLocation').value,
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
                        "systemLocation": document.getElementById('sysLocation').value,
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

        $("#btnReport").on('click', function( event ) {
            let fValid = true;
            event.preventDefault();
            let whichButton = $(".active").attr('id');
            
            if ($('#inpName').val() == "") {
                $('#invFeedbackName').show();
                fValid = false;
            };

            if(whichButton == "btn3"){
                $('#invFeedbackName').hide();
                fValid = true;
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
                            $('#content').html(response),
                                console.log(response);
                        },
                        error: function(xhr) {
                            console.log(xhr);
                        }
                    });
                };
            };
        });

        $("#btnTree").on('click', function( event ) {
            $('#treeTable').show();
            let fValid = true;
            if (fValid) {
                $.ajax({
                    url: "/api/system/treeView",
                    data: {
                        "pcSystem": $('.systems-select-active').attr("sysName"),
                        "pcFileName": $('#inpName').val()
                },
                    success: function(response) {
                        $('#treeTable').html(response);
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

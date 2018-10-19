$(document).ready(() => {
    $('#small-dropdown').hide();
    $('#big-dropdown').hide();
    $('#btnTree').hide();
    $.ajax({
        url: "api/system",
        method: 'GET',
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
            method: 'GET',
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
            method: 'POST',
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
                $.ajax({
                    url: "api/system",
                    method: 'GET',
                    success: function(response) {
                    $('#System-row').html(response);
                    }});
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
        $('#btnTree').show();
        fillDRopdwonType1();
        $('#btn1').addClass('active');
    });
    $('#btn2').on('click', function() {
        $('#btnTree').hide();
        fillDRopdwonType2();
        $('#btn2').addClass('active');
    });
    $('#btn3').on('click', function() {
        $('#btnTree').hide();
        fillDRopdwonType1();
        $('#btn3').addClass('active');
    });

    $(".systems-list").on('click', '.errbtn', function( event ) {
        event.preventDefault();
        $(".systems-select-active").removeClass('systems-select-active');
        $(this).parents('li').addClass("systems-select-active");

        $.ajax({
            url: "api/error",
            method: 'GET',
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
            method: 'GET',
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
            method: 'GET',
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
            method: 'GET',
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

        let whichButton = $(".active").attr('id');

        if (validateReport(whichButton)) {
            $('.invalid-feedback').hide();
            if(whichButton === "btn1"){
                $.ajax({
                    url: "/api/system/fileReport",
                    method: 'GET',
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
            else if(whichButton === "btn2"){
                $.ajax({
                    url: "/api/system/fieldReport",
                    method: 'GET',
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
            else if(whichButton === "btn3"){
                $.ajax({
                    url: "/api/system/unusedReport",
                    method: 'GET',
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
                $('.carousel').carousel()
            },
            error: function(xhr) {
                console.log(xhr);
            }
        })

    });

    $("#btnTree").on('click', function( event ) {
        if (validateTree()) {
            $.ajax({
                url: "/api/system/treeView",
                method: 'GET',
                data: {
                    "pcSystem": $('.systems-select-active').attr("sysName"),
                    "pcFileName": $('#inpName').val()
                },
                success: function(response) {
                    $('#content').html(response);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        }
    });
});

function hideFeedback() {
    $('#invFeedbackSystemAndName').hide();
    $('#invFeedbackSystem').hide();
    $('#invFeedbackName').hide();
    $('#invFeedbackType').hide();
    $('#invFeedbackTypeAndName').hide();
    $('#invFeedbackNameSystemType').hide();
};

function validateTree(){
    event.preventDefault();
    let fValid = true;

    if ($('#inpName').val() === "") {
        hideFeedback();
        $('#invFeedbackName').show();
        fValid = false;
    };
    if ($('.systems-select-active').attr("sysName") === undefined) {
        hideFeedback();
        $('#invFeedbackSystem').show();
        fValid = false;
    };
    if ($('.systems-select-active').attr("sysName") === undefined && $('#inpName').val() === "") {                
        hideFeedback();
        $('#invFeedbackSystemAndName').show();
        fValid = false;
    };
    if ($('.systems-select-active').attr("sysName") !== undefined && $('#inpName').val() !== "") {
        hideFeedback();
        fValid = true;
    };
    return fValid;
}

function validateReport(whichButton){

    let fValid = true;
    event.preventDefault();

    if ($('.systems-select-active').attr("sysName") === undefined) {
        hideFeedback();
        $('#invFeedbackSystem').show();
        fValid = false;
    };
    
    if ($('#inpName').val() === "") {
        hideFeedback();
        $('#invFeedbackName').show();
        fValid = false;
    };

    if ($('.active-drp').val() === undefined) {
        hideFeedback();
        $('#invFeedbackType').show();
        fValid = false;
    };

    if ($('.active-drp').val() === undefined && $('#inpName').val() === "") {
        hideFeedback();
        $('#invFeedbackTypeAndName').show();
        fValid = false;
    };

    if ($('.systems-select-active').attr("sysName") === undefined && $('#inpName').val() === "") {
        hideFeedback();
        $('#invFeedbackSystemAndName').show();
        fValid = false;
    };

    if ($('.systems-select-active').attr("sysName") === undefined && $('#inpName').val() === "" && $('.active-drp').val() === undefined) {
        hideFeedback();
        $('#invFeedbackNameSystemType').show();
        fValid = false;
    };

    if ($('.systems-select-active').attr("sysName") !== undefined && $('#inpName').val() !== "" && $('.active-drp').val() !== undefined) {
        hideFeedback();
        fValid = true;
    };

    if(whichButton === "btn3" && $('.systems-select-active').attr("sysName") !== undefined){
        $('#invFeedbackName').hide();
        fValid = true;
    };

    if(whichButton === "btn3" && $('.systems-select-active').attr("sysName") === undefined){
        $('#invFeedbackName').hide();
        $('#invFeedbackSystemAndName').hide();
        $('#invFeedbackSystem').show();
        fValid = false;
    };

    return fValid;
}

function fillDRopdwonType1(){
    $('.btn, .elements, .w-100').removeClass('active');
    $('#inpFiles').val('yes');
    $('.btn-dropdown').removeClass('active-drp');
    $('#small-dropdown').show();
    $('#small-dropdown').addClass('active-drp');
    $('#big-dropdown').hide();
};
function fillDRopdwonType2(){
    $('.btn, .elements, .w-100').removeClass('active');
    $('#inpDBstruct').val('yes');
    $('.btn-dropdown').removeClass('active-drp');
    $('#small-dropdown').hide();
    $('#big-dropdown').show();
    $('#big-dropdown').addClass('active-drp');
};
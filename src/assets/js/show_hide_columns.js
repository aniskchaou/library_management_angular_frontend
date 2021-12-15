 $('a.toggle-vis').on( 'click', function (e) {
        e.preventDefault();
        //alert("kjlkblh");
        // Get the column API object
        var column = $('#table').column( $(this).attr('data-column') );
 
        // Toggle the visibility
        column.visible( ! column.visible() );
    } );
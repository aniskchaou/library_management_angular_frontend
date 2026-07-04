// jQuery + datatables.net removed. This class is kept as a no-op base
// so subclasses (URLLoader and derived components) still compile.

export class DataTables {
    constructor() {
        
    }

   public enableDataTable(){
        // No-op. Use <ngx-datatable> in component templates instead.
        return;
        /* legacy jQuery DataTables init:
        ($('#dataTabled','#dt-member') as any).DataTable({
            paging: true,
            lengthChange: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: true,
            responsive: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            order: [[1, 'asc']],
            columnDefs: [
              { targets: [0], visible: true, searchable: true },
              { targets: '_all', visible: true, searchable: true }
            ],
            language: {
              lengthMenu: "Display _MENU_ records per page",
              zeroRecords: "Nothing found - sorry",
              info: "Showing page _PAGE_ of _PAGES_",
              infoEmpty: "No records available",
              infoFiltered: "(filtered from _MAX_ total records)",
              search: "Search:",
              paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
              }
            },
            dom: 'Bfrtip',
            buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            fixedHeader: true,
            colReorder: true,
            stateSave: true,
            select: true
          });
        */
    }
}
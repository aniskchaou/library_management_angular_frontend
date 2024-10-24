import showMessage from '../notification/notification';
import { DataTables } from './DataTables';

export class URLLoader  extends DataTables{
  constructor() {super()}

  show(title, message, type) {
    showMessage(title, message, type);
  }

  loadScripts() {
    const dynamicScripts = [
      'https://code.jquery.com/jquery-2.2.4.min.js',
      //'../assets/scripts/datatables/jquery.dataTables.js',
      'https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js',
      'https://cdn.datatables.net/v/dt/b-1.6.5/b-flash-1.6.5/b-html5-1.6.5/datatables.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js',
      'https://cdn.datatables.net/v/dt/dt-1.10.23/b-1.6.5/b-colvis-1.6.5/b-html5-1.6.5/datatables.min.js',
      'https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.23/b-1.6.5/b-html5-1.6.5/b-print-1.6.5/datatables.min.js',
      'https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js',
      '/assets/js/notification.js',
      // '/assets/js/init.js',
      //'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js',
      //'../assets/js/selectpicker.js',
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('app-root')[0].appendChild(node);
    }


  }

  initDataTable(selector:string)
  {
    //this.loadScripts();
    ($('#'+selector) as any).DataTable({
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
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import Circulation from 'src/app/main/models/Circulation';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/** Row for the popular-titles table */
export interface TitleStat {
  rank: number;
  id: number;
  title: string;
  author: string;
  category: string;
  borrowCount: number;
  activeLoans: number;
  lastBorrowed: string;
}

/** Row for the active-readers table */
export interface ReaderStat {
  memberId: number;
  name: string;
  email: string;
  activeLoans: number;
  totalBorrows: number;
  lastBorrowed: string;
}

type DateRange = '30d' | '90d' | '180d' | '1y' | 'all';

@Component({
  selector: 'app-borrowing-statistics',
  templateUrl: './borrowing-statistics.component.html',
  styleUrls: ['./borrowing-statistics.component.css'],
  standalone: false,
})
export class BorrowingStatisticsComponent extends URLLoader implements OnInit {

  // ─── State ────────────────────────────────────────────────────────────────
  loading = false;
  dateRange: DateRange = '1y';

  // ─── Raw data ─────────────────────────────────────────────────────────────
  private _allCirc: Circulation[] = [];
  private _allBooks: CatalogItem[] = [];

  // ─── KPIs ─────────────────────────────────────────────────────────────────
  kpiTotalBorrows  = 0;
  kpiActiveLoans   = 0;
  kpiActiveReaders = 0;
  kpiOverdue       = 0;
  kpiAvgPerMonth   = 0;
  kpiUniqueTitle   = 0;

  // ─── ngx-charts: Popular Titles (horizontal bar) ──────────────────────────
  titleChartData: { name: string; value: number }[] = [];
  chartView: [number, number] = [760, 320];
  showXAxis = true; showYAxis = true; gradient = true;
  showLegend = false; showXAxisLabel = true; showYAxisLabel = true;
  xAxisLabel = 'Borrow Count'; yAxisLabel = 'Title';
  colorScheme = { domain: ['#3f51b5', '#5c6bc0', '#7986cb', '#9fa8da', '#c5cae9'] };

  // ─── ngx-charts: Monthly Trend (line) ─────────────────────────────────────
  monthlyTrendData: { name: string; series: { name: string; value: number }[] }[] = [];
  trendView: [number, number] = [760, 260];
  showGridLines = true; autoScale = true;
  xAxisLabelTrend = 'Month'; yAxisLabelTrend = 'Borrows';
  colorSchemeTrend = { domain: ['#1a237e', '#43a047'] };

  // ─── Tables ───────────────────────────────────────────────────────────────
  popularTitles: TitleStat[]     = [];
  activeReaders: ReaderStat[]    = [];
  procurementAlerts: TitleStat[] = [];

  /** Minimum borrow-count threshold to flag as high-demand */
  procurementThreshold = 3;

  constructor(private httpService: HTTPService) { super(); }

  ngOnInit(): void {
    this.loadScripts();
    this._load();
  }

  // ─── Data loading ──────────────────────────────────────────────────────────

  private _load(): void {
    this.loading = true;

    let circDone = false, booksDone = false;
    const _tryCompute = () => {
      if (circDone && booksDone) {
        if (this._allCirc.length === 0) { this._useDemoData(); }
        this.loading = false;
        this._compute();
      }
    };

    this.httpService.getAll(CONFIG.URL_BASE + '/circulation/all').subscribe({
      next: (data: Circulation[]) => { this._allCirc = data || []; circDone = true; _tryCompute(); },
      error: (e: HttpErrorResponse) => { super.show('Error', e.message, 'warning'); this.loading = false; },
    });

    this.httpService.getAll(CONFIG.URL_BASE + '/book/all').subscribe({
      next: (data: CatalogItem[]) => { this._allBooks = data || []; booksDone = true; _tryCompute(); },
      error: () => { booksDone = true; _tryCompute(); },
    });
  }

  onRangeChange(): void { this._compute(); }

  // ─── Computation ──────────────────────────────────────────────────────────

  private _compute(): void {
    const cutoff = this._cutoffDate();
    const filtered = cutoff
      ? this._allCirc.filter(c => new Date(c.issueDate) >= cutoff)
      : this._allCirc;

    // ── KPIs ────────────────────────────────────────────────────────────────
    const now = new Date();
    const activeLoans   = filtered.filter(c => !c.returnDate);
    const overdueLoans  = activeLoans.filter(c => new Date(c.toReturn) < now);
    const readerSet     = new Set(activeLoans.map(c => c.memberName?.id).filter(Boolean));
    const titleSet      = new Set(filtered.map(c => c.catalogItemName?.id).filter(Boolean));

    this.kpiTotalBorrows  = filtered.length;
    this.kpiActiveLoans   = activeLoans.length;
    this.kpiActiveReaders = readerSet.size;
    this.kpiOverdue       = overdueLoans.length;
    this.kpiUniqueTitle   = titleSet.size;
    this.kpiAvgPerMonth   = this._avgPerMonth(filtered);

    // ── Popular titles table ─────────────────────────────────────────────────
    const countByTitle = new Map<number, { circ: Circulation[]; active: number }>();
    for (const c of filtered) {
      const id = c.catalogItemName?.id;
      if (!id) continue;
      if (!countByTitle.has(id)) countByTitle.set(id, { circ: [], active: 0 });
      const entry = countByTitle.get(id);
      entry.circ.push(c);
      if (!c.returnDate) entry.active++;
    }

    const sorted = Array.from(countByTitle.entries())
      .sort((a, b) => b[1].circ.length - a[1].circ.length);

    this.popularTitles = sorted.slice(0, 30).map(([id, { circ, active }], i) => {
      const book = circ[0].catalogItemName;
      const dates = circ.map(c => new Date(c.issueDate).getTime());
      return {
        rank: i + 1,
        id,
        title:       book?.title        || '—',
        author:      book?.writer?.name || '—',
        category:    book?.category?.categoryName || '—',
        borrowCount: circ.length,
        activeLoans: active,
        lastBorrowed: new Date(Math.max(...dates)).toLocaleDateString('en-GB'),
      };
    });

    // ── ngx-charts: top 15 horizontal bar ───────────────────────────────────
    this.titleChartData = this.popularTitles.slice(0, 15).map(t => ({
      name:  t.title.length > 32 ? t.title.slice(0, 30) + '…' : t.title,
      value: t.borrowCount,
    }));

    // ── Monthly trend ────────────────────────────────────────────────────────
    this.monthlyTrendData = [{
      name: 'Borrows',
      series: this._monthSeries(filtered, 12),
    }, {
      name: 'Returns',
      series: this._monthSeries(filtered.filter(c => !!c.returnDate), 12),
    }];

    // ── Active readers table (top 20 by active loans) ────────────────────────
    const readerMap = new Map<number, { member: Member; circ: Circulation[]; active: number }>();
    for (const c of filtered) {
      const m = c.memberName;
      if (!m?.id) continue;
      if (!readerMap.has(m.id)) readerMap.set(m.id, { member: m, circ: [], active: 0 });
      const r = readerMap.get(m.id);
      r.circ.push(c);
      if (!c.returnDate) r.active++;
    }
    this.activeReaders = Array.from(readerMap.values())
      .sort((a, b) => b.active - a.active || b.circ.length - a.circ.length)
      .slice(0, 20)
      .map(({ member, circ, active }) => {
        const dates = circ.map(c => new Date(c.issueDate).getTime());
        return {
          memberId:    member.id,
          name:        `${member.firstname || ''} ${member.surname || ''}`.trim(),
          email:       member.email || '—',
          activeLoans: active,
          totalBorrows: circ.length,
          lastBorrowed: new Date(Math.max(...dates)).toLocaleDateString('en-GB'),
        };
      });

    // ── Procurement alerts ───────────────────────────────────────────────────
    // High-demand = borrowed >= threshold in the selected window AND still has active loans
    this.procurementAlerts = this.popularTitles.filter(
      t => t.borrowCount >= this.procurementThreshold && t.activeLoans > 0
    );
  }

  // ─── Demo data (shown when API returns empty) ─────────────────────────────

  private _useDemoData(): void {
    const BOOKS: { id: number; title: string; author: string; category: string }[] = [
      { id: 1,  title: 'Clean Code',                   author: 'Robert C. Martin', category: 'Technology'  },
      { id: 2,  title: 'The Pragmatic Programmer',      author: 'Andrew Hunt',       category: 'Technology'  },
      { id: 3,  title: 'Design Patterns',               author: 'Gang of Four',      category: 'Technology'  },
      { id: 4,  title: 'Atomic Habits',                 author: 'James Clear',       category: 'Self-Help'   },
      { id: 5,  title: 'Deep Work',                     author: 'Cal Newport',       category: 'Self-Help'   },
      { id: 6,  title: 'Sapiens',                       author: 'Yuval Noah Harari', category: 'History'     },
      { id: 7,  title: 'The Great Gatsby',              author: 'F. Scott Fitzgerald', category: 'Fiction'   },
      { id: 8,  title: 'To Kill a Mockingbird',         author: 'Harper Lee',        category: 'Fiction'     },
      { id: 9,  title: 'Introduction to Algorithms',    author: 'Cormen et al.',     category: 'Technology'  },
      { id: 10, title: 'The Psychology of Money',       author: 'Morgan Housel',     category: 'Finance'     },
    ];
    const MEMBERS: { id: number; firstname: string; surname: string; email: string }[] = [
      { id: 1, firstname: 'Alice',   surname: 'Johnson',  email: 'alice@library.org'   },
      { id: 2, firstname: 'Bob',     surname: 'Williams', email: 'bob@library.org'     },
      { id: 3, firstname: 'Cathy',   surname: 'Brown',    email: 'cathy@library.org'   },
      { id: 4, firstname: 'David',   surname: 'Jones',    email: 'david@library.org'   },
      { id: 5, firstname: 'Eva',     surname: 'Garcia',   email: 'eva@library.org'     },
      { id: 6, firstname: 'Frank',   surname: 'Martinez', email: 'frank@library.org'   },
      { id: 7, firstname: 'Grace',   surname: 'Lee',      email: 'grace@library.org'   },
      { id: 8, firstname: 'Henry',   surname: 'Wilson',   email: 'henry@library.org'   },
    ];

    const now = Date.now();
    const DAY = 86_400_000;
    const rand = (max: number) => Math.floor(Math.random() * max);

    // Generate ~70 circulation records spread across the last 12 months
    const circs: Circulation[] = [];
    for (let i = 0; i < 70; i++) {
      const book   = BOOKS[rand(BOOKS.length)];
      const member = MEMBERS[rand(MEMBERS.length)];
      const issueOffset  = rand(365); // days ago
      const issueDate    = new Date(now - issueOffset * DAY);
      const dueOffset    = 14; // 2-week loan
      const toReturn     = new Date(issueDate.getTime() + dueOffset * DAY);
      const isReturned   = rand(100) < 65; // 65% returned
      const returnDate   = isReturned
        ? new Date(toReturn.getTime() + (rand(7) - 2) * DAY) // returned near due date
        : null;

      circs.push({
        id: i + 1,
        memberName: { id: member.id, firstname: member.firstname, surname: member.surname, email: member.email } as any,
        catalogItemName: {
          id: book.id,
          title: book.title,
          writer: { name: book.author } as any,
          category: { categoryName: book.category, category_name: book.category } as any,
        } as any,
        issueDate: issueDate.toISOString().slice(0, 10),
        toReturn:  toReturn.toISOString().slice(0, 10),
        returnDate: returnDate ? returnDate.toISOString().slice(0, 10) : null,
        lastDate: toReturn.toISOString().slice(0, 10),
        penalty: '0',
        writer: null,
        returnStatus: null,
      } as any);
    }
    this._allCirc = circs;
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private _cutoffDate(): Date | null {
    const now = Date.now();
    const MS = { '30d': 30, '90d': 90, '180d': 180, '1y': 365 };
    if (this.dateRange === 'all') return null;
    return new Date(now - MS[this.dateRange] * 86_400_000);
  }

  private _avgPerMonth(circs: Circulation[]): number {
    if (!circs.length) return 0;
    const series = this._monthSeries(circs, 12);
    const total  = series.reduce((s, m) => s + m.value, 0);
    return Math.round(total / (series.length || 1));
  }

  private _monthSeries(
    circs: Circulation[],
    months: number
  ): { name: string; value: number }[] {
    const now    = new Date();
    const result: { name: string; value: number }[] = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
      const count = circs.filter(c => {
        const cd = new Date(c.issueDate);
        return cd.getFullYear() === d.getFullYear() && cd.getMonth() === d.getMonth();
      }).length;
      result.push({ name: label, value: count });
    }
    return result;
  }

  dateRangeLabel(): string {
    const labels: Record<DateRange, string> = {
      '30d': 'Last 30 Days', '90d': 'Last 3 Months',
      '180d': 'Last 6 Months', '1y': 'Last Year', 'all': 'All Time',
    };
    return labels[this.dateRange];
  }

  borrowBadgeClass(count: number): string {
    if (count >= 10) return 'bs-badge bs-badge--hot';
    if (count >= 5)  return 'bs-badge bs-badge--warm';
    return 'bs-badge bs-badge--cool';
  }

  coverUrl(id: number): string {
    const book = this._allBooks.find(b => b.id === id);
    return book?.photo ? `${CONFIG.URL_BASE}/book/image/${book.photo}` : 'assets/images/no-cover.png';
  }

  // ─── Export ───────────────────────────────────────────────────────────────

  exportCsv(): void {
    const header = 'Rank,Title,Author,Category,Borrows,Active Loans,Last Borrowed\n';
    const rows   = this.popularTitles
      .map(t => `${t.rank},"${t.title}","${t.author}","${t.category}",${t.borrowCount},${t.activeLoans},${t.lastBorrowed}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `borrowing-statistics-${this.dateRange}.csv`);
  }

  exportPdf(): void {
    const doc = new jsPDF({ orientation: 'landscape' }) as any;
    doc.setFontSize(14);
    doc.text(`Borrowing & Popularity Statistics — ${this.dateRangeLabel()}`, 14, 16);
    doc.setFontSize(9);
    doc.text(
      `Generated: ${new Date().toLocaleDateString('en-GB')} | Total Borrows: ${this.kpiTotalBorrows} | Active Loans: ${this.kpiActiveLoans} | Active Readers: ${this.kpiActiveReaders}`,
      14, 23
    );
    doc.autoTable({
      startY: 28,
      head: [['#', 'Title', 'Author', 'Category', 'Borrows', 'Active', 'Last Borrowed']],
      body: this.popularTitles.map(t => [t.rank, t.title, t.author, t.category, t.borrowCount, t.activeLoans, t.lastBorrowed]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [26, 35, 126] },
      alternateRowStyles: { fillColor: [240, 244, 255] },
    });
    doc.save(`borrowing-statistics-${this.dateRange}.pdf`);
  }
}

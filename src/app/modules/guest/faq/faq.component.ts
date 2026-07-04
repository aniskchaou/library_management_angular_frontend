import { Component } from '@angular/core';

interface FaqItem { q: string; a: string; open: boolean; }

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  standalone: false,
})
export class FaqComponent {
  searchQuery = '';

  sections: { title: string; icon: string; items: FaqItem[] }[] = [
    {
      title: 'Membership', icon: 'person',
      items: [
        { q: 'How do I join the library?',
          a: 'Click "Join Library" in the navigation bar or visit the membership registration page. Fill in your personal details and create a password. Your account may require staff verification before you can borrow.',
          open: false },
        { q: 'Is membership free?',
          a: 'Basic membership is free for all community members. Some special membership types (e.g., corporate, extended loan) may have annual fees. Contact us for details.',
          open: false },
        { q: 'How do I reset my password?',
          a: 'Go to the Reader Login page and click "Forgot password". Enter your registered email address and follow the link sent to your inbox.',
          open: false },
        { q: 'How long does membership last?',
          a: 'Standard membership is valid for one year from the date of registration. You will receive an email reminder 30 days before it expires.',
          open: false },
      ],
    },
    {
      title: 'Borrowing & Returns', icon: 'swap_horiz',
      items: [
        { q: 'How many books can I borrow at once?',
          a: 'The default loan limit is 5 items. Members with premium membership types may have a higher limit. Check your account dashboard for your personal limit.',
          open: false },
        { q: 'How long is the loan period?',
          a: 'The standard loan period is 14 days. Some item types (e.g., reference books, popular titles) may have shorter periods.',
          open: false },
        { q: 'Can I renew a borrowed item?',
          a: 'Yes. You can renew items from your member portal (My Account → Loans) up to 3 times, as long as no other member has a hold on the item.',
          open: false },
        { q: 'What happens if I return a book late?',
          a: 'A daily fine is charged for overdue items. You will receive email reminders when items are due soon and again when they become overdue.',
          open: false },
        { q: 'Can I borrow e-books and digital documents?',
          a: 'Yes. Digital resources are accessible online from your member account. Some items require a verified active membership.',
          open: false },
      ],
    },
    {
      title: 'Catalog & Search', icon: 'search',
      items: [
        { q: 'Do I need to log in to search the catalog?',
          a: 'No — the catalog is fully public. Anyone can search and browse books without creating an account. You only need to log in to borrow items, place holds, or access digital resources.',
          open: false },
        { q: 'How do I place a hold on a book that is currently borrowed?',
          a: 'From the OPAC catalog, click a book and select "Place Hold". You will be notified by email when the item becomes available for pickup.',
          open: false },
        { q: 'What search filters are available?',
          a: 'You can filter by category, language, media type, publication year, DDC classification, and availability. Use the Quick Filters for common searches.',
          open: false },
      ],
    },
    {
      title: 'Payments & Fines', icon: 'payments',
      items: [
        { q: 'How can I pay my outstanding fines?',
          a: 'Fines can be paid online via PayPal or by bank transfer (manual payment). Visit My Account → Payments in the reader portal to see your balance and pay.',
          open: false },
        { q: 'How does bank transfer payment work?',
          a: 'Go to the Bank Transfer / Manual Payment page, enter your transfer reference and amount, and submit. Staff will verify the payment and confirm your account within 1–2 business days.',
          open: false },
      ],
    },
    {
      title: 'Technical', icon: 'help_outline',
      items: [
        { q: 'Does the site work on mobile?',
          a: 'Yes. The portal is fully responsive and works on all modern browsers on phones, tablets, and desktops.',
          open: false },
        { q: 'Can I use the catalog offline?',
          a: 'The catalog requires an internet connection to load. However, the app caches recently browsed pages for brief offline viewing.',
          open: false },
        { q: 'Who do I contact for technical issues?',
          a: 'Use the Contact page to send a message to our team, or speak to a librarian in person.',
          open: false },
      ],
    },
  ];

  toggle(item: FaqItem): void { item.open = !item.open; }

  get filtered() {
    const q = this.searchQuery.toLowerCase();
    if (!q) return this.sections;
    return this.sections.map(s => ({
      ...s,
      items: s.items.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)),
    })).filter(s => s.items.length > 0);
  }
}

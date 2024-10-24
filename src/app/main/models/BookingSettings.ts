export interface BookingSettings {
    bookingTime: number; // Default circulation duration in days
    bookingQuota: number; // Combined maximum number of items
    enableMemberCheckouts: boolean;
    enableMemberCheckIns: boolean;
    enableMemberCheckInsForOverdueItems: boolean;
    memberType: string; // Type of member who can do self checkouts and check-ins
    checkoutTime: number; // Default checkout duration in days
    checkoutLimit: number; // Maximum checkout duration in days
    checkoutQuota: number; // Maximum number of checkouts allowed
  }
  
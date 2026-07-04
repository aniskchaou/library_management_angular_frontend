import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

@Pipe({
    name: 'phoneFormat',
    standalone: false
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string, countryCode: CountryCode = 'US'): string {
    if (!value) return '';

    try {
      // Parse the phone number with the given country code
      const phoneNumber = parsePhoneNumber(value, countryCode);
      // Format the phone number
      return phoneNumber.formatInternational();
    } catch (error) {
      // Return original value if parsing fails
      return value;
    }
  }
}


# Solar System Explorer - Signup System

## Overview
A complete user registration system has been added to the Solar System Explorer website. Users can now sign up to join the space community with their registration data securely stored in PHP files.

## Files Created/Modified

### New Files:
1. **signup.html** - User registration form with validation
2. **register.php** - PHP script to handle form submission and data storage
3. **registration_success.php** - Confirmation page for successful registrations

### Modified Files:
1. **home.html** - Added signup link to navigation
2. **planets.html** - Added home and signup links to navbar
3. **orbit.html** - Added navigation header with signup link
4. **aboutsolarsystem.html** - Added navigation links including signup

## Features

### Registration Form (signup.html)
- **Required Fields**: Full Name, Email Address
- **Optional Fields**: Age, Space Interest, Experience Level, Comments
- **Newsletter Subscription**: Optional checkbox
- **Client-side Validation**: Real-time form validation with error messages
- **Responsive Design**: Works on desktop and mobile devices

### Data Processing (register.php)
- **Server-side Validation**: Comprehensive input validation and sanitization
- **Duplicate Prevention**: Checks for existing email addresses
- **Secure Storage**: Data stored in formatted text file with unique registration IDs
- **Logging**: Registration attempts logged for monitoring
- **File Size Management**: 10MB limit with graceful handling
- **Session Management**: Secure data passing between pages

### Confirmation System (registration_success.php)
- **Success Page**: Beautiful confirmation with registration details
- **Unique ID**: Each registration gets a unique identifier
- **Next Steps**: Guides users to explore the website
- **Navigation Links**: Easy access to main site sections

## Data Storage Format

Registration data is stored in `registrations.txt` with the following format:
```
================================================================================
REGISTRATION #REG_[UNIQUE_ID]
--------------------------------------------------------------------------------
Full Name           : [User's Name]
Email               : [User's Email]
Age                 : [User's Age or 'Not specified']
Interest            : [Primary space interest or 'Not specified']
Experience Level    : [Experience level or 'Not specified']
Comments            : [User comments or 'None']
Newsletter Subscription: [Yes/No]
Registration Date   : [YYYY-MM-DD HH:MM:SS]
IP Address          : [User's IP]
================================================================================
```

## Security Features

1. **Input Sanitization**: All user inputs are cleaned and validated
2. **XSS Protection**: HTML special characters are escaped
3. **Email Validation**: Proper email format validation
4. **File Locking**: Prevents data corruption during concurrent writes
5. **Size Limits**: File size monitoring to prevent system overload
6. **IP Logging**: Track registration sources for security monitoring

## Setup Requirements

### Server Requirements:
- PHP 7.0 or higher
- Web server (Apache/Nginx)
- Write permissions for data files

### File Permissions:
Ensure the following files have write permissions:
- `registrations.txt` (created automatically)
- `registration_log.txt` (created automatically)

### Installation:
1. Upload all files to your web server
2. Ensure PHP is enabled
3. Set appropriate file permissions for data storage
4. Access `signup.html` to test the registration system

## Navigation Updates

All main pages now include signup links:
- **Home**: Added to main navigation menu
- **Planets**: Added to planet navigation bar with home link
- **Orbit Explorer**: Added navigation header
- **About**: Added navigation section

## Testing the System

1. Visit `signup.html`
2. Fill out the registration form
3. Submit to see the confirmation page
4. Check `registrations.txt` for stored data
5. Verify `registration_log.txt` for logging

## Troubleshooting

### Common Issues:
1. **Form not submitting**: Check PHP is enabled and `register.php` exists
2. **Data not saving**: Verify write permissions on the directory
3. **Validation errors**: Check all required fields are filled correctly
4. **Success page not loading**: Ensure session support is enabled in PHP

### Error Handling:
- Client-side validation prevents most submission errors
- Server-side validation provides backup error checking
- Graceful error messages guide users to fix issues
- Logging helps administrators track problems

## Future Enhancements

Potential improvements for the signup system:
1. Database integration instead of file storage
2. Email confirmation system
3. User login and dashboard
4. Admin panel for managing registrations
5. Newsletter integration
6. Social media signup options

## Support

For technical support or questions about the signup system:
- Check the registration logs for error details
- Verify server PHP configuration
- Ensure proper file permissions
- Test with different browsers and devices
# 📅 BOOKINGS CALENDAR INSTRUCTIONS

## Files You Need:
1. **bookings.html** - The calendar page (upload to your website)
2. **bookings-data.js** - The easy-to-edit booking dates (upload to your website)
3. **bookings-calendar.js** - The display code (upload to your website)

## How to Upload:
Upload all three files to the same folder as your index.html file on your website.

Your website URL will be:
- https://www.theroostholeguideservice.com/bookings.html

## How to Update Bookings (SUPER EASY!):

### Step 1: Open bookings-data.js
Open the file in any text editor (Notepad, TextEdit, VS Code, etc.)

### Step 2: Find the Date
Scroll down and find the date you want to mark as booked. For example:
```javascript
{ date: "November 15", status: "available" },
```

### Step 3: Change Status
Simply change "available" to "booked":
```javascript
{ date: "November 15", status: "booked" },
```

### Step 4: Save the File
Save the file and upload it to your website (replacing the old one).

### Step 5: Done!
Refresh your bookings page and the date will now show as BOOKED in red!

## Examples:

### Mark Opening Weekend as Booked:
```javascript
"November 2026": [
    { date: "November 1", status: "booked" },
    { date: "November 2", status: "booked" },
    { date: "November 3", status: "booked" },
    // ... rest stays the same
]
```

### Mark Thanksgiving Week as Booked:
```javascript
{ date: "November 24", status: "booked" },
{ date: "November 25", status: "booked" },
{ date: "November 26", status: "booked" },
{ date: "November 27", status: "booked" },
{ date: "November 28", status: "booked" },
```

### Mark Christmas Week as Booked:
```javascript
{ date: "December 23", status: "booked" },
{ date: "December 24", status: "booked" },
{ date: "December 25", status: "booked" },
{ date: "December 26", status: "booked" },
```

## Color Legend:
- 🟢 **Green = Available** - Hunters can book this date
- 🔴 **Red = Booked** - Date is already taken

## Tips:
- Always keep a backup copy of bookings-data.js before making changes
- You can mark multiple consecutive dates as booked at once
- The calendar automatically updates when you upload the new file
- Status must be exactly "available" or "booked" (lowercase, with quotes)

## Adding to Your Main Website:
Add a link to your bookings page from your main navigation:

```html
<li><a href="bookings.html">Check Availability</a></li>
```

Or add a button in your CTA section:
```html
<a href="bookings.html" class="cta-btn">View Availability Calendar</a>
```

## Season Dates:
The calendar is pre-loaded with:
- November 2026 (full month)
- December 2026 (full month)
- January 2027 (full month)
- February 2027 (full month)

If you need to add more months or adjust dates, just follow the same pattern in bookings-data.js!

---

**Need Help?** The code is super simple and well-commented. Just open bookings-data.js and follow the instructions at the top of the file!

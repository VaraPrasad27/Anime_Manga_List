export function formatDate(dateStr: string): string {
    // Split the "yyyy-mm-dd" into ["yyyy", "mm", "dd"]
    const [year, month, day] = dateStr.split("-");
  
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    // Convert month "01" to index 0, map to "jan", remove leading zero from day
    const formattedMonth = monthNames[parseInt(month, 10) - 1];
    const formattedDay = parseInt(day, 10);
  
    return `${formattedMonth} ${formattedDay}, ${year}`;
  }
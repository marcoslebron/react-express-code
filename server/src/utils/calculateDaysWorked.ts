export function calculateDaysWorked(dateHired: Date): number { 
    const today = new Date(); 
    const diffTime = today.getTime() - dateHired.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
 }
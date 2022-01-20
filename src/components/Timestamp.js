export const parseTime = (timestamp) => {   
    const datetime = new Date(timestamp);

    const day = datetime.toString().slice(0,3);
    
    const date = datetime.toDateString().slice(4);
    
    let time = datetime.toTimeString().split(' ')[0].slice(0,5);
    
    time = (parseInt(time.split(':')[0]) > 12) ? (parseInt(time.split(':')[0]) - 12) + time.slice(2) + ' PM' : time + ' AM';
    
    if(time.length === 7) time = '0' + time;
    
    return { date, day, time };
}
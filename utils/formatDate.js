module.exports = function(date){
    let formattedDate = "";
    formattedDate
        += (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
        + "/"
        + ( (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1) )
        + "/"
        + date.getFullYear()
        + " - "
        + ( date.getHours() < 10 ? "0" + date.getHours() : date.getHours() )
        + "h"
        + ( date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() );
    return formattedDate;
};

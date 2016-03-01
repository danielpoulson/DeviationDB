var moment = require('moment')

exports.dpFormatDate = function(date) {
  return moment(date).format('DD/MM/YYYY');
};
const colors = require("colors")
const logger = require('winston');
const traceback = require('traceback');

colors.enabled=true

const style = {    
    debug: 'green',
    info:  'cyan',
    warn:  'yellow',
    error: 'red'
}

const  timestamp = function() {
  return Date().toLocaleString('en-US').split('(')[0].trim()

} 

const formatter  = function(options) {
  // Return string will be passed to logger.
  const now =  '[' +colors.blue(timestamp()) +'] '
  const level =  colors[style[options.level]](options.level.toUpperCase()) +' '
  const msg =  (undefined !== options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' )
  return now + level + msg

} 
logger.remove(logger.transports.Console);
logger.add(new  logger.transports.Console( { 
  level: 'debug', 
  colorize:true, 
  format: logger.format.printf(formatter),
 prettyPrint: true }))


module.exports=logger


#!/usr/bin/env node
// Load dependencies
import fetch from 'node-fetch';
import minimist from 'minimist';
import moment from 'moment-timezone';
// Parse command line arguments with minimist
const args = minimist(process.argv.slice(2));
// Display help message if cmd called with -h
if (args.h) {
	show_help();
}
// Setup default values
let timezone = moment.tz.guess();
if (args.z) {
	timezone = args.z;
}
const days = args.d;
let start_date = moment().utc().format('Y-MM-DD');
let end_date = moment().utc().format('Y-MM-DD');
let latitude;
let longitude;
if (args.n) {
	latitude = args.n;
}else if (args.s) {
	latitude = -args.s;
}
if (args.e) {
	longitude = args.e;
}else if (args.w) {
	longitude = -args.w;
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=precipitation&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone + '&start_date=' + start_date + '&end_date=' + end_date);
const data = await response.json();
console.log(data);
if (args.j) {
	console.log(data);
	process.exit(0);
}

// Show help info
function show_help() {
	console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n")
    console.log("    -h            Show this help message and exit.\n")
    console.log("    -n, -s        Latitude: N positive; S negative.\n")
    console.log("    -e, -w        Longitude: E positive; W negative.\n")
    console.log("    -z            Time zone: uses tz.guess() from moment-timezone by default.\n")
    console.log("    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n")
    console.log("    -j            Echo pretty JSON from open-meteo API and exit.\n")
	process.exit(0)
}

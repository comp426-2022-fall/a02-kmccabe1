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
// Setup default values and update if arguments given
let timezone = moment.tz.guess();
if (args.z) {
	timezone = args.z;
}
let days = 1;
if (args.d >= 0) {
	days = args.d;
}
let latitude = 35;
let longitude = -75;
if (args.n) {
	latitude = Math.round(args.n * 100) / 100;
}else if (args.s) {
	latitude = Math.round(-args.s * 100) / 100;
}
if (args.e) {
	longitude = Math.round(args.e * 100) / 100;
}else if (args.w) {
	longitude = Math.round(-args.w * 100) / 100;
}
if (latitude == null || longitude == null) {
	process.exit(1);
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true&daily=precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone);
const data = await response.json();
// Handle -j argument
if (args.j) {
	console.log(data);
	process.exit(0);
}
// Check if you will need your galoshes
if (data.daily.precipitation_hours[days] > 0) {
	process.stdout.write("You might need your galoshes ");
}else {
	process.stdout.write("You will not need your galoshes ");
}
if (days == 0) {
	console.log("today.");
}else if (days > 1) {
	console.log("in " + days + " days.");
}else {
	console.log("tomorrow.");
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

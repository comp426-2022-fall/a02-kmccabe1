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


const timezone = moment.tz.guest();


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

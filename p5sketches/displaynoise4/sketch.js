
const scolors = [90,190,255];

var count=0;
var point_buffer=[];
var multiplier = 10;
var multiplier2 = 2;
var multiplier3 = 2;

var noise_buffer = [];
var noise_count = -1;
var noise_row_toggle = true;

var capture;
var recording = false;
var c;

var bit1 = [

]

var current_pos={
	x: 0,
	y: 0
}
let curr_angle = 0;
let curr_inc = 22;
let sinlimit = 0.6;

let curr_angle2 = 0;
let curr_inc2 = 1;
let sin2_multiplier = 100;
function setup() {
	c=createCanvas(128, 64);

	frameRate(24);

	//curr_inc = TWO_PI / 25.0;

}

var main_sprite2 = [
	0x80,0x0,0xff,0xa3,0xfc,0x18,0x38,0xe0,0x0,0x0,0x7f,0x5e,0x52,0x7e,0x6,0x0,0x38,0x7e,0x76,0x66,0x26,0x26,0x0,0x0,0x0,0x7e,0x3f,0x21,0x12,0xe,0x6,0x0,0xe0,0x1f,0x3f,0xb7,0x6f,0x7f,0x4e,0x3,0x0,0x0,0x0,0x3c,0x7c,0x78,0x30,0x10,0x10,0x0,0x7e,0x43,0x69,0x2e,0x0,0x7f,0x87,0x18,0x10,0x10,0x70,0x7e,0x1,0xff,0x18,0xf0,0xb0,0xb0,0x98,0xf8,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x1,0x6,0x18,0x20,0x1,0x2,0x2,0x3f,0x24,0x23,0x21,0x3f,0x10,0x10,0x8,0x8,0x0,0x0,0x0,0x0,0x3,0xc,0x30,0xc0,0x0,0x3,0x1c,0xff,0x40,0x7f,0x0,0x0,0x0,0x1,0x6,0x8,0x30,0xdf,0x16,0x18,0xf0,0x10,0x10,0x10,0x20,0x61,0x43,0x3d,0x0,0x0,0x0,0x0,0xf,0x8,0x8,0x4,0x4,0x2,0x2,0x2,0x1,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x2,0x2,0x6,0x6,0x6,0x6,0xa,0xc,0xc,0x15,0x1e,0x14,0x4,0x6,0x2,0x81,0xc0,0xbc,0x83,0x0,0x0,0x0,0xc0,0x21,0x12,0xe,0x2,0x3,0x24,0x24,0x24,0x24,0x74,0x5c,0x4c,0x48,0x5f,0xe8,0xc8,0x30,0x8,0x4,0x4,0x2,0xfa,0xe7,0x1f,0x3,0xd,0x11,0x21,0x0,0x0,0x0,0x0,0x1,0x6,0x18,0x61,0x86,0x8,0x30,0x40,0x80,0xd,0x3e,0xff,0x4c,0x2c,0xfc,0xff,0x48,0x8,0x8,0x8,0x18,0x33,0x2c,0x70,0xa0,0x20,0x20,0x20,0x20,0xfc,0x7f,0xa0,0x20,0xe0,0x30,0x13,0x3c,0xe8,0x28,0x49,0x8a,0xc,0xcc,0x7f,0x18,0x28,0x48,0x98,0x90,0x10,0xff,0xc0,0x0,0x0,0x0,0x0,0xe0,0x1e,0x1,0x1,0x0,0x0,0x0,0x0,0x80,0xc0,0x3f,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x1,0x1e,0x60,0x30,0x10,0xb,0x1f,0xe8,0x3f,0x8,0x8,0x8,0xc,0xff,0x9,0x15,0x9f,0x73,0x5f,0x93,0x92,0xa,0x8,0x4,0x3,0x80,0x60,0x18,0x6,0x1,0x0,0x0,0x0,0x0,0xff,0x0,0x1,0x3,0xd,0x3f,0x73,0x4f,0x1d,0x71,0xff,0x60,0xa0,0x90,0x89,0x87,0xce,0xf1,0xe6,0xc8,0x70,0x61,0xe6,0x58,0x3c,0x1a,0xf,0x9,0xc5,0x45,0xc2,0x42,0x3,0x3,0xff,0x4,0x4,0x7,0x1c,0x64,0x84,0x8,0x8,0x8,0x8,0x10,0x10,0x10,0x3f,0xe0,0xe0,0x5f,0x44,0x48,0xfc,0x52,0x91,0x8f,0x2,0x4,0x4,0x38,0xc0,0x0,0x0,0x3f,0x41,0x46,0x58,0xe1,0x81,0x83,0x9c,0xe0,0x0,0x1,0x6,0x4,0x84,0x66,0x39,0x7,0x0,0x0,0x7,0xf8,0x0,0x0,0x0,0x3,0x4,0x18,0x20,0x3f,0xf8,0x7,0x3,0xc,0x70,0xff,0x2,0x2,0xff,0x2,0x2,0xf,0xf0,0x1f,0x7f,0xbf,0xc1,0x40,0x40,0xe0,0x3c,0x23,0x20,0x10,0x11,0x89,0x6b,0x1b,0x6,0x87,0x6e,0x1b,0x27,0x29,0xff,0xc7,0x8f,0x1c,0xf0,0xc0,0x80,0x0,0x3,0xfd,0xff,0xf,0x38,0xe1,0x87,0x1c,0x70,0x83,0x4c,0x31,0xcf,0x2,0x4,0x4,0x6,0xc,0xff,0x18,0x18,0x18,0x38,0x38,0x28,0x2c,0xff,0x7f,0x27,0xff,0x14,0x1c,0x3e,0x11,0x10,0x21,0x13,0x1e,0x8,0x3f,0xe0,0x40,0x80,0xc0,0x30,0xc,0x7,0xf,0x3f,0xc0,0x0,0x3,0x2,0x1,0x1,0x3,0xd,0x11,0x27,0x5b,0xaf,0x7b,0x7f,0xc8,0x8,0x8,0x0,0xff,0x0,0x0,0x0,0x0,0xff,0x80,0x7f,0x78,0x80,0x3,0xc,0x30,0xc0,0x0,0x0,0x0,0x7,0xf8,0x3,0xff,0xcc,0x30,0x7f,0xe3,0x3c,0xc0,0x4,0x7,0x1e,0xff,0xe6,0xa7,0xfe,0xff,0xff,0x4c,0x54,0x7c,0x26,0xe4,0x7c,0xab,0x50,0xa1,0xa6,0x3f,0x7c,0xf3,0xfe,0x3c,0x30,0xf0,0xf8,0xfd,0xff,0xca,0x4b,0x6f,0x2f,0x3f,0xff,0xff,0xfc,0xb8,0xff,0xfe,0x3f,0x7c,0xff,0xe5,0xe6,0x64,0x64,0xe4,0x7e,0x21,0x20,0x27,0xff,0x23,0x2d,0x3a,0x34,0x7f,0x31,0x4e,0xff,0xe0,0x1c,0xf1,0x3,0x6,0x1c,0x30,0xe0,0xe0,0x18,0x7,0xfc,0x0,0x0,0x3,0xf,0x1b,0x3f,0xfe,0xed,0xbb,0xde,0x35,0x66,0xc4,0x80,0x80,0x0,0x0,0x0,0xe0,0xff,0xff,0x3,0x5,0x86,0xcc,0x8,0x10,0x0,0xfe,0x1,0x0,0x0,0x0,0xff,0x3f,0xfe,0x30,0xc0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0xf0,0x7f,0xff,0xff,0x2,0x4,0xfc,0x88,0x30,0x5f,0x90,0x17,0x79,0x9e,0x30,0xd0,0x11,0xd1,0x91,0x11,0x11,0x12,0x12,0x12,0x12,0xf3,0x1f,0xff,0xf3,0x61,0xc1,0xc0,0x40,0x41,0x82,0x87,0x8c,0x3b,0xff,0xcc,0xb8,0x7f,0xc7,0xfd,0x72,0x8d,0x32,0x7c,0xfe,0x63,0x80,0x0,0x80,0xf0,0xf,0x0,0x0,0x0,0x1,0xc2,0x3c,0xfc,0xff,0xc1,0x3,0x2,0xc,0xff,0xc8,0xff,0x21,0x26,0x58,0xe1,0x81,0x2,0x2,0x4,0x4,0x9,0xf,0xfe,0x3f,0x73,0xff,0xfe,0xfc,0xe4,0x44,0xf8,0xf0,0xe0,0xfe,0x18,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0xc0,0xe0,0x1f,0x80,0x0,0x0,0x0,0x0,0x0,0x0,0xe3,0x24,0x67,0x79,0xd0,0x30,0x37,0x18,0x1c,0x13,0x21,0x21,0x21,0x21,0x41,0x41,0x80,0xff,0xc2,0xa4,0xad,0x99,0xf0,0xf3,0x6c,0xff,0x78,0xf0,0xf0,0xe0,0xd0,0xd0,0xf0,0xd0,0x7c,0x5a,0x57,0x53,0x97,0x99,0xf0,0x91,0x12,0xff,0x11,0x36,0xd7,0x92,0x94,0x38,0xf0,0x70,0xd0,0x91,0x92,0x54,0x58,0xf1,0xfe,0x90,0xff,0x90,0x9c,0x43,0x21,0xd1,0x69,0x1c,0x13,0x12,0x1d,0xd9,0x32,0xfe,0x34,0x7e,0x74,0xbc,0xff,0x72,0x9d,0x33,0x30,0xf8,0x7f,0x91,0xf1,0xff,0x9d,0xff,0x3f,0x3f,0xf,0x31,0xe0,0x80,0xff,0x0,0x80,0x7f,0x2,0x5,0x9,0x9,0x9,0x1,0x3,0x2,0x6,0x7,0x0,0x7,0x7f,0xf0,0xf,0x1,0x0,0x1,0x1,0x1,0x0,0xff,0x7f,0x7c,0x0,0x0,0x3e,0x43,0x81,0xf9,0x3c,0xe3,0x41,0x41,0xc1,0x2,0x2,0xc5,0xfd,0x4e,0x48,0x30,0x20,0x60,0xa0,0x60,0x40,0xe0,0xa0,0x1c,0xfa,0x7f,0xe4,0xf4,0x12,0x12,0x22,0x62,0x41,0x41,0x41,0x41,0x41,0x82,0xc7,0x4e,0xca,0x8a,0xfc,0x7c,0x4c,0xfc,0x48,0xcc,0xfc,0x8,0x8,0x18,0x2c,0x4f,0x88,0x8,0x8,0x13,0x1c,0xf0,0x17,0x7a,0xa6,0x26,0x4f,0xd7,0x6e,0x76,0xfa,0xea,0x52,0xe2,0x7c,0x84,0xc,0xa,0xa,0xa,0x12,0x13,0xd0,0x3f,0x90,0x50,0xf3,0xfc,0x1c,0x1e,0xb,0x85,0x4,0x4,0x4,0x2,0x2,0x2,0x81,0xbf,0xc1,0x81,0x81,0xff,0x81,0x81,0x81,0x41,0x41,0x41,0x41,0x41,0x26,0xec,0xf0,0x38,0xe4,0x3f,0xf9,0xc0,0x20,0xc0,0xf8,0xc0,0x78,0xff,0xf0,0x0,0x0,0x0
];
var main_sprite = [
	0xf0,0xf0,0xf0,0xf0,0x0,0x0,0x0,0x0,0xf,0xf,0xf,0xf,0x0,0x0,0x0,0x0,0x3c,0x3c,0x3c,0x3c,0x3c,0x3c,0x3c,0x3c,0x0,0x0,0xfc,0xfc,0xfc,0xfc,0x0,0x0,0x81,0x41,0x23,0x15,0x19,0x25,0x43,0x81,0x8,0x48,0x38,0x8,0x8,0x8,0x8,0x8,0x0,0x1,0x7f,0x0,0x7e,0x0,0x78,0x0,0x0,0xc0,0xf,0xfa,0xa,0xa,0xfa,0x8,0x0,0x0,0x30,0x3f,0xc0,0xd8,0x18,0x0,0x6,0x6,0x0,0x66,0x66,0x30,0x30,0x0,0x18,0x18,0x18,0x1e,0x3e,0x3e,0x3e,0x0,0x3c,0x7c,0xf0,0xe3,0xff,0xff,0x7b,0x0,0x0,0x0,0x1f,0x1f,0x1b,0x1b,0xff,0xff,0x18,0x38,0x78,0xf0,0xe0,0xff,0xff,0x0,0x6,0x76,0x77,0x7f,0x7f,0x7b,0x73,0x0,0x0,0x3,0x63,0xff,0xdf,0xde,0xff,0xf9,0x3,0x1b,0x1b,0xc3,0xc3,0x18,0x18,0x0,0x18,0x18,0xc6,0xc6,0x1,0x39,0x39,0x0,0x0,0x0,0x0,0x18,0x18,0x36,0x36,0x0,0x0,0xfc,0xfc,0xec,0x6c,0x7e,0x7f,0x7,0x0,0x0,0x70,0x7e,0x3e,0x70,0x60,0xe0,0xe0,0xff,0x7f,0x67,0x66,0x66,0x66,0x60,0x7c,0xfe,0xce,0xc6,0xce,0xfe,0xfc,0x7c,0x7f,0x6f,0x63,0x67,0x67,0x0,0x30,0x30,0x7f,0x7f,0x0,0x6c,0x6c,0x0,0x0,0x0,0x0,0x7e,0x7e,0x67,0x67,0x7,0x1e,0x1e,0x7c,0x7e,0x6e,0xe0,0xc0,0xff,0xff,0xc0,0x0,0x0,0x0,0x7e,0x7e,0x6,0x0,0x0,0xc,0xc,0xc,0xc,0xc,0xfc,0xfc,0x0,0x7e,0x7e,0x1e,0x3c,0x38,0x70,0x60,0x0,0x7e,0x7e,0x7,0x7,0x6,0x6,0x6,0x0,0x0,0x3c,0x7c,0x78,0x3c,0xfc,0xf0,0xff,0xf8,0xc0,0xff,0xff,0x3f,0x3f,0x0,0x0,0x0,0x0,0xfe,0xfe,0xfe,0xfc,0xbc,0x0,0x0,0x3e,0x3e,0x30,0x30,0x0,0x0,0x0,0xe,0xff,0xff,0xc7,0xfe,0xff,0x3f,0x3,0x0,0x1c,0x7c,0xfc,0xfc,0xfe,0x3e,0x6,0x0,0x0,0x30,0x38,0x3e,0x7e,0x70,0x0,0x60,0x60,0x7f,0x7f,0x60,0x70,0x70,0x60,0x0,0xbe,0xbe,0x86,0x86,0x3e,0x3e,0x0,0x0,0x30,0x30,0x38,0x3c,0x7c,0x70,0x60,0x0,0x38,0x3e,0xfe,0xfe,0xfe,0x7c,0x78,0x0,0x0,0x76,0x7e,0x7c,0x6e,0x6,0x0,0x0,0x30,0x33,0x7,0x1f,0x7f,0x78,0x0,0x0,0xc7,0xcf,0xdf,0xfe,0xfe,0xf7,0x7,0x0,0x0,0x1,0x7f,0x7e,0x0,0x0,0x0,0x0,0x0,0x60,0x6f,0x7f,0xfb,0xfb,0x0,0x0,0x0,0x63,0x7f,0x7f,0x7f,0x7e,0x80,0x0,0x7e,0xfe,0x86,0x1e,0x1e,0x0,0x0,0x0,0x70,0x70,0x38,0x39,0x1f,0x1f,0x0,0x7,0x3f,0xff,0xe7,0xe,0xe,0x0,0x0,0x0,0xc0,0xfe,0xfe,0x70,0x0,0x0,0x0,0x0,0x30,0xfc,0xfe,0xf6,0x3e,0x3c,0x0,0x0,0x70,0x78,0x1c,0x7c,0x7f,0x3f,0x0,0x0,0x0,0xfe,0xfe,0xe,0x1c,0x38,0x38,0x30,0x0,0x3e,0x3e,0x1f,0x1b,0x3,0x3,0x38,0x3e,0x3e,0x3e,0x3c,0x1c,0x1c,0x18,0x0,0x0,0x0,0x3e,0x3e,0x6,0x7e,0x7e,0x60,0x0,0x0,0x30,0x3c,0x3e,0xfe,0xfe,0x0,0x0,0xfb,0xfb,0xef,0xff,0x7b,0x3,0x0,0x1e,0x3e,0x3e,0x37,0x37,0x37,0x36,0x0,0x0,0xfc,0xfc,0xfc,0x1e,0xe,0x7e,0x7e,0x0,0x0,0xc,0xc,0x80,0x80,0x0,0x30,0x37,0x7,0x3,0x7b,0x7f,0x7f,0x3e,0x0,0x0,0x0,0x1f,0x1f,0x1b,0x3,0x0,0x0,0xcc,0xdc,0xfc,0xf0,0xff,0x7f,0x78,0x1c,0x1c,0xe,0x6,0x3e,0x3c,0x0,0x0,0x0,0x7,0x77,0x77,0x7f,0x3f,0x3,0x3,0x3,0x7f,0x7f,0x7c,0x3e,0x6,0x1e,0x1c,0x1c,0x1c,0xc,0xc,0xf,0xf,0xf,0xc,0x0,0x60,0x78,0x78,0x18,0x18,0x18,0x38,0x38,0x38,0x1c,0x1e,0x6,0xe,0x1c,0x18,0x18,0x18,0x18,0x1e,0x1e,0x18,0x78,0xf8,0xf8,0xf8,0x1,0x1,0x31,0x31,0x1,0x0,0x0,0x18,0x18,0x6,0x6,0x6,0x6,0x6,0x7,0x3,0x3f,0x3f,0x30,0x38,0x38,0x18,0x1c,0x1c,0xc,0x1c,0xfc,0xfe,0xfe,0x6,0x6,0x1f,0x1f,0x1,0x7,0x1f,0x7c,0xf0,0xf8,0xfc,0x1c,0x3c,0x38,0x38,0x38,0x18,0x18,0x1e,0x1e,0xe,0x1c,0x1c,0x1c,0x7c,0x0,0x3e,0x3e,0x1c,0x1c,0x0,0x0,0x0,0x0,0x0,0x78,0x78,0x7c,0x3c,0x1c,0x0,0x30,0x78,0xf8,0xde,0xdf,0xfd,0xf8,0xe0,0x0,0x0,0x37,0x3f,0x3f,0x3e,0x1e,0x1c,0x18,0x0,0x0,0x7e,0xfe,0xcc,0xdc,0xfc,0xf8,0x0,0x0,0x0,0xfe,0xfe,0xe0,0xf8,0x3b,0xf,0x1f,0x18,0x18,0xd8,0xf8,0xf8,0x0,0x1f,0x1f,0x3,0x3,0xc3,0xf3,0xfb,0x3f,0x1e,0x0,0x1c,0x3e,0xfe,0xe6,0xe,0xe,0xc,0xf0,0xff,0xbf,0xdc,0xf8,0xf8,0x0,0x0,0xfc,0xfc,0xc0,0x0,0x0,0x0,0x0,0xe0,0xff,0x3f,0x0,0x0,0x7f,0x7f,0x0,0x3,0x7f,0x7f,0xf,0x0,0x0,0x0,0x0,0x98,0xd8,0xf8,0xfc,0xfc,0x6c,0x60,0x7f,0x7f,0x19,0x1b,0x3,0x3,0x7,0x7e,0x7c,0x0,0x30,0x30,0xd8,0xd8,0x0,0x0,0x18,0x1e,0x1e,0x1e,0x1e,0x6,0x6,0x6,0x6,0xe,0x3e,0x3f,0x3f,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0xe0,0xf8,0x78,0x18,0x38,0x30,0x30,0x3f,0x3f,0x3,0x0,0x0,0x0,0x0,0x0,0x1f,0x1f,0x38,0x30,0x30,0x38,0x38,0x18,0x18,0x1b,0x1b,0x18,0x18,0xf8,0xfc,0xfe,0xe,0x6,0x6,0x6,0xe,0x3e,0x38,0x38,0x3f,0x1f,0x3,0x7,0xe,0xe,0x3c,0x3c,0x3f,0x3f,0x3f,0x3c,0x0,0x0,0x0,0x38,0x7b,0x73,0x63,0x73,0x3f,0x1f,0x3f,0x7f,0x70,0x7f,0x7f,0x1,0x1,0x0,0x0,0x3f,0x3f,0x77,0x67,0x6f,0x6f,0x7f,0x7f,0x73,0x73,0x7b,0x7f,0x7f,0x6f,0x67,0x60,0x7c,0x3c,0x3c,0xc,0xc,0x0,0x80,0x80,0x80,0xf8,0xf8,0x0,0x0,0x0,0x0,0x0,0x0,0x3f,0x3f,0x3,0x7,0x3e,0x0,0x18,0x38,0x3e,0x3e,0x6,0x0,0x18,0x18,0x0,0x0,0x80,0x8c,0x1c,0x1c,0x18,0x18,0x0,0x3c,0x3f,0x7,0x3,0x3f,0x3e,0x0,0x1e,0x3e,0x38,0xb0,0xb0,0x30,0x38,0x38,0x18,0x18,0x38,0x38,0x0,0x30,0x30,0x30,0x30,0x70,0x70,0xe0,0xe0,0x0,0x0,0x0,0x0,0x0,0x3e,0x3e,0xe,0xe,0x1c,0x18,0x1c,0x1c,0xe,0xf,0x7,0x0,0x0,0x0,0x78,0x7c,0x7c,0x6c,0x7c,0x78,0x18,0x0,0x0,0x3e,0xbe,0xb6,0x8e,0xfe,0xfc,0xf0,0xf8,0xdc,0xcc,0xec,0xe0,0xc0,0xc0,0x0,0x0,0xf,0x3f,0x3f,0x33,0x33,0x0,0x0,0x0,0x7c,0x7c,0x7f,0x3f,0x0,0x0,0x0,0x18,0x18,0x0,0x7f,0x7f,0x0,0x0,0x0,0x0,0xe0,0xff,0x3f,0x0,0xc,0xc,0x0,0x0,0x36,0x3e,0x1c,0x38,0x30,0xf0
];
var shown=false;
function draw() {

	background(0);
	fill(scolors[0], scolors[1], scolors[2]);
	stroke(scolors[0], scolors[1], scolors[2]);

	// moveTo(0,0);
	// for(var i=0;i<8;i++){
	// 	let newbyte = 0;
	// 	for(var j=0;j<16;j++){
	// 		for(var k=0;k<8;k++){
	// 				var byte = 0;
	// 				var bitlength=128
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*0 +(j*8)+k])==0xff)?1:0)<<7;
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*1 +(j*8)+k])==0xff)?1:0)<<6;
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*2 +(j*8)+k])==0xff)?1:0)<<5;
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*3 +(j*8)+k])==0xff)?1:0)<<4;
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*4 +(j*8)+k])==0xff)?1:0)<<3;
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*5 +(j*8)+k])==0xff)?1:0)<<2;
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*6 +(j*8)+k])==0xff)?1:0)<<1;
	// 				byte = byte | (((bit1[bitlength*i*8 + bitlength*7 +(j*8)+k])==0xff)?1:0)<<0;
	// 				// console.log((j*8)+k)
	// 				main_sprite.push("0x"+byte.toString(16));
	// 				send(byte);
	// 		}
	// 	}
	// }
	// if(!shown){
	// 	shown=true;
	// 	console.log(main_sprite.length)
	// 	console.log(main_sprite.toString(16));
	// }
	// moveTo(0,0);
	// for(var i=0;i<main_sprite.length;i++){
	// 	send(main_sprite[i]);
	// }
	// return;
	for (let row = 0; row<8; row++){
		let sin2 = cos(curr_angle2*PI/180);
		//console.log(curr_angle, sin1)
		//console.log(sin1)
		curr_angle2 += (curr_inc2);
		if(curr_angle2>360){
			curr_angle2 = curr_angle2-360;
		}

		//curr_angle += 90+(row*21) + (sin2*sin2_multiplier);
		curr_angle += 90;

		for(var col=0;col<16; col++){

			moveTo(col*8,row);
			//let rand1 = random(0,255);
			//for(var block=0; block<8; block++){
			//	if(rand1 > 200){
			//		send( rand1);
			//	}
			//}

			// let rand1 = int(random(0,4));
			// for(var block=0; block<8; block++){
			// 	if(rand1 == 2){
			// 		send( 0x55);
			// 	}else if(rand1 == 1){
			// 		send(0x55<<block);
			// 	}else if(rand1 == 0){
			// 		send(0x55>>block);
			// 	}else if(rand1 == 4){
			// 		send( 0x00);
			// 	}
			// }


			// for(var block=0; block<8; block++){
			// 	let sin1 = sin(curr_angle);
			// 	curr_angle += (get_inc());
			// 	if(curr_angle>TWO_PI){
			// 		curr_angle = 0;
			// 	}
			//
			// 	if(sin1>0) send(0xff | (sin1*curr_inc))
			// }

			var sprite_idx;
			for(var block=0;block<8; block++){
				let sin1 = sin(curr_angle*PI/180);
				//console.log(curr_angle, sin1)
				//console.log(sin1)
				curr_angle += (get_inc())*sin2 ;
				if(curr_angle>360){
					curr_angle = curr_angle-360;
				}
				if(block == 0){
					sprite_idx = int((1+sin1)*64)//int(random(0,128));
					if(sprite_idx>127){
						sprite_idx=127;
					}
				}
				// if(abs(sin1)>sinlimit && sin1>0) send(0x0 | main_sprite[sprite_idx*8+block] )
				//if(abs(sin1)>sinlimit && sin1>0)

				if(abs(sin1)>sinlimit && sin1>0)
				{
					//send( 1<<(int(sin1*sin2*3)+4) )
					send(0x0 | main_sprite[sprite_idx*8+block] & (sin1*sin2*127)+(127) )
				}
				else if(abs(sin1)>sinlimit && sin1<0){
					send(0x00 )
					send( 1<<(int(sin1*sin2*3)+4) )
//					send(0x0 | main_sprite[sprite_idx*8+block] & (sin1*sin2*127)+(127) )
				}
				else {
					//send(0x00 )
					send(0x0 | main_sprite[sprite_idx*8+block] & 1 )

				}
 //console.log(1>>Math.round(sin1*7))
				//send(main_sprite[sprite_idx*8 + block])
				// if(abs(sin1)>sinlimit && sin1>0) send(0x0 | main_sprite[sprite_idx*8+block]& sin1*(255) )
			//	if(abs(sin1)>sinlimit && sin1<0) send(0x0 | main_sprite[sprite_idx*8+block]| abs(sin1)*(255))
			//	if(abs(sin1)<sinlimit ) send(0x00 )
			}
		}
	}
}

function get_inc(){
	return curr_inc;
}

function moveTo(x, y){
	current_pos.x = x;
	current_pos.y = y;
}

function send( byte ){
	for(var i=7;i>=0;i--){
		if((byte >> i) & 1){
			point(current_pos.x, (8*current_pos.y) + (7-i));
		}
	}
	current_pos.x += 1;
	if(current_pos.x > 127){
		current_pos.x = 0;
		current_pos.y +=1;
	}
}


function keyPressed() {
	switch(key){
		case 'J':
			curr_inc+=0.5;
		break;
		case 'K':
			curr_inc-=0.5;
		break;
		case 'U':
			sinlimit+=0.01;
		break;
		case 'I':
			sinlimit-=0.01;
		break;

		case 'G':
			curr_inc2+=0.5;
		break;
		case 'H':
			curr_inc2-=0.5;
		break;
		case 'T':
			sin2_multiplier+=0.5;
		break;
		case 'Y':
			sin2_multiplier-=0.5;
		break;
	}
	console.log (curr_inc, sinlimit, curr_inc2, sin2_multiplier)
}

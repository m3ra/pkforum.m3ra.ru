
let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "агуста", "сентября", "октября", "ноября", "декабря"];

let input__number_forum = document.getElementById("input__number_forum");
let input__number_day = document.getElementById("input__number_day");
let input__date = document.getElementById("input__date");
let input__discussion = document.getElementById("input__discussion");
let input__text_1 = document.getElementById("input__text_1");
let input__text_2 = document.getElementById("input__text_2");
let input__text_3 = document.getElementById("input__text_3");
let input__speaker = document.getElementById("input__speaker");
let input__text_vertical_padding = document.getElementById("input__text_vertical_padding");
let input__image_x = document.getElementById("input__image_x");
let input__image_y = document.getElementById("input__image_y");
let input__image_width = document.getElementById("input__image_width");
let input__image_height = document.getElementById("input__image_height");
let input__image_sx = document.getElementById("input__image_sx");
let input__image_sy = document.getElementById("input__image_sy");

input__number_forum.value = 1;
input__number_day.value = 1;

let date_now = new Date(Date.now());

date_now__day_number = date_now.getDate();

date_now__day_string = (date_now__day_number < 10 ? "0" : "") + date_now__day_number.toString();

date_now__string = date_now.getFullYear() + "-" + (date_now.getMonth() + 1) + "-" + date_now__day_string;

input__date.value = date_now__string;

input__text_vertical_padding.valueAsNumber = 7;

let canvas_width = 1280;
let canvas_height = 720;

let rect_height__base = 63; // 63.4
let text__5_notFirst__vertical_reduce = 10;

input__image_x.valueAsNumber = 0;
input__image_y.valueAsNumber = 0;
input__image_width.valueAsNumber = canvas_width;
input__image_height.valueAsNumber = canvas_height;

input__image_sx.valueAsNumber = 0;
input__image_sy.valueAsNumber = 0;

window.onload = e => {
	
	document.getElementById("render_canvas").onclick = button_click;
	document.getElementById("select_file").onclick = file_click;
	
	input__number_forum.oninput = e => {
		
		if (input__number_forum.valueAsNumber < 1) {
			input__number_forum.valueAsNumber = 1
		}
		
		button_click();
		
	}
	
	input__number_day.oninput = e => {
		
		if (input__number_day.valueAsNumber < 1) {
			input__number_day.valueAsNumber = 1;
		}
		
		button_click();
		
	}
	
	input__date.oninput = button_click;
	
	input__discussion.oninput = button_click;
	
	input__text_1.oninput = e => {
		
		let text__5_1 = input__text_1.value;
		let text__5_1__filled = text__5_1 != "";
		
		if (!text__5_1__filled) {
			input__text_2.value = "";
			input__text_3.value = "";
		}
		
		button_click();
		
	}
	
	input__text_2.oninput = e => {
		
		let text__5_1 = input__text_1.value;
		let text__5_1__filled = text__5_1 != "";
		
		if (!text__5_1__filled) {
			input__text_2.value = "";
		}
		
		let text__5_2 = input__text_2.value;
		let text__5_2__filled = text__5_2 != "";
		
		if (!text__5_2__filled) {
			input__text_3.value = "";
		}
		
		button_click();
		
	}
	
	input__text_3.oninput = e => {
		
		let text__5_1 = input__text_1.value;
		let text__5_1__filled = text__5_1 != "";
		
		if (!text__5_1__filled) {
			input__text_3.value = "";
		}
		
		let text__5_2 = input__text_2.value;
		let text__5_2__filled = text__5_2 != "";
		
		if (!text__5_2__filled) {
			input__text_3.value = "";
		}
		
		button_click();
		
	}
	
	input__speaker.oninput = button_click;
	
	input__text_vertical_padding.oninput = e => {
		
		let text__5_notFirst__number = text__5_notFirst__number_fn();
		let max_offset = canvas_height - (rect_height__base * 4 + text__5_notFirst__number * (rect_height__base - text__5_notFirst__vertical_reduce));
		
		if (input__text_vertical_padding.valueAsNumber > max_offset) {
			input__text_vertical_padding.valueAsNumber = max_offset;
		}
		
		button_click();
		
	}
	
	input__image_x.oninput = e => {
		
		if (input__image_x.valueAsNumber < 0) {
			input__image_x.valueAsNumber = 0
		}
		
		if (input__image_width.valueAsNumber > canvas_width) {
			input__image_width.valueAsNumber = canvas_width
		}
		
		button_click();
		
	}
	
	input__image_y.oninput = e => {
		
		if (input__image_y.valueAsNumber < 0) {
			input__image_y.valueAsNumber = 0
		}
		
		if (input__image_height.valueAsNumber > canvas_height) {
			input__image_height.valueAsNumber = canvas_height
		}
		
		button_click();
		
	}
	
	input__image_width.oninput = e => {
		
		if (input__image_width.valueAsNumber < 0) {
			input__image_width.valueAsNumber = 0
		}
		
		if (input__image_width.valueAsNumber > canvas_width) {
			input__image_width.valueAsNumber = canvas_width
		}
		
		input__image_height.valueAsNumber = (input__image_width.valueAsNumber / canvas_width * canvas_height).toFixed(2);
		
		button_click();
		
	}
	
	input__image_height.oninput = e => {
		
		if (input__image_height.valueAsNumber < 0) {
			input__image_height.valueAsNumber = 0
		}
		
		if (input__image_height.valueAsNumber > canvas_height) {
			input__image_height.valueAsNumber = canvas_height
		}
		
		input__image_width.valueAsNumber = (input__image_height.valueAsNumber / canvas_height * canvas_width).toFixed(2);
		
		button_click();
		
	}
	
	input__image_sx.oninput = e => {
		
		if (input__image_sx.valueAsNumber < 0) {
			input__image_sx.valueAsNumber = 0
		}
		
		if (input__image_sx.valueAsNumber > canvas_width) {
			input__image_sx.valueAsNumber = canvas_width
		}
		
		button_click();
		
	}
	
	input__image_sy.oninput = e => {
		
		if (input__image_sy.valueAsNumber < 0) {
			input__image_sy.valueAsNumber = 0
		}
		
		if (input__image_sy.valueAsNumber > canvas_height) {
			input__image_sy.valueAsNumber = canvas_height
		}
		
		button_click();
		
	}
	
	button_click();
	
}

function text_width__fn(ctx, text) {
	
	let text_measure = ctx.measureText(text); // TextMetrics object
	
	return text_measure.width;
	
}

function text__5_notFirst__number_fn() {
	
	let text__5_2 = input__text_2.value;
	let text__5_2__filled = text__5_2 != "";
	
	let text__5_3 = input__text_3.value;
	let text__5_3__filled = text__5_3 != "";
	
	text__5_notFirst__number = (text__5_2__filled ? 1 : 0) + (text__5_3__filled ? 1 : 0);
	
	return text__5_notFirst__number;
	
}

function button_click() {
	
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	
	canvas.width = canvas_width;
	
	canvas.height = canvas_height;
	
	const img_input = document.getElementById("img_input");
	
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas_width, canvas_height);
	
	let image_x = input__image_x.valueAsNumber;
	let image_y = input__image_y.valueAsNumber;
	let image_width = input__image_width.valueAsNumber;
	let image_height = input__image_height.valueAsNumber;
	
	let image_sx = input__image_sx.valueAsNumber;
	let image_sy = input__image_sy.valueAsNumber;
	
	if (image_sx > 0 || image_sy > 0) {
		
		ctx.drawImage(img_input, image_sx, image_sy, image_width, image_height, image_x, image_y, image_width, image_height);
		
	} else {
		
		ctx.drawImage(img_input, image_x, image_y, image_width, image_height);
		
	}
	
	ctx.font = "36px Roboto Light";
	ctx.fillStyle = "#FFF";
	
	let input__number_forum__text = input__number_forum.value;
	
	let input__number_day__text = input__number_day.value;
	
	let text = "Прикладной Концептуальный Форум #" + input__number_forum__text + ". День " + input__number_day__text;
	
	let text_width = text_width__fn(ctx, text);
	
	let text_horizontal_paddings = 21;
	let text_horizontal_padding = text_horizontal_paddings / 2;
	
	let text_baseline__offset = 44;
	
	ctx.fillStyle = "#137752";
	ctx.fillRect(0, 0, text_width + text_horizontal_paddings, rect_height__base);
	
	ctx.fillStyle = "#FFF";
	ctx.fillText(text, text_horizontal_padding, text_baseline__offset);
	
	
	let input__date__text = input__date.value;
	
	let input__date__date = new Date(input__date__text);
	
	let input__date__year = input__date__date.getFullYear();
	let input__date__day = input__date__date.getDate();
	let input__date__mongth_index = input__date__date.getMonth();
	
	let input__date__mongth_text = months[input__date__mongth_index];
	
	let text_2 = input__date__day + " " + input__date__mongth_text + " " + input__date__year; //"16 ноября 2023 г.";
	
	let text_2__width = text_width__fn(ctx, text_2);
	
	ctx.fillStyle = "#137752";
	ctx.fillRect(canvas_width - text_2__width - text_horizontal_paddings, 0, text_2__width + text_horizontal_paddings, rect_height__base);
	
	ctx.fillStyle = "#FFF";
	ctx.fillText(text_2, canvas_width - text_2__width - text_horizontal_padding, text_baseline__offset);
	
	
	let text_3 = "pkforum.m3ra.ru";
	
	let text_3__width = text_width__fn(ctx, text_3);
	
	ctx.fillStyle = "#137752";
	ctx.fillRect(canvas_width - text_3__width - text_horizontal_paddings, canvas_height - rect_height__base, text_3__width + text_horizontal_paddings, rect_height__base);
	
	ctx.fillStyle = "#FFF";
	ctx.fillText(text_3, canvas_width - text_3__width - text_horizontal_padding, canvas_height - rect_height__base + text_baseline__offset);
	
  
  let rect_decor__width = 10;
	
	let text_4 = input__speaker.value;

	if (text_4 != "") {
		
		let text_4__width = text_width__fn(ctx, text_4);
		
		ctx.fillStyle = "#323232";
		ctx.fillRect(0, canvas_height - rect_height__base, text_4__width + text_horizontal_paddings + rect_decor__width, rect_height__base);
		
		ctx.fillStyle = "#FFF";
		ctx.fillText(text_4, text_horizontal_padding + rect_decor__width, canvas_height - rect_height__base + text_baseline__offset);
		
		ctx.fillStyle = "#137752";
		ctx.fillRect(0, canvas_height - rect_height__base, rect_decor__width, rect_height__base);
		
	}
	
	ctx.font = "46px Roboto Light";
	
	ctx.textAlign = "center";
	
	let text__5_1 = input__text_1.value;
	let text__5_1__filled = text__5_1 != "";
	
	let text__5_2 = input__text_2.value;
	let text__5_2__filled = text__5_2 != "";
	
	let text__5_3 = input__text_3.value;
	let text__5_3__filled = text__5_3 != "";
	
	let text__5_notFirst__number = text__5_notFirst__number_fn();

	let text_vertical_padding = input__text_vertical_padding.valueAsNumber;
	
	let text__5_1__vertical_offset = rect_height__base + text__5_notFirst__number * (rect_height__base - text__5_notFirst__vertical_reduce) + rect_height__base + text_vertical_padding;
	
	
	if (text__5_1__filled) {
		
		let text__5_1__width = text_width__fn(ctx, text__5_1);
		
		ctx.fillStyle = "#323232DD";
		ctx.fillRect(0, canvas_height - text__5_1__vertical_offset, canvas_width, rect_height__base);
		
		ctx.fillStyle = "#FFF";
		ctx.fillText(text__5_1, canvas_width / 2, canvas_height + text_baseline__offset - text__5_1__vertical_offset);
		
		ctx.fillStyle = "#137752";
		ctx.fillRect(0, canvas_height - text__5_1__vertical_offset, rect_decor__width, rect_height__base);
		
		if (text__5_2__filled) {
			
			let text__5_2__width = text_width__fn(ctx, text__5_2);
			
			let text__5_2__vertical_offset = text__5_1__vertical_offset - rect_height__base;
			
			ctx.fillStyle = "#323232DD";
			ctx.fillRect(0, canvas_height - text__5_2__vertical_offset, canvas_width, rect_height__base - text__5_notFirst__vertical_reduce);
			
			ctx.fillStyle = "#FFF";
			ctx.fillText(text__5_2, canvas_width / 2, canvas_height - text__5_2__vertical_offset + text_baseline__offset - text__5_notFirst__vertical_reduce);
			
			ctx.fillStyle = "#137752";
			ctx.fillRect(0, canvas_height - text__5_2__vertical_offset, rect_decor__width, rect_height__base - text__5_notFirst__vertical_reduce);
			
			if (text__5_3__filled) {
				
				let text__5_3__width = text_width__fn(ctx, text__5_3);
				
				let text__5_3__vertical_offset = text__5_1__vertical_offset - rect_height__base - (rect_height__base - text__5_notFirst__vertical_reduce);
				
				ctx.fillStyle = "#323232DD";
				ctx.fillRect(0, canvas_height - text__5_3__vertical_offset, canvas_width, rect_height__base - text__5_notFirst__vertical_reduce);
				
				ctx.fillStyle = "#FFF";
				ctx.fillText(text__5_3, canvas_width / 2, canvas_height - text__5_3__vertical_offset + text_baseline__offset - text__5_notFirst__vertical_reduce);
				
				ctx.fillStyle = "#137752";
				ctx.fillRect(0, canvas_height - text__5_3__vertical_offset, rect_decor__width, rect_height__base - text__5_notFirst__vertical_reduce);
				
			}
			
		}
		
		ctx.font = "36px Roboto Light";
		
		ctx.textAlign = "left";
		
		let text_6 = !input__discussion.checked ? "Доклад" : "Обсуждение доклада";
		
		let text_6__vertical_offset = text__5_1__vertical_offset + rect_height__base; // + text_vertical_padding;
		
		let text_6__width = text_width__fn(ctx, text_6);
		
		ctx.fillStyle = "#323232DD";
		ctx.fillRect(0, canvas_height - text_6__vertical_offset, text_6__width + text_horizontal_paddings + rect_decor__width, rect_height__base);
		
		ctx.fillStyle = "#FFF";
		ctx.fillText(text_6, text_horizontal_padding + rect_decor__width, canvas_height + text_baseline__offset - text_6__vertical_offset);
		
		ctx.fillStyle = "#137752";
		ctx.fillRect(0, canvas_height - text_6__vertical_offset, rect_decor__width, rect_height__base);
		
	}
	
}

function file_click () {
	var inputFile = document.createElement('input');
	inputFile.setAttribute('type', 'file');
	inputFile.setAttribute('accept', 'image/png, image/jpeg');
	inputFile.multiple = false;
	
	inputFile.onchange = e => {
		
		var file = e.target.files[0];
		
		let file_caption = document.getElementById("file_caption");
		
		file_caption.textContent = file.name;
		
		var reader = new FileReader();
		reader.readAsDataURL(file, 'UTF-8');
		
		// here we tell the reader what to do when it done reading...
		reader.onload = readerEvent => {
			
      var img_input__src_data = readerEvent.target.result; // this is the content!
			img_input = document.getElementById('img_input');
			img_input.setAttribute('crossorigin', 'anonymous'); //crossorigin = "anonymous";
			img_input.src = img_input__src_data;
      
      button_click();
      
		}
		
	}
	
	inputFile.click();
	
}


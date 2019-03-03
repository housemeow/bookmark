if (window.location != 'https://aws.amazon.com/tw/rds/postgresql/pricing/') {
	window.location = 'https://aws.amazon.com/tw/rds/postgresql/pricing/'
}
var $item = $('.button.lb-dropdown-label:eq(0) li:eq(0)'),
	clicked = false,
	regions = [];
var interval = setInterval(function() {
	if ($item.length == 0) {
		clearInterval(interval);
		console.log('Cheapest', regions.reduce((a, b) => b.price < a.price ? b : a, {
			price: 1000
		}));
	}
	if (!clicked) {
		$item.click().click();
		clicked = true;
	}
	var region = $item.data('region');
	if ($('.aws-plc-content:eq(0)').find(`div[data-region=${region}] table`).length > 0) {
		var row = $.map($(`.aws-plc-content:eq(0) [data-region="${region}"] tr td:nth-child(2)`), el => ({
				price: $(el).text(),
				ec2: $(el).siblings(':first').text()
			})).map(row => ({
				price: row.price.match(/(\d*\.\d*) USD/)[1],
				ec2: row.ec2
			})).map(row => ({
				price: parseFloat(row.price),
				ec2: row.ec2
			})).reduce((a, b) => b.price < a.price ? b : a, {
				price: 1000
			}),
			name = $(`li[data-region="${region}"]:eq(0)`).text();
		regions.push({
			region,
			name,
			price: row.price,
			ec2: row.ec2,
		});
		$item = $item.next();
		clicked = false;
	}
}, 1000);
if (window.location != 'https://aws.amazon.com/tw/ec2/pricing/on-demand/') {
	window.location = 'https://aws.amazon.com/tw/ec2/pricing/on-demand/'
}
var $item = $('.button.lb-dropdown-label:eq(0) li:eq(0)'),
	clicked = false,
	regions = [];
var interval = setInterval(function() {
	if ($item.length == 0) {
		clearInterval(interval);
		console.log('Most Expensive', regions.reduce((a, b) => b.price > a.price ? b : a, {
			price: 0
		}));
	}
	if (!clicked) {
		$item.click().click();
		clicked = true;
	}
	var region = $item.data('region');
	if ($('.aws-plc-content:eq(0)').find(`div[data-region=${region}] table`).length > 0) {
		var row = $.map($(`[data-region="${region}"] tr td:nth-child(6)`), el => ({
				price: $(el).text(),
				ec2: $(el).siblings(':first').text()
			})).map(row => ({
				price: row.price.match(/每小時 (\d*\.\d*) USD/)[1],
				ec2: row.ec2
			})).map(row => ({
				price: parseFloat(row.price),
				ec2: row.ec2
			})).reduce((a, b) => b.price > a.price ? b : a, {
				price: 0
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
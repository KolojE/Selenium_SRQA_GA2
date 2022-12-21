const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const service = new firefox.ServiceBuilder('/usr/bin/geckodriver');
const assert = require("assert");



describe('Registration', function () {
	this.timeout(0);
	this.beforeAll(async function () {
		driver = new Builder().forBrowser('firefox').setFirefoxService(service).build();
		driver.get("http://127.0.0.1:8000/register");
	});
	it("User should register successfully and logged in", async function () {

		//fill in the form
		this.timeout(20000);
		await driver.findElement(By.id('name')).sendKeys("customer1");
		await driver.findElement(By.id('email')).sendKeys("Customer1@email.com");
		await driver.findElement(By.id('password')).sendKeys("Customer1");
		await driver.findElement(By.id('password_confirmation')).sendKeys("Customer1");


		//submit the form
		await driver.findElement(By.tagName("form")).submit();
		await driver.wait(until.titleIs("Profile"));

		//assert the actual title and expected title to makesure its logged in .
		var actualTitle = await driver.getTitle();
		var expectedTitle = "Profile";
		driver.get("http://127.0.0.1:8000/register");
		assert.equal(actualTitle, expectedTitle);


		driver.quit();
	}

	)
	this.afterAll(async function () {

		//delete previous registered user
		driver = new Builder().forBrowser('firefox').setFirefoxService(service).build();
		await driver.get("http://127.0.0.1:8000/admin");
		await driver.findElement(By.id("email")).sendKeys("admin@email.com");
		await driver.findElement(By.id("password")).sendKeys("admin");
		await driver.findElement(By.tagName("form")).submit();
		await driver.wait(until.titleIs("Aimeos administration interface"));
		await driver.get("http://127.0.0.1:8000/admin/default/jqadm/search/customer?locale=en");
		await driver.findElement(By.xpath("/html/body/div[2]/main/div[4]/form/div[2]/table/tbody/tr[last()]/td[last()]/a[2]")).click();
		await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("/html/body/div[2]/main/div[4]/div[2]/div/div/div[3]/button[2]"))));
		await driver.findElement(By.xpath("/html/body/div[2]/main/div[4]/div[2]/div/div/div[3]/button[2]")).click();
		driver.quit();
	})

})

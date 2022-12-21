
const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const service = new firefox.ServiceBuilder('/usr/bin/geckodriver');
const assert = require("assert");
var driver = null;
describe('login', function () {
	this.beforeEach(async function () {
		driver = new Builder().forBrowser('firefox').setFirefoxService(service).build();
		driver.get("http://127.0.0.1:8000/login");
	});
	it("Valid user login ", async function () {
		this.timeout(10000);
		var emailElement = await driver.findElement(By.id('email')).sendKeys("Customer@email.com");
		var passwordElement = await driver.findElement(By.id('password')).sendKeys("Customer");
		var rememberMeCheckbox = await driver.findElement(By.id("remember_me"));
		await driver.findElement(By.tagName("form")).submit();
		await driver.wait(until.titleIs("Profile"));
		var actualTitle = await driver.getTitle();
		var expectedTitle = "Profile";
		assert.equal(actualTitle, expectedTitle);
		driver.quit();

	}

	)

	it("invalid user login", async function () {
		this.timeout(9000)
		var emailElement = await driver.findElement(By.id('email')).sendKeys("InvalidCustomer@email.com");
		var passwordElement = await driver.findElement(By.id('password')).sendKeys("InvalidCustomer");
		var rememberMeCheckbox = await driver.findElement(By.id("remember_me"));
		await driver.findElement(By.tagName("form")).submit();
		await driver.wait(until.elementLocated(By.xpath("//li")), 5000)
		const errorMsg = await driver.findElement(By.xpath("//li[last()]")).getText().then(function (value) { return value });

		assert.equal(errorMsg, "These credentials do not match our records.");



	}
	)
	this.afterEach(async () => {
		driver.quit();
	})



}
)









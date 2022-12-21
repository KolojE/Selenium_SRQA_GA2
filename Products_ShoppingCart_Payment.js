const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const service = new firefox.ServiceBuilder('/usr/bin/geckodriver');
const assert = require("assert");
const { threadId } = require("worker_threads");
const { time } = require("console");
var driver = null;
describe("Product and Shopping Cart", async function () {
this.timeout(0);
    this.beforeAll(async function () {
		driver = new Builder().forBrowser('firefox').setFirefoxService(service).build();
		driver.get("http://127.0.0.1:8000/login");
        var emailElement = await driver.findElement(By.id('email')).sendKeys("Customer@email.com");
		var passwordElement = await driver.findElement(By.id('password')).sendKeys("Customer");
		var rememberMeCheckbox = await driver.findElement(By.id("remember_me"));
		await driver.findElement(By.tagName("form")).submit();
		await driver.wait(until.titleIs("Profile"));
        await driver.sleep(1000);
        await driver.findElement(By.className("navbar-brand")).click();
        await driver.wait(until.titleIs("Home | Default"));
    }
    )


    it("Should able to view the product", async function () {
        this.timeout(10000);
        var expectedProductName =await driver.findElement(By.xpath("/html/body/div/section[2]/div/div[2]/div/div/div[2]/div[2]/a/div[2]/h2")).getText();
        await driver.findElement(By.xpath("/html/body/div/section[2]/div/div[2]/div/div/div[2]/div[1]/a")).click();
        var actualProductName = await driver.findElement(By.xpath("/html/body/div/div/div/article/div[2]/div[1]/h1")).getText();
        assert.equal(actualProductName,expectedProductName); 

    })

    it("Should added to the product to cart",async function()
    {   
        this.timeout(10000);
        var expectedProductName = await driver.findElement(By.xpath("/html/body/div/div/div/article/div[2]/div[1]/h1")).getText();
        await driver.findElement(By.xpath("/html/body/div/div/div/article/div[2]/div[2]/form/div[3]/div/button[@type='submit']")).click();
        await driver.wait(until.elementsLocated(By.className("basket-standard")));
        await driver.findElement(By.xpath("/html/body/div[3]/section/div/form/div[1]/div/div/button")).click();
        var actualProductName = await driver.findElement(By.className("product-name")).getText();
        assert.equal(actualProductName.toUpperCase(),expectedProductName);
    })

    it("Should able to edit the product quantity",async function()
    {
        this.timeout(10000);
        var preQuantity = await driver.findElement(By.xpath("/html/body/div/div/section[1]/div/form/div[2]/div[2]/div/div[3]/div[2]/div/div[1]/input[1]")).getAttribute("value");
        await driver.findElement(By.xpath("/html/body/div/div/section[1]/div/form/div[2]/div[2]/div/div[3]/div[2]/div/div[1]/a")).click();
        await driver.wait(function (){
            return driver.findElement(By.xpath("/html/body/div/div/section[1]/div/form/div[2]/div[2]/div/div[3]/div[2]/div/div[1]/input[1]")).getAttribute("value").then(function(value)
            {
                return Number(value) === Number(preQuantity)+1;
            });

        },0)
    })

    it("Should able to delete product in basket",async function()
    {
        this.timeout(10000);
        await driver.get("http://127.0.0.1:8000");
        await driver.executeScript("window.scrollBy({top:1000})");
        await driver.sleep(1000);
        await driver.findElement(By.xpath("/html/body/div/section[2]/div/div[4]/div/div/div[1]/div[1]/a")).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath("/html/body/div/div/div/article/div[2]/div[2]/form/div[3]/div/button")).click();
        await driver.wait(until.elementsLocated(By.className("basket-standard")));
        await driver.findElement(By.xpath("/html/body/div[3]/section/div/form/div[1]/div/div/button")).click();

        await driver.findElement(By.xpath("/html/body/div/div/section[1]/div/form/div[2]/div[2]/div/div[3]/div[2]/div/div[4]/a")).click();

    })

    it("Should be able to check out",async function()
    {
        this.timeout(10000);
        await driver.findElement(By.xpath("/html/body/div/div/section[1]/div/form/div[4]/a[2]")).click();
        await driver.wait(until.titleIs("Checkout"));
        await driver.findElement(By.xpath("/html/body/div/div/section/nav/ol/li[2]")).click();
        await driver.findElement(By.id("address-billing-firstname-22")).clear();
        await driver.findElement(By.id("address-billing-firstname-22")).sendKeys("CustomerFirstName");
        await driver.findElement(By.id("address-billing-lastname-22")).clear();
        await driver.findElement(By.id("address-billing-lastname-22")).sendKeys("CutomerLastName");
        await driver.findElement(By.id("address-billing-address1-22")).clear();
        await driver.findElement(By.id("address-billing-address1-22")).sendKeys("CutomerLastName");
        await driver.findElement(By.id("address-billing-city-22")).clear();
        await driver.findElement(By.id("address-billing-city-22")).sendKeys("Cyberjaya")
        await driver.findElement(By.id("address-billing-postal-22")).clear();
        await driver.findElement(By.id("address-billing-postal-22")).sendKeys("63000")
        await driver.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        await driver.sleep(1000);
        await driver.findElement(By.xpath("/html/body/div/div/section/form/section/div[2]/button")).click();
        await driver.wait(until.elementTextIs(driver.findElement(By.xpath("/html/body/div/div/section/form/section/h1")),"DELIVERY"));

        await driver.findElement(By.id("c_deliveryoption-31")).click();
        await driver.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        await driver.sleep(1000);
        await driver.findElement(By.xpath("/html/body/div/div/section/form/section/div[6]/button")).click();
    })

    it("Payment Should success and display confirmation message",async function()
    {
        this.timeout(10000);
        await driver.executeScript("window.scrollBy(5,document.body.scrollHeight)");
        await driver.sleep(1000);
        await driver.findElement(By.id("c_paymentoption-39")).click();
        await driver.findElement(By.xpath("/html/body/div/div/section/form/section/div[6]/button")).click();
        await driver.wait(until.elementTextIs(driver.findElement(By.xpath("/html/body/div/div/section/form/section/h1")),"SUMMARY"));
        await driver.executeScript("window.scrollBy({top:500})");
        await driver.sleep(1000);
        await driver.findElement(By.id("option-terms-accept")).click();
        await driver.executeScript("window.scrollBy({top:500})");
        await driver.sleep(1000);
        await driver.findElement(By.xpath("/html/body/div/div/section/form/section/div[6]/button")).click();
        await driver.sleep(5000);
        await driver.wait(until.elementTextIs(driver.findElement(By.xpath("/html/body/div/div/section/div/h1")),"CONFIRMATION"));
    })

    
})